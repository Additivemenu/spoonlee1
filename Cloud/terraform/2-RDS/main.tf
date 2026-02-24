# ============================================================
# Terraform - AWS RDS MySQL Setup for Local MySQL Workbench
# ============================================================

terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
  # State is stored locally in terraform.tfstate (git-ignored)
}

provider "aws" {
  region = var.aws_region
}

# ------------------------------------------------------------
# 1. VPC
# ------------------------------------------------------------
resource "aws_vpc" "rds_vpc" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_support   = true
  enable_dns_hostnames = true # Required for RDS public hostname resolution

  tags = {
    Name      = "rds-learning-vpc"
    ManagedBy = "Terraform"
  }
}

# ------------------------------------------------------------
# 2. Subnets (RDS subnet group requires at least 2 AZs)
# ------------------------------------------------------------
resource "aws_subnet" "public_a" {
  vpc_id                  = aws_vpc.rds_vpc.id
  cidr_block              = "10.0.1.0/24"
  availability_zone       = "${var.aws_region}a"
  map_public_ip_on_launch = true

  tags = {
    Name = "rds-public-subnet-a"
  }
}

resource "aws_subnet" "public_b" {
  vpc_id                  = aws_vpc.rds_vpc.id
  cidr_block              = "10.0.2.0/24"
  availability_zone       = "${var.aws_region}b"
  map_public_ip_on_launch = true

  tags = {
    Name = "rds-public-subnet-b"
  }
}

# ------------------------------------------------------------
# 3. Internet Gateway + Route Table (so RDS is reachable)
# ------------------------------------------------------------
resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.rds_vpc.id

  tags = {
    Name = "rds-igw"
  }
}

resource "aws_route_table" "public_rt" {
  vpc_id = aws_vpc.rds_vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.igw.id
  }

  tags = {
    Name = "rds-public-rt"
  }
}

resource "aws_route_table_association" "rta_a" {
  subnet_id      = aws_subnet.public_a.id
  route_table_id = aws_route_table.public_rt.id
}

resource "aws_route_table_association" "rta_b" {
  subnet_id      = aws_subnet.public_b.id
  route_table_id = aws_route_table.public_rt.id
}

# ------------------------------------------------------------
# 4. Security Group — allow MySQL (3306) from your local IP
# ------------------------------------------------------------
resource "aws_security_group" "rds_sg" {
  name        = "rds-mysql-sg"
  description = "Allow MySQL access from local machine"
  vpc_id      = aws_vpc.rds_vpc.id

  ingress {
    description = "MySQL from your IP"
    from_port   = 3306
    to_port     = 3306
    protocol    = "tcp"
    # IMPORTANT: set your_ip_cidr in terraform.tfvars or pass -var flag
    # e.g. "203.0.113.45/32"  — use 0.0.0.0/0 ONLY for quick testing
    cidr_blocks = [var.my_ip_cidr]
  }

  egress {
    description = "Allow all outbound"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "rds-mysql-sg"
  }
}

# ------------------------------------------------------------
# 5. DB Subnet Group (tells RDS which subnets to use)
# ------------------------------------------------------------
resource "aws_db_subnet_group" "rds_subnet_group" {
  name       = "rds-learning-subnet-group"
  subnet_ids = [aws_subnet.public_a.id, aws_subnet.public_b.id]

  tags = {
    Name = "rds-learning-subnet-group"
  }
}

# ------------------------------------------------------------
# 6. IAM Role — allows RDS to write logs to CloudWatch Logs
# RDS needs explicit permission to publish log streams;
# this role + policy attachment grants that permission.
# ------------------------------------------------------------
data "aws_iam_policy_document" "rds_assume_role" {
  statement {
    actions = ["sts:AssumeRole"]
    principals {
      type        = "Service"
      identifiers = ["monitoring.rds.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "rds_cloudwatch" {
  name               = "rds-cloudwatch-logs-role"
  assume_role_policy = data.aws_iam_policy_document.rds_assume_role.json

  tags = {
    Name      = "rds-cloudwatch-logs-role"
    ManagedBy = "Terraform"
  }
}

resource "aws_iam_role_policy_attachment" "rds_cloudwatch" {
  role       = aws_iam_role.rds_cloudwatch.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonRDSEnhancedMonitoringRole"
}

# ------------------------------------------------------------
# 7. Parameter Group
# A Parameter Group is a named set of MySQL engine settings.
# RDS won't let you edit the default group, so you always
# create a custom one when you want to tune anything.
# ------------------------------------------------------------
resource "aws_db_parameter_group" "mysql" {
  name        = "rds-learning-mysql8"
  family      = "mysql8.0" # must match the engine_version major line below
  description = "Custom parameter group for learning"

  # --- Observability: log slow queries so you can spot bad SQL ---
  parameter {
    name  = "slow_query_log"
    value = "1" # 0 = off, 1 = on
  }
  parameter {
    name  = "long_query_time"
    value = "2" # seconds — queries slower than this are logged
  }

  # --- Character encoding: use utf8mb4 (full Unicode, supports emoji) ---
  parameter {
    name  = "character_set_server"
    value = "utf8mb4"
  }
  parameter {
    name  = "collation_server"
    value = "utf8mb4_unicode_ci"
  }

  # --- Connection limit: default is often too low for small instances ---
  parameter {
    name         = "max_connections"
    value        = "100"
    apply_method = "pending-reboot" # needs a reboot to take effect
  }

  tags = {
    Name      = "rds-learning-mysql8"
    ManagedBy = "Terraform"
  }
}

# ------------------------------------------------------------
# 7. RDS MySQL Instance
# ------------------------------------------------------------
resource "aws_db_instance" "mysql" {
  identifier        = "learning-mysql-db"
  engine            = "mysql"
  engine_version    = "8.0"
  instance_class    = var.db_instance_class
  allocated_storage = 20
  storage_type      = "gp2"

  db_name  = var.db_name
  username = var.db_username
  password = var.db_password

  # Attach our custom parameter group
  parameter_group_name = aws_db_parameter_group.mysql.name

  # Make it accessible from the internet (required for local MySQL Workbench)
  publicly_accessible    = true
  db_subnet_group_name   = aws_db_subnet_group.rds_subnet_group.name
  vpc_security_group_ids = [aws_security_group.rds_sg.id]

  # --- Backups ---
  # retention_period > 0 enables automated daily backups + point-in-time recovery.
  # AWS keeps backup_retention_period days worth of transaction logs.
  # Set to 0 to disable (saves cost, but no recovery possible).
  backup_retention_period = var.backup_retention_days
  backup_window           = "17:00-18:00" # UTC — when the daily backup runs (pick a quiet time)
  maintenance_window      = "mon:18:00-mon:19:00" # UTC — when minor patches are applied

  # When true: terraform destroy creates a final snapshot before deleting.
  # When false: data is gone immediately on destroy (fine for learning).
  skip_final_snapshot       = var.skip_final_snapshot
  final_snapshot_identifier = var.skip_final_snapshot ? null : "learning-mysql-final-snapshot"

  # Disable minor version auto-upgrade (keep things predictable while learning)
  auto_minor_version_upgrade = false

  # --- CloudWatch Logs exports ---
  # Ships RDS logs to CloudWatch Log Groups so you can query them in the console.
  # Log group paths created automatically:
  #   /aws/rds/instance/learning-mysql-db/error
  #   /aws/rds/instance/learning-mysql-db/slowquery
  enabled_cloudwatch_logs_exports = ["error", "slowquery"]

  tags = {
    Name        = "learning-mysql-db"
    Environment = "Learning"
    ManagedBy   = "Terraform"
  }
}

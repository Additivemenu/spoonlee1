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
# 6. RDS MySQL Instance
# ------------------------------------------------------------
resource "aws_db_instance" "mysql" {
  identifier        = "learning-mysql-db"
  engine            = "mysql"
  engine_version    = "8.0"
  instance_class    = var.db_instance_class # db.t3.micro is free-tier eligible
  allocated_storage = 20                    # GB — minimum for gp2
  storage_type      = "gp2"

  db_name  = var.db_name
  username = var.db_username
  password = var.db_password

  # Make it accessible from the internet (required to use MySQL Workbench locally)
  publicly_accessible    = true
  db_subnet_group_name   = aws_db_subnet_group.rds_subnet_group.name
  vpc_security_group_ids = [aws_security_group.rds_sg.id]

  # Skip final snapshot when destroying (convenient for learning)
  skip_final_snapshot = true

  # Disable automated backups to minimise cost during learning
  backup_retention_period = 0

  # Disable minor version auto-upgrade (keep things predictable)
  auto_minor_version_upgrade = false

  tags = {
    Name        = "learning-mysql-db"
    Environment = "Learning"
    ManagedBy   = "Terraform"
  }
}

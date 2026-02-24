# ============================================================
# Variables
# ============================================================

variable "aws_region" {
  description = "AWS region to deploy resources in"
  type        = string
  default     = "ap-southeast-2" # Sydney — change to your preferred region
}

# ------------------------------------------------------------
# Networking
# ------------------------------------------------------------
variable "my_ip_cidr" {
  description = <<EOT
Your local machine's public IP in CIDR notation, e.g. "203.0.113.45/32".
This is used to restrict RDS port 3306 access to only your machine.

Find your IP by running:
  curl -s https://checkip.amazonaws.com && echo "/32"
Or just visit: https://checkip.amazonaws.com
EOT
  type    = string
  # Override this in terraform.tfvars — do NOT leave as 0.0.0.0/0 in production
  default = "0.0.0.0/0"
}

# ------------------------------------------------------------
# RDS Instance
# ------------------------------------------------------------
variable "db_instance_class" {
  description = "RDS instance type. db.t3.micro is Free Tier eligible (750 hrs/month)"
  type        = string
  default     = "db.t3.micro"
}

variable "db_name" {
  description = "Name of the initial database to create inside MySQL"
  type        = string
  default     = "learningdb"
}

variable "db_username" {
  description = "Master username for the RDS MySQL instance"
  type        = string
  default     = "admin"
}

variable "db_password" {
  description = "Master password for the RDS MySQL instance (override in terraform.tfvars)"
  type        = string
  sensitive   = true # Prevents the value from appearing in Terraform output logs
  # No default — you MUST supply this via terraform.tfvars or TF_VAR_db_password
}

# ------------------------------------------------------------
# Backups
# ------------------------------------------------------------
variable "backup_retention_days" {
  description = <<EOT
Number of days to keep automated backups (enables point-in-time recovery).
  0 = backups disabled (cheapest, no recovery possible)
  1-35 = days to retain (1 day is enough for learning; prod typically uses 7+)
EOT
  type    = number
  default = 0 # disabled by default to save cost — set to 1 in tfvars to enable
}

variable "skip_final_snapshot" {
  description = <<EOT
When true  → terraform destroy deletes the DB immediately, no snapshot created.
When false → terraform destroy first creates a manual snapshot, then deletes the DB.
             Useful if you want to restore the DB later from that snapshot.
Set to false before destroying if you care about keeping your data.
EOT
  type    = bool
  default = true # convenient for learning; set to false in prod / when data matters
}

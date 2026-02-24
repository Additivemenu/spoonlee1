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

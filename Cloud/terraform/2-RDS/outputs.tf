# ============================================================
# Outputs — printed after `terraform apply`
# ============================================================

output "rds_endpoint" {
  description = "The hostname of the RDS instance — paste this into MySQL Workbench as the hostname"
  value       = aws_db_instance.mysql.address
}

output "rds_port" {
  description = "The port MySQL is listening on (default 3306)"
  value       = aws_db_instance.mysql.port
}

output "rds_db_name" {
  description = "The initial database name created inside MySQL"
  value       = aws_db_instance.mysql.db_name
}

output "rds_username" {
  description = "The master username for MySQL Workbench connection"
  value       = aws_db_instance.mysql.username
}

output "mysql_workbench_connection_summary" {
  description = "Copy-paste-ready summary for setting up a MySQL Workbench connection"
  value = <<EOT

  ┌─────────────────────────────────────────────────────────┐
  │        MySQL Workbench Connection Details               │
  ├─────────────────────────────────────────────────────────┤
  │  Hostname : ${aws_db_instance.mysql.address}
  │  Port     : ${aws_db_instance.mysql.port}
  │  Database : ${aws_db_instance.mysql.db_name}
  │  Username : ${aws_db_instance.mysql.username}
  │  Password : (the one you set in terraform.tfvars)
  └─────────────────────────────────────────────────────────┘
EOT
}

output "cloudwatch_log_groups" {
  description = "CloudWatch Log Group paths where RDS logs are published"
  value = {
    error      = "/aws/rds/instance/${aws_db_instance.mysql.identifier}/error"
    slow_query = "/aws/rds/instance/${aws_db_instance.mysql.identifier}/slowquery"
  }
}

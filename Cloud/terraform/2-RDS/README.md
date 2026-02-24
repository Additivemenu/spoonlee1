# Terraform — AWS RDS MySQL (connect via MySQL Workbench)

Provisions a **publicly accessible RDS MySQL 8.0** instance inside its own VPC so you can connect to it from your local machine using **MySQL Workbench**.

---

## Architecture

```text
Your Machine (MySQL Workbench)
        │  port 3306
        ▼
Internet Gateway
        │
        ▼
 ┌─── VPC (10.0.0.0/16) ───────────────────────────────────┐
 │                                                          │
 │  Public Subnet A (10.0.1.0/24)  ap-southeast-2a         │
 │  Public Subnet B (10.0.2.0/24)  ap-southeast-2b         │
 │                                                          │
 │  Security Group: allow TCP 3306 from YOUR_IP only        │
 │                                                          │
 │  ┌─────────────────────────────────────┐                 │
 │  │  RDS MySQL 8.0  (db.t3.micro)       │                 │
 │  │  publicly_accessible = true         │                 │
 │  │  db: learningdb                     │                 │
 │  └─────────────────────────────────────┘                 │
 └──────────────────────────────────────────────────────────┘
```

---

## Files

| File               | Purpose                                                           |
| ------------------ | ----------------------------------------------------------------- |
| `main.tf`          | VPC, subnets, IGW, security group, DB subnet group, RDS instance  |
| `variables.tf`     | All input variable declarations with descriptions                 |
| `outputs.tf`       | Prints RDS endpoint, port, and MySQL Workbench connection summary |
| `terraform.tfvars` | **Your** secret values (git-ignored)                              |
| `.gitignore`       | Keeps secrets and state files out of git                          |

---

## Prerequisites

- [Terraform](https://developer.hashicorp.com/terraform/install) ≥ 1.5
- AWS CLI configured (`aws configure`) with an IAM user that has RDS + VPC permissions
- [MySQL Workbench](https://dev.mysql.com/downloads/workbench/) installed locally

---

## Quick Start

### Step 1 — Find your public IP

```bash
curl -s https://checkip.amazonaws.com && echo "/32"
# e.g. 203.0.113.45/32
```

### Step 2 — Fill in `terraform.tfvars`

```hcl
my_ip_cidr  = "203.0.113.45/32"       # your IP from step 1
db_password = "YourStrongPassword123!"
```

> ⚠️ `terraform.tfvars` is git-ignored — never commit real passwords.

### Step 3 — Deploy

```bash
cd Cloud/terraform/2-RDS

terraform init    # download AWS provider plugin
terraform plan    # preview what will be created
terraform apply   # create resources (~5 min for RDS to become available)
```

After `apply` succeeds, Terraform prints your connection details:

```text
Outputs:
  rds_endpoint = "learning-mysql-db.xxxx.ap-southeast-2.rds.amazonaws.com"
  rds_port     = 3306
  rds_username = "admin"
  rds_db_name  = "learningdb"
  mysql_workbench_connection_summary = ...
```

### 4. Connect with MySQL Workbench

1. Open MySQL Workbench → **+** (new connection)
2. Fill in:
   - **Connection Name**: anything (e.g. `AWS RDS Learning`)
   - **Hostname**: the `rds_endpoint` value from Terraform output
   - **Port**: `3306`
   - **Username**: `admin`
   - **Password** → Store in Vault → enter your `db_password`
3. Click **Test Connection** → should show "Successfully made the MySQL connection"
4. Click **OK** → double-click the connection to open a query editor

---

## Tear Down (avoid ongoing charges)

```bash
terraform destroy
```

This deletes the RDS instance, VPC, subnets, security group, and internet gateway.  
Because `skip_final_snapshot = true`, no snapshot is created — all data is gone (this saves the cost of snapshot if just for learning purpose).

---

## Cost Notes (Free Tier)

| Resource                | Free Tier                 | Notes          |
| ----------------------- | ------------------------- | -------------- |
| RDS `db.t3.micro`       | 750 hrs/month (12 months) | Single-AZ only |
| RDS storage `gp2` 20 GB | 20 GB/month               |                |
| VPC / Subnets / IGW     | Free                      |                |

> Run `terraform destroy` when you're done practising to avoid charges beyond free tier.

---

## Key Concepts

- **`publicly_accessible = true`** — gives the RDS instance a public DNS hostname so you can reach it from outside AWS.
- **Security Group** — acts as a firewall; restricts port 3306 to only your IP.
- **DB Subnet Group** — RDS needs to know which subnets it can use; requires subnets in ≥ 2 AZs.
- **`skip_final_snapshot = true`** — skips the automated backup snapshot on destroy (fine for learning, not for production).
- **`sensitive = true`** on `db_password` — prevents the password from leaking into Terraform logs.

---

# RDS Extra Features worth knowing

## Parameter Groups

A **Parameter Group** is a named collection of MySQL engine settings. RDS does not let you edit the default group, so you always create a custom one when you want to tune anything.

This demo creates `aws_db_parameter_group.mysql` (family `mysql8.0`) and attaches it to the instance.

### Parameters configured

| Parameter              | Value                | Why                                                            |
| ---------------------- | -------------------- | -------------------------------------------------------------- |
| `slow_query_log`       | `1`                  | Enables logging of slow queries to CloudWatch                  |
| `long_query_time`      | `2`                  | Queries taking > 2 seconds are flagged as slow                 |
| `character_set_server` | `utf8mb4`            | Full Unicode support — handles emoji, CJK characters, etc.     |
| `collation_server`     | `utf8mb4_unicode_ci` | Case-insensitive sorting that works correctly across languages |
| `max_connections`      | `100`                | Max simultaneous DB connections (needs a reboot to apply)      |

### How to verify in MySQL Workbench

After connecting, run these queries to confirm the parameters are active:

```sql
-- check character encoding
SHOW VARIABLES LIKE 'character_set_server';
SHOW VARIABLES LIKE 'collation_server';

-- check slow query logging
SHOW VARIABLES LIKE 'slow_query_log';
SHOW VARIABLES LIKE 'long_query_time';

-- check max connections
SHOW VARIABLES LIKE 'max_connections';
```

### How to add more parameters

Just add another `parameter {}` block in `main.tf` and re-run `terraform apply`:

```hcl
parameter {
  name  = "innodb_buffer_pool_size"   # cache size for InnoDB (performance tuning)
  value = "134217728"                 # 128 MB in bytes
  apply_method = "pending-reboot"
}
```

> Parameters with `apply_method = "pending-reboot"` take effect after an RDS reboot.  
> Parameters with `apply_method = "immediate"` (the default) apply without a reboot.

---

## Snapshots & Backups

RDS has two types of backups:

| Type                 | Trigger                 | Kept for                            | Use case                |
| -------------------- | ----------------------- | ----------------------------------- | ----------------------- |
| **Automated backup** | Daily, automatic        | `backup_retention_days` (1–35 days) | Point-in-time recovery  |
| **Manual snapshot**  | On-demand or on destroy | Until you delete it                 | Long-term restore point |

### Enable automated backups

In `terraform.tfvars`, uncomment:

```hcl
backup_retention_days = 1   # keep 1 day of automated backups
```

Then re-apply:

```bash
terraform apply
```

With backups enabled, RDS runs a daily snapshot during the `backup_window` (`17:00–18:00 UTC`) and keeps transaction logs so you can restore to **any second** within the retention window — this is called **Point-in-Time Recovery (PITR)**.

### Save a manual snapshot on destroy

In `terraform.tfvars`, uncomment:

```hcl
skip_final_snapshot = false   # creates a snapshot before destroying
```

When you now run `terraform destroy`, RDS first saves a snapshot named `learning-mysql-final-snapshot` in your AWS account. You can later restore it:

```text
AWS Console → RDS → Snapshots → select snapshot → Restore snapshot
```

This creates a brand-new RDS instance from that snapshot with all your data intact.

### Take a manual snapshot anytime (AWS Console)

```text
RDS → Databases → learning-mysql-db → Actions → Take snapshot
```

### Cost of snapshots

- Automated backup storage up to the size of your DB = **free**
- Manual snapshots beyond that = ~$0.095/GB/month
- For a 20 GB learning DB with 1 day retention the backup cost is effectively **$0**

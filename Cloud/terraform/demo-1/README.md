# AWS S3 Upload Demo with Terraform

A simple demo project to learn AWS basics using Terraform to create an S3 bucket and a Node.js script to upload files.

## 📋 Prerequisites

1. **AWS Account** - You need an active AWS account
2. **AWS CLI** - Install and configure with your credentials
   ```bash
   aws configure
   ```
3. **Terraform** - Install Terraform (version 1.0+)
   ```bash
   brew install terraform  # macOS
   ```
4. **Node.js** - Install Node.js (version 14+)
   ```bash
   brew install node  # macOS
   ```

## 🚀 Setup Instructions

### Step 1: Configure AWS Credentials

Make sure your AWS credentials are configured:

```bash
aws configure
```

You'll need:

- AWS Access Key ID
- AWS Secret Access Key
- Default region (e.g., `us-east-1`)

### Step 2: Update Terraform Variables

Navigate to the `terraform/` directory and edit `variables.tf` to change the `bucket_name` to something globally unique:

```hcl
variable "bucket_name" {
  default = "my-unique-bucket-name-123456"  # Change this!
}
```

> **Note**: S3 bucket names must be globally unique across all AWS accounts.

### Step 3: Initialize and Apply Terraform

```bash
# Navigate to terraform directory
cd terraform

# Initialize Terraform
terraform init

# Preview changes
terraform plan

# Create the S3 bucket
terraform apply
```

Type `yes` when prompted to confirm.

### Step 4: Install Node.js Dependencies

```bash
# Navigate to app directory
cd ../app

# Install dependencies
npm install
```

### Step 5: Create Upload Folder and Add Files

```bash
# Still in app directory
# Create the uploads folder
mkdir uploads

# Add some test files
echo "Hello, S3!" > uploads/test.txt
echo "This is a demo" > uploads/demo.txt
```

### Step 6: Update Environment Variables (Optional)

If you changed the bucket name or region in Terraform, update them in `app/.env.example`:

```bash
# Copy example env file
cp .env.example .env
# Edit .env with your bucket name and region
```

## 📤 Upload Files to S3

Make sure you're in the `app/` directory:

```bash
cd app  # if not already there

# Run the upload script
npm run upload
```

Or directly:

```bash
node upload-to-s3.js
```

## 📁 Project Structure

```
demo-1/
├── terraform/           # Infrastructure as Code
│   ├── main.tf         # Terraform main configuration (S3 bucket)
│   ├── variables.tf    # Terraform variables
│   └── outputs.tf      # Terraform outputs
├── app/                # Application code
│   ├── upload-to-s3.js # Node.js upload script
│   ├── package.json    # Node.js dependencies
│   ├── .env.example    # Example environment variables
│   └── uploads/        # Folder containing files to upload (create this)
├── .gitignore          # Git ignore file
└── README.md           # This file
```

## 🔍 What This Demo Covers

### Terraform Concepts:

- ✅ Provider configuration (AWS)
- ✅ Resource creation (S3 bucket)
- ✅ Variables and outputs
- ✅ Best practices (versioning, public access blocking)

### AWS S3 Concepts:

- ✅ Creating an S3 bucket
- ✅ Bucket versioning
- ✅ Public access blocking (security)
- ✅ Uploading files programmatically

### Node.js/AWS SDK:

- ✅ AWS SDK v3 usage
- ✅ S3 client configuration
- ✅ File upload with proper content types
- ✅ Error handling

## 🧹 Cleanup

To avoid AWS charges, destroy the resources when done:

```bash
# Option 1: Delete all objects and versions (for versioned buckets)
aws s3api delete-objects \
  --bucket your-bucket-name \
  --delete "$(aws s3api list-object-versions \
    --bucket your-bucket-name \
    --query '{Objects: Versions[].{Key:Key,VersionId:VersionId}}' \
    --output json)"

# Option 2: Simple recursive delete (if versioning is disabled)
aws s3 rm s3://your-bucket-name --recursive

# Navigate to terraform directory
cd terraform

# Destroy Terraform resources
terraform destroy
```

Type `yes` when prompted.

## 🎯 Common Commands

```bash
# Terraform (run from terraform/ directory)
cd terraform
terraform init        # Initialize Terraform
terraform plan        # Preview changes
terraform apply       # Apply changes
terraform destroy     # Destroy resources
terraform output      # Show outputs

# AWS CLI - Verify bucket (run from anywhere)
aws s3 ls             # List all buckets
aws s3 ls s3://your-bucket-name  # List files in bucket

# Node.js (run from app/ directory)
cd app
npm install           # Install dependencies
npm run upload        # Run upload script
```

## 🐛 Troubleshooting

### Bucket Name Already Exists

- S3 bucket names are globally unique. Change the name in `terraform/variables.tf`

### AWS Credentials Not Found

- Run `aws configure` to set up your credentials
- Check `~/.aws/credentials` file exists

### Permission Denied

- Ensure your AWS user has S3 permissions (AmazonS3FullAccess policy)

### Module Not Found

- Run `npm install` from the `app/` directory to install dependencies

### Terraform Files Not Found

- Make sure you're in the `terraform/` directory when running Terraform commands

## 📚 Learning Resources

- [Terraform AWS Provider Docs](https://registry.terraform.io/providers/hashicorp/aws/latest/docs)
- [AWS S3 Documentation](https://docs.aws.amazon.com/s3/)
- [AWS SDK for JavaScript v3](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/)

## 🎓 Next Steps

After mastering this demo, try:

1. Adding bucket policies for access control
2. Enabling S3 encryption at rest
3. Setting up lifecycle policies
4. Creating CloudFront distribution for the bucket
5. Using Terraform modules to organize code
6. Adding automated tests

---

Happy Learning! 🚀

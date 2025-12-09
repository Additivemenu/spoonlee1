const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const fs = require("fs");
const path = require("path");

// Configuration
const BUCKET_NAME = process.env.BUCKET_NAME || "my-terraform-demo-bucket-2025-12-09";
const AWS_REGION = process.env.AWS_REGION || "ap-southeast-2";
const UPLOAD_FOLDER = process.env.UPLOAD_FOLDER || "./uploads";

// Initialize S3 client
const s3Client = new S3Client({ region: AWS_REGION });

/**
 * Upload a single file to S3
 */
async function uploadFile(filePath, bucketName) {
  const fileContent = fs.readFileSync(filePath);
  const fileName = path.basename(filePath);

  const params = {
    Bucket: bucketName,
    Key: fileName,
    Body: fileContent,
    ContentType: getContentType(fileName),
  };

  try {
    const command = new PutObjectCommand(params);
    const response = await s3Client.send(command);
    console.log(`✅ Successfully uploaded: ${fileName}`);
    return response;
  } catch (error) {
    console.error(`❌ Error uploading ${fileName}:`, error.message);
    throw error;
  }
}

/**
 * Get content type based on file extension
 */
function getContentType(fileName) {
  const ext = path.extname(fileName).toLowerCase();
  const contentTypes = {
    ".txt": "text/plain",
    ".html": "text/html",
    ".css": "text/css",
    ".js": "application/javascript",
    ".json": "application/json",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".gif": "image/gif",
    ".pdf": "application/pdf",
    ".md": "text/markdown",
  };
  return contentTypes[ext] || "application/octet-stream";
}

/**
 * Upload all files from a folder
 */
async function uploadFolder(folderPath, bucketName) {
  console.log(`📂 Scanning folder: ${folderPath}`);

  // Check if folder exists
  if (!fs.existsSync(folderPath)) {
    console.error(`❌ Folder not found: ${folderPath}`);
    console.log("💡 Creating uploads folder...");
    fs.mkdirSync(folderPath, { recursive: true });
    console.log("✅ Folder created. Please add files to upload.");
    return;
  }

  // Read all files in the folder
  const files = fs.readdirSync(folderPath);

  if (files.length === 0) {
    console.log("⚠️  No files found in the folder.");
    return;
  }

  console.log(`📦 Found ${files.length} file(s) to upload`);
  console.log(`🚀 Uploading to bucket: ${bucketName}\n`);

  let successCount = 0;
  let errorCount = 0;

  // Upload each file
  for (const file of files) {
    const filePath = path.join(folderPath, file);

    // Skip directories
    if (fs.statSync(filePath).isDirectory()) {
      console.log(`⏭️  Skipping directory: ${file}`);
      continue;
    }

    try {
      await uploadFile(filePath, bucketName);
      successCount++;
    } catch (error) {
      errorCount++;
    }
  }

  console.log("\n📊 Upload Summary:");
  console.log(`   ✅ Successful: ${successCount}`);
  console.log(`   ❌ Failed: ${errorCount}`);
}

// Main execution
(async () => {
  console.log("🌟 S3 File Upload Script Started\n");
  console.log(`Region: ${AWS_REGION}`);
  console.log(`Bucket: ${BUCKET_NAME}`);
  console.log(`Folder: ${UPLOAD_FOLDER}\n`);

  try {
    await uploadFolder(UPLOAD_FOLDER, BUCKET_NAME);
    console.log("\n✨ Upload process completed!");
  } catch (error) {
    console.error("\n💥 Fatal error:", error.message);
    process.exit(1);
  }
})();

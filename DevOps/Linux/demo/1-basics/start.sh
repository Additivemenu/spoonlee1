#!/bin/bash

# Quick start script for Linux Practice Environment
# Run this to build and start your learning environment

echo "🐧 Linux CLI Practice Environment - Quick Start"
echo "=============================================="
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first:"
    echo "   https://docs.docker.com/get-docker/"
    exit 1
fi

echo "✓ Docker is installed"
echo ""

# Check if container already exists
if docker ps -a --format '{{.Names}}' | grep -q '^my-linux-practice$'; then
    echo "📦 Found existing container 'my-linux-practice'"
    echo ""
    echo "Choose an option:"
    echo "  1) Restart existing container"
    echo "  2) Remove and create new container"
    echo "  3) Cancel"
    echo ""
    read -p "Enter choice (1-3): " choice
    
    case $choice in
        1)
            echo ""
            echo "🚀 Restarting existing container..."
            docker start -i my-linux-practice
            exit 0
            ;;
        2)
            echo ""
            echo "🗑️  Removing old container..."
            docker rm my-linux-practice
            ;;
        *)
            echo "Cancelled."
            exit 0
            ;;
    esac
fi

# Build the image
echo "📦 Building Docker image (this may take a minute)..."
docker build -t linux-practice . 

if [ $? -eq 0 ]; then
    echo ""
    echo "✓ Image built successfully!"
    echo ""
    echo "🚀 Starting your Linux practice environment..."
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "  Type 'linux-tutor' or 'tutor' to start learning!"
    echo "  Type 'exit' to leave the container"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    
    # Run the container
    docker run -it --name my-linux-practice linux-practice
else
    echo "❌ Failed to build Docker image"
    exit 1
fi

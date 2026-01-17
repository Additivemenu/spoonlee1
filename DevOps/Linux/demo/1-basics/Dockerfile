# Dockerfile for Linux CLI Practice
# This creates a lightweight Linux environment for learning basic commands

FROM ubuntu:22.04

# Install useful tools for learning
RUN apt-get update && apt-get install -y \
    vim \
    nano \
    curl \
    wget \
    tree \
    less \
    man-db \
    && rm -rf /var/lib/apt/lists/*

# Create a practice directory structure
RUN mkdir -p /home/practice/{documents,projects,scripts,temp}

# Create some sample files for practice
RUN echo "Hello, Linux!" > /home/practice/hello.txt && \
    echo "This is a sample document" > /home/practice/documents/sample.txt && \
    echo "#!/bin/bash\necho 'Hello from script!'" > /home/practice/scripts/hello.sh && \
    chmod +x /home/practice/scripts/hello.sh

# Set working directory
WORKDIR /home/practice

# Keep container running
CMD ["/bin/bash"]

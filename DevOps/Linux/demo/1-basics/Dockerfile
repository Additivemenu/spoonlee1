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
RUN mkdir -p /home/practice/documents && \
    mkdir -p /home/practice/projects && \
    mkdir -p /home/practice/scripts && \
    mkdir -p /home/practice/temp

# Create some sample files for practice
RUN echo "Hello, Linux!" > /home/practice/hello.txt && \
    echo "This is a sample document" > /home/practice/documents/sample.txt && \
    echo "#!/bin/bash\necho 'Hello from script!'" > /home/practice/scripts/hello.sh && \
    chmod +x /home/practice/scripts/hello.sh

# Copy the modular tutorial system
COPY linux-tutor-modular.sh /usr/local/bin/linux-tutor
COPY topics/ /usr/local/lib/linux-tutor/topics/
RUN chmod +x /usr/local/bin/linux-tutor && \
    chmod +x /usr/local/lib/linux-tutor/topics/*.sh

# Update the script to use the correct topics directory
RUN sed -i 's|SCRIPT_DIR/topics|/usr/local/lib/linux-tutor/topics|g' /usr/local/bin/linux-tutor

# Add tutorial alias to bashrc for easy access
RUN echo 'alias tutor="linux-tutor"' >> /root/.bashrc

# Set working directory
WORKDIR /home/practice

# Create a welcome script that runs on container start
RUN echo '#!/bin/bash' > /usr/local/bin/welcome.sh && \
    echo 'echo ""' >> /usr/local/bin/welcome.sh && \
    echo 'echo "Welcome to your Linux Practice Environment! 🐧"' >> /usr/local/bin/welcome.sh && \
    echo 'echo ""' >> /usr/local/bin/welcome.sh && \
    echo 'echo "To start the interactive tutorial, type: linux-tutor"' >> /usr/local/bin/welcome.sh && \
    echo 'echo "Or simply: tutor"' >> /usr/local/bin/welcome.sh && \
    echo 'echo ""' >> /usr/local/bin/welcome.sh && \
    echo 'exec /bin/bash' >> /usr/local/bin/welcome.sh && \
    chmod +x /usr/local/bin/welcome.sh

# Run welcome script on container start
CMD ["/usr/local/bin/welcome.sh"]

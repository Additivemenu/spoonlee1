# Linux CLI Interactive Tutorial

An interactive, hands-on Docker-based tutorial for learning Linux command-line basics. Learn by doing with step-by-step guided exercises!

## Quick Start

### Option 1: One-Click Start (Recommended)

```bash
./start.sh
```

### Option 2: Manual Setup

```bash
# Build the Docker image
docker build -t linux-practice .

# Run the container
docker run -it --name my-linux-practice linux-practice
```

### Start Learning

Once inside the container, type:

```bash
linux-tutor
# or simply
tutor
```

## Tutorial Topics

The interactive tutorial covers 7 essential topics:

1. **Navigation Basics** - `pwd`, `ls`, `cd`, `tree`
2. **File Operations** - `touch`, `mkdir`, `cp`, `mv`, `rm`
3. **Viewing Files** - `cat`, `less`, `head`, `tail`
4. **Text Processing** - `echo`, `grep`, `find`, piping with `|`
5. **File Permissions** - `chmod`, understanding `rwx` permissions
6. **System Information** - `whoami`, `df`, `free`, `ps`, `top`
7. **Network Commands** - `ping`, `curl`, `wget`, `ip`, `ss`, `nslookup`
8. **Complete Beginner's Path** - All topics in optimal learning order

## Features

### Interactive Learning

- **Step-by-step guidance** - Each command is explained before you use it
- **Hands-on practice** - Type commands yourself and see results instantly
- **Safe environment** - Isolated Docker container, practice without fear
- **Color-coded interface** - Easy-to-read prompts and instructions

### Modular Design

- **Well-organized** - Each topic is a separate module
- **Easy to extend** - Add new topics without modifying existing code
- **Maintainable** - Clean structure with shared utilities

## Project Structure

```
1-basics/
├── Dockerfile                    # Docker container configuration
├── README.md                     # This file - complete documentation
├── linux-cli-guide.md            # Quick reference for all commands
├── linux-tutor-modular.sh       # Main tutorial script
├── start.sh                      # Quick launch script
└── topics/                       # Modular topic scripts
    ├── utils.sh                 # Shared utilities & functions
    ├── 01-navigation.sh        # Navigation commands
    ├── 02-file-operations.sh   # File operations
    ├── 03-viewing-files.sh     # Viewing files
    ├── 04-text-processing.sh   # Text processing
    ├── 05-permissions.sh       # File permissions
    ├── 06-system-info.sh       # System information
    ├── 07-network.sh           # Network commands
    └── README.md                # Topics documentation
```

## Container Management

### Re-enter Existing Container

```bash
docker start -i my-linux-practice
```

### Remove Container

```bash
docker rm my-linux-practice
```

### Remove Image

```bash
docker rmi linux-practice
```

### Start Fresh

```bash
docker rm my-linux-practice  # Remove old container
./start.sh                    # Build and run new one
```

## For Developers

### Adding a New Topic

1. **Create a new topic file**: `topics/07-your-topic.sh`

2. **Define the topic function**:

```bash
#!/bin/bash

# Topic 7: Your Topic Name
# Teaches: command1, command2

topic_your_topic() {
    clear
    show_header "Topic 7: Your Topic Name"

    echo -e "${BLUE}Learn about...${NC}\n"
    wait_for_user

    # Your tutorial content here
    # Use shared utilities: show_header, wait_for_user, check_command

    echo -e "\n${GREEN}${BOLD}🎉 Well done!${NC}"
    wait_for_user
}
```

3. **Source in main script** (`linux-tutor-modular.sh`):

```bash
source "$TOPICS_DIR/07-your-topic.sh"
```

4. **Add to menu** (in `topics/utils.sh`):

```bash
echo -e "  ${BOLD}7)${NC} Your Topic Name"
```

5. **Add to switch statement** (in main script):

```bash
7)
    topic_your_topic
    ;;
```

### Testing Locally

```bash
# Make scripts executable
chmod +x linux-tutor-modular.sh topics/*.sh

# Test the tutorial locally
./linux-tutor-modular.sh

# Or test individual topics
source topics/utils.sh
source topics/01-navigation.sh
topic_navigation
```

## Why This Tutorial?

### For Learners

- ✅ **Beginner-friendly** - No prior Linux knowledge required
- ✅ **Interactive** - Learn by doing, not just reading
- ✅ **Safe** - Practice in isolated environment
- ✅ **Comprehensive** - Covers essential commands

### For Educators

- ✅ **Easy to deploy** - Just Docker and one command
- ✅ **Customizable** - Modular design for easy modifications
- ✅ **Trackable** - Step-by-step progression

### For Developers

- ✅ **Modular** - Each topic is independent
- ✅ **Maintainable** - Clean, organized code
- ✅ **Extensible** - Easy to add new topics
- ✅ **Well-documented** - Clear code and comments

## Tips for Learning

1. **Start with Topic 7** (Complete Beginner's Path) if you're new to Linux
2. **Type commands yourself** - Don't just read, practice!
3. **Take your time** - The tutorial waits for you
4. **Experiment** - Try variations of commands
5. **Use the reference** - Check `linux-cli-guide.md` for quick lookups

## Troubleshooting

### Docker not installed?

```bash
# macOS with Homebrew
brew install --cask docker

# Or download from https://www.docker.com/products/docker-desktop
```

### Container name already exists?

The `start.sh` script will detect existing containers and offer to:

1. Restart the existing container
2. Remove and create a new one
3. Cancel

### Want to exit the tutorial?

Press `0` to exit the tutorial menu, or type `exit` to leave the container.

## Command Reference

For a complete reference of all commands covered in this tutorial, see [`linux-cli-guide.md`](./linux-cli-guide.md).

## Contributing

Contributions are welcome! To add new topics:

1. Fork the repository
2. Create a new topic file in `topics/`
3. Follow the existing pattern and use shared utilities
4. Update the main script to include your topic
5. Test thoroughly
6. Submit a pull request

## License

This project is open source and available for educational purposes.

---

**Ready to learn Linux? Run `./start.sh` and start your journey! 🐧**

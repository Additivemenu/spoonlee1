# Linux CLI Interactive Tutorial System

## 📁 Project Structure

```
1-basics/
├── Dockerfile              # Container setup with tutorial
├── linux-tutor.sh          # Interactive tutorial script
├── linux-cli-guide.md      # Reference documentation
├── README.md               # This file - Getting started guide
└── start.sh                # Quick start script (run this!)
```

## 🎯 Quick Start (Easiest Way!)

```bash
# Navigate to the directory
cd /Users/lixueshuo/spoonlee/spoonlee1/DevOps/Linux/demo/1-basics/

# Run the quick start script
./start.sh
```

That's it! The script will:

1. ✅ Check if Docker is installed
2. 🔨 Build the Docker image
3. 🚀 Start the container
4. 🎓 Welcome you to start learning!

## 🎓 How the Tutorial Works

```
┌─────────────────────────────────────────────┐
│  You enter the Docker container             │
│  ↓                                           │
│  Welcome message appears                     │
│  ↓                                           │
│  Type: linux-tutor (or tutor)               │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│        Tutorial Menu Appears                 │
│                                              │
│  1) Navigation Basics                        │
│  2) File Operations                          │
│  3) Viewing Files                            │
│  4) Text Processing                          │
│  5) File Permissions                         │
│  6) System Information                       │
│  7) Complete Beginner's Path ⭐              │
│  0) Exit                                     │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│     Interactive Step-by-Step Learning        │
│                                              │
│  Tutorial explains → You type → See results │
│                                              │
│  Each topic has multiple commands            │
│  with hands-on practice!                     │
└─────────────────────────────────────────────┘
```

## 💡 Tutorial Features

### 🎨 Visual Design

- **Color-coded** instructions (green=good, yellow=type this, blue=info, red=warning)
- **Clean interface** with boxes and separators
- **Easy to follow** step-by-step prompts

### 📚 Educational Approach

- **Explanation first** - Understand before doing
- **Hands-on practice** - Type commands yourself
- **Immediate feedback** - See results right away
- **Reinforcement** - Summary after each topic

### 🎯 Learning Paths

- **Pick specific topics** - Focus on what you need
- **Complete path** - Beginner-friendly full curriculum
- **Flexible pacing** - Learn at your own speed

## 🚀 Alternative: Manual Setup

If you prefer to build and run manually:

```bash
# 1. Build the image
docker build -t linux-practice .

# 2. Run the container
docker run -it --name my-linux-practice linux-practice

# 3. Inside container, start tutorial
linux-tutor
# or simply
tutor
```

## 📖 Tutorial Topics in Detail

### 1️⃣ Navigation Basics (5-10 min)

Learn to move around the filesystem:

- `pwd` - Where am I?
- `ls` - What's here?
- `cd` - Move to another location
- `tree` - Visualize directory structure

### 2️⃣ File Operations (10-15 min)

Create, copy, move, and delete:

- `touch` - Create files
- `mkdir` - Create directories
- `cp` - Copy files
- `mv` - Move/rename files
- `rm` - Delete files (with safety tips!)

### 3️⃣ Viewing Files (5-10 min)

Different ways to read files:

- `cat` - Show entire file
- `head` - First few lines
- `tail` - Last few lines
- `less` - Scrollable viewer

### 4️⃣ Text Processing (10-15 min)

Search and manipulate text:

- `echo` - Print and save text
- `grep` - Search for patterns
- `find` - Find files
- `|` (pipe) - Chain commands together

### 5️⃣ File Permissions (10-15 min)

Understand Linux security:

- Read, Write, Execute
- `chmod` - Change permissions
- Numeric permissions (755, 644, etc.)
- Making scripts executable

### 6️⃣ System Information (5-10 min)

Monitor your system:

- `whoami` - Current user
- `df` - Disk space
- `free` - Memory usage
- `ps` - Running processes

### 7️⃣ Complete Beginner's Path (45-60 min)

All topics in optimal learning order!

## 🎮 Tips for Best Learning Experience

1. **Start with Topic 7** if you're completely new to Linux
2. **Take your time** - Quality over speed
3. **Type commands yourself** - Don't just read
4. **Experiment** - Try variations of commands
5. **Repeat topics** - Repetition builds mastery
6. **Use the reference** - Check `linux-cli-guide.md` for quick reference

## 🔄 Container Management

### Continue Learning Later

```bash
# Exit container (type in container)
exit

# Come back later
docker start -i my-linux-practice
```

### Start Fresh

```bash
# Remove old container
docker rm my-linux-practice

# Run start.sh again or create new container
./start.sh
```

### Clean Up Completely

```bash
# Remove container
docker rm my-linux-practice

# Remove image
docker rmi linux-practice
```

## 🎯 Learning Goals

After completing the tutorial, you will be able to:

✅ Navigate the Linux filesystem confidently  
✅ Manage files and directories effectively  
✅ View and search file contents  
✅ Understand and modify file permissions  
✅ Monitor system resources  
✅ Chain commands with pipes  
✅ Use Linux for daily development tasks

## 📚 Additional Resources

- **In-container help**: `man <command>` for detailed manuals
- **Quick help**: `<command> --help` for brief usage
- **Reference guide**: See `linux-cli-guide.md` in this directory
- **Practice freely**: All commands work outside the tutorial too!

## 🤝 Troubleshooting

### Docker not found

```bash
# Install Docker Desktop for Mac
brew install --cask docker
# Or download from: https://www.docker.com/products/docker-desktop
```

### Container name already in use

```bash
# Remove existing container
docker rm my-linux-practice
# Or use a different name
docker run -it --name linux-practice-2 linux-practice
```

### Want to restart tutorial

```bash
# Just run it again inside the container
linux-tutor
```

## 🎉 Ready to Learn?

Let's get started! Run:

```bash
./start.sh
```

Or if you haven't made it executable:

```bash
bash start.sh
```

Happy Learning! 🐧✨

---

_Created to make Linux learning fun and interactive!_

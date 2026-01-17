# Linux CLI Interactive Tutorial - Docker Setup

## 🎯 What's New!

This Docker environment now includes an **interactive tutorial system** that guides you through learning Linux commands step-by-step!

## 🚀 Getting Started

### 1. Build the Docker Image

```bash
cd /Users/lixueshuo/spoonlee/spoonlee1/DevOps/Linux/demo/1-basics/
docker build -t linux-practice .
```

### 2. Run the Container

```bash
docker run -it --name my-linux-practice linux-practice
```

When you enter the container, you'll see a welcome message!

### 3. Start the Interactive Tutorial

Simply type:

```bash
linux-tutor
```

Or use the shortcut:

```bash
tutor
```

## 📚 Tutorial Topics

The interactive tutorial covers:

1. **Navigation Basics** - pwd, ls, cd, tree
2. **File Operations** - touch, mkdir, cp, mv, rm
3. **Viewing Files** - cat, less, head, tail
4. **Text Processing** - grep, find, echo, piping
5. **File Permissions** - chmod, understanding rwx
6. **System Information** - whoami, df, ps, top
7. **Complete Beginner's Path** - All topics in order!

## ✨ Features

### Interactive Learning

- **Step-by-step guidance** - Each command is explained before you use it
- **Hands-on practice** - Type commands yourself in real-time
- **Immediate feedback** - See results instantly
- **Color-coded interface** - Easy to read and follow
- **Safe environment** - Practice without fear of breaking anything!

### Tutorial Navigation

- Choose specific topics or follow the complete path
- Return to main menu anytime
- Practice at your own pace

### Example Session

```
╔════════════════════════════════════════════════════════╗
║           Linux CLI Tutorial Topics                   ║
╚════════════════════════════════════════════════════════╝

Choose a topic to learn:

  1) Navigation Basics (pwd, ls, cd)
  2) File Operations (touch, mkdir, cp, mv, rm)
  3) Viewing Files (cat, less, head, tail)
  4) Text Processing (grep, find, echo)
  5) File Permissions (chmod, chown)
  6) System Information (whoami, df, ps, top)
  7) Complete Beginner's Path (All topics in order)

  0) Exit Tutorial

Enter your choice (0-7):
```

## 🎓 Learning Tips

1. **Start with Topic 7** if you're a complete beginner - it covers everything in the right order
2. **Practice each command** as prompted - don't just read!
3. **Take your time** - the tutorial waits for you to be ready
4. **Experiment freely** - you can't break anything in this container
5. **Revisit topics** - run the tutorial again to reinforce learning

## 🔄 Container Management

### Re-enter the Container

```bash
docker start -i my-linux-practice
```

### Stop the Container

```bash
docker stop my-linux-practice
```

### Remove the Container

```bash
docker rm my-linux-practice
```

### Remove the Image (optional)

```bash
docker rmi linux-practice
```

## 💡 Additional Commands

Even outside the tutorial, you can practice any Linux command:

```bash
# Practice on your own
pwd
ls -la
cd documents
cat hello.txt
tree

# Get help for any command
man ls
ls --help
```

## 🎨 Tutorial Features Explained

### Color Coding

- **Green** - Headers, success messages, tips
- **Blue** - Instructions and explanations
- **Yellow** - Commands you should type
- **Red** - Warnings and important notes

### Interactive Prompts

The tutorial will:

- Show you what command to type
- Wait for you to type it
- Execute it in real-time
- Show you the results
- Explain what happened

### Safe Learning

- All practice happens in isolated `/home/practice` directory
- Pre-created sample files and folders
- No risk to your host system
- Start fresh anytime by rebuilding the container

## 🏆 What You'll Learn

By the end of the complete tutorial, you'll be able to:

- Navigate the Linux filesystem confidently
- Create, copy, move, and delete files and directories
- View and search file contents
- Understand and modify file permissions
- Monitor system resources
- Use pipes and redirections
- Chain commands together effectively

## 🤝 Need Help?

- Type `man <command>` to see detailed manual pages
- Type `<command> --help` for quick help
- Restart the tutorial anytime with `linux-tutor`

## 🎉 Have Fun Learning!

Remember: The best way to learn Linux is by doing. Take your time with each exercise, and don't be afraid to experiment!

Happy Learning! 🐧

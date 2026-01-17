# Linux CLI Basics - Docker Practice Guide

## Getting Started

### 1. Build the Docker Image

```bash
docker build -t linux-practice .
```

### 2. Run the Container (Interactive Mode)

```bash
docker run -it --name my-linux-practice linux-practice
```

To exit the container: type `exit`

To re-enter an existing container:

```bash
docker start -i my-linux-practice
```

---

## Basic Linux Commands to Try

### Navigation Commands

#### `pwd` - Print Working Directory

Shows your current location in the filesystem

```bash
pwd
```

#### `ls` - List Files and Directories

```bash
ls                  # Basic list
ls -l              # Long format (detailed)
ls -la             # Include hidden files
ls -lh             # Human-readable file sizes
```

#### `cd` - Change Directory

```bash
cd documents       # Go to documents folder
cd ..             # Go up one level
cd ~              # Go to home directory
cd /              # Go to root directory
cd -              # Go to previous directory
```

#### `tree` - Display Directory Structure

```bash
tree              # Show directory tree
tree -L 2         # Limit depth to 2 levels
```

---

### File Operations

#### `cat` - Display File Contents

```bash
cat hello.txt                    # Display file
cat hello.txt documents/sample.txt   # Display multiple files
```

#### `touch` - Create Empty File

```bash
touch newfile.txt
touch file1.txt file2.txt file3.txt
```

#### `mkdir` - Create Directory

```bash
mkdir newfolder
mkdir -p parent/child/grandchild    # Create nested directories
```

#### `cp` - Copy Files/Directories

```bash
cp hello.txt hello_backup.txt       # Copy file
cp -r documents documents_backup    # Copy directory recursively
```

#### `mv` - Move/Rename Files

```bash
mv hello.txt temp/                  # Move file
mv hello.txt greeting.txt           # Rename file
```

#### `rm` - Remove Files/Directories

```bash
rm newfile.txt                      # Remove file
rm -r newfolder                     # Remove directory recursively
rm -f file.txt                      # Force remove (no prompt)
```

⚠️ **Warning**: `rm -rf /` would delete everything! Be careful with `rm`.

---

### File Viewing & Editing

#### `less` - View File (Paginated)

```bash
less hello.txt
# Press 'q' to quit, 'space' for next page, 'b' for previous page
```

#### `head` & `tail` - View Beginning/End of File

```bash
head hello.txt              # First 10 lines
head -n 5 hello.txt         # First 5 lines
tail hello.txt              # Last 10 lines
tail -f /var/log/syslog     # Follow file (real-time updates)
```

#### `nano` or `vim` - Text Editors

```bash
nano hello.txt              # Simple editor (Ctrl+X to exit)
vim hello.txt               # Advanced editor (press 'i' to insert, 'Esc' then ':wq' to save and quit)
```

---

### File Information

#### `file` - Determine File Type

```bash
file hello.txt
file scripts/hello.sh
```

#### `wc` - Word Count

```bash
wc hello.txt                # Lines, words, bytes
wc -l hello.txt             # Count lines only
wc -w hello.txt             # Count words only
```

#### `du` - Disk Usage

```bash
du -h hello.txt             # Human-readable size
du -sh documents/           # Summary of directory size
```

---

### Text Processing

#### `echo` - Print Text

```bash
echo "Hello, World!"
echo "New line" > file.txt          # Overwrite file
echo "Append line" >> file.txt      # Append to file
```

#### `grep` - Search Text Patterns

```bash
grep "Hello" hello.txt              # Search for "Hello"
grep -i "hello" hello.txt           # Case-insensitive search
grep -r "sample" .                  # Recursive search in all files
```

#### `find` - Find Files

```bash
find . -name "*.txt"                # Find all .txt files
find . -type d                      # Find all directories
find . -type f -size +1M            # Find files larger than 1MB
```

---

### System Information

#### `whoami` - Current User

```bash
whoami
```

#### `uname` - System Information

```bash
uname -a                            # All system info
uname -r                            # Kernel version
```

#### `df` - Disk Space

```bash
df -h                               # Disk usage (human-readable)
```

#### `free` - Memory Usage

```bash
free -h                             # Memory usage (human-readable)
```

#### `ps` - Running Processes

```bash
ps aux                              # All processes
ps aux | grep bash                  # Find bash processes
```

#### `top` or `htop` - Interactive Process Viewer

```bash
top                                 # Press 'q' to quit
```

---

### Permissions

#### `chmod` - Change File Permissions

```bash
chmod +x script.sh                  # Make executable
chmod 755 script.sh                 # rwxr-xr-x
chmod 644 file.txt                  # rw-r--r--
```

Permission numbers:

- 4 = read (r)
- 2 = write (w)
- 1 = execute (x)

#### `chown` - Change Owner

```bash
chown user:group file.txt           # Change owner and group
```

---

### Piping and Redirection

#### Pipe `|` - Chain Commands

```bash
ls -la | grep txt                   # List files, filter for .txt
cat hello.txt | wc -l               # Count lines in file
```

#### Redirect Output `>` and `>>`

```bash
ls > filelist.txt                   # Overwrite file with output
ls >> filelist.txt                  # Append output to file
```

#### Redirect Input `<`

```bash
wc -l < hello.txt                   # Use file as input
```

---

### Useful Shortcuts

- `Ctrl + C` - Cancel current command
- `Ctrl + D` - Exit shell (same as `exit`)
- `Ctrl + L` - Clear screen (same as `clear`)
- `Ctrl + R` - Search command history
- `Tab` - Auto-complete filenames/commands
- `↑` / `↓` - Navigate command history

---

## Practice Exercises

### Exercise 1: File Management

```bash
# Create a project structure
mkdir -p myproject/{src,docs,tests}
cd myproject
echo "# My Project" > README.md
echo "console.log('Hello');" > src/app.js
tree
```

### Exercise 2: Find and Filter

```bash
# Find all .txt files and count them
find . -name "*.txt" | wc -l

# Search for "sample" in all files
grep -r "sample" .
```

### Exercise 3: File Manipulation

```bash
# Create, copy, and organize files
touch file1.txt file2.txt file3.txt
mkdir backup
cp *.txt backup/
ls -l backup/
```

### Exercise 4: Text Processing

```bash
# Create a file with multiple lines
echo -e "apple\nbanana\ncherry\napricot" > fruits.txt
cat fruits.txt
grep "a" fruits.txt
sort fruits.txt
```

---

## Network Commands

### `hostname` - Show Computer Name

```bash
hostname              # Show hostname
hostname -f          # Show fully qualified domain name
hostname -i          # Show IP address
```

### `ip` - Network Interface Information

```bash
ip addr show         # Show all network interfaces and IPs
ip a                 # Short version
ip link show         # Show network interfaces only
ip route             # Show routing table
```

### `ping` - Test Network Connectivity

```bash
ping -c 4 8.8.8.8           # Ping Google DNS (4 packets)
ping -c 3 google.com        # Ping domain name
ping -c 5 127.0.0.1         # Ping localhost
```

Flags:

- `-c N`: Send N packets and stop
- `-i N`: Wait N seconds between packets

### `curl` - Transfer Data from URLs

```bash
curl https://api.github.com                    # Get content
curl -I https://www.google.com                 # Show headers only
curl -o output.html https://example.com        # Download to file
curl -L https://github.com                     # Follow redirects
curl -X POST -d "data=value" http://api.com    # POST request
```

Common flags:

- `-I`: Show headers only
- `-o`: Output to file
- `-L`: Follow redirects
- `-X`: Specify HTTP method
- `-d`: Send data

### `wget` - Download Files

```bash
wget https://example.com/file.txt              # Download file
wget -O newname.txt https://example.com/file.txt  # Download with new name
wget -c https://example.com/largefile.zip      # Continue interrupted download
wget -q https://example.com/file.txt           # Quiet mode
```

### `ss` - Socket Statistics

```bash
ss -tuln                    # Show listening TCP/UDP ports
ss -tulnp                   # Include process names
ss -s                       # Show summary statistics
ss -t state established     # Show established TCP connections
```

Flags:

- `-t`: TCP sockets
- `-u`: UDP sockets
- `-l`: Listening sockets
- `-n`: Show numbers instead of names
- `-p`: Show process info

### `netstat` - Network Statistics (Legacy)

```bash
netstat -tuln              # Show listening ports
netstat -r                 # Show routing table
netstat -i                 # Show network interfaces
```

Note: `ss` is the modern replacement for `netstat`

### `nslookup` / `dig` - DNS Lookup

```bash
nslookup google.com        # Basic DNS lookup
nslookup google.com 8.8.8.8  # Use specific DNS server

dig google.com             # Detailed DNS info
dig google.com +short      # Show just the IP
dig google.com MX          # Show mail servers
```

### `traceroute` - Trace Network Path

```bash
traceroute google.com      # Show route to destination
traceroute -n google.com   # Don't resolve hostnames
```

Note: May require installation or special permissions

### Network Troubleshooting Examples

```bash
# Test internet connectivity
ping -c 3 8.8.8.8

# Check if a website is reachable
curl -I https://www.google.com

# Find your IP address
ip addr show | grep inet

# Check if a specific port is open
ss -tuln | grep :80

# DNS lookup
nslookup github.com
```

---

## Additional Resources

- **Manual Pages**: `man <command>` (e.g., `man ls`)
- **Help**: `<command> --help` (e.g., `ls --help`)
- **Exit Container**: Type `exit` or press `Ctrl+D`

---

## Clean Up

When you're done practicing:

```bash
# Exit the container
exit

# Remove the container
docker rm my-linux-practice

# Remove the image (optional)
docker rmi linux-practice
```

Happy Learning! 🐧

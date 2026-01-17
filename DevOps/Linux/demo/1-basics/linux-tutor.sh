#!/bin/bash

# Colors for better readability
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color
BOLD='\033[1m'

# Clear screen and show welcome message
clear
echo -e "${GREEN}${BOLD}"
echo "╔════════════════════════════════════════════════════════╗"
echo "║                                                        ║"
echo "║        Welcome to Linux CLI Interactive Tutor!        ║"
echo "║                                                        ║"
echo "╚════════════════════════════════════════════════════════╝"
echo -e "${NC}"
echo ""
echo -e "${BLUE}This interactive tutorial will guide you through basic Linux commands.${NC}"
echo -e "${BLUE}Follow the prompts and practice each command!${NC}"
echo ""

# Function to wait for user to press Enter
wait_for_user() {
    echo -e "\n${YELLOW}Press Enter to continue...${NC}"
    read
}

# Function to check if command was executed
check_command() {
    echo -e "\n${GREEN}✓ Great! Let's see what happened...${NC}"
    sleep 1
}

# Function to show section header
show_header() {
    echo -e "\n${GREEN}${BOLD}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${GREEN}${BOLD}  $1${NC}"
    echo -e "${GREEN}${BOLD}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"
}

# Main menu
show_menu() {
    clear
    echo -e "${GREEN}${BOLD}"
    echo "╔════════════════════════════════════════════════════════╗"
    echo "║           Linux CLI Tutorial Topics                   ║"
    echo "╚════════════════════════════════════════════════════════╝"
    echo -e "${NC}"
    echo ""
    echo -e "${BLUE}Choose a topic to learn:${NC}"
    echo ""
    echo -e "  ${BOLD}1)${NC} Navigation Basics (pwd, ls, cd)"
    echo -e "  ${BOLD}2)${NC} File Operations (touch, mkdir, cp, mv, rm)"
    echo -e "  ${BOLD}3)${NC} Viewing Files (cat, less, head, tail)"
    echo -e "  ${BOLD}4)${NC} Text Processing (grep, find, echo)"
    echo -e "  ${BOLD}5)${NC} File Permissions (chmod, chown)"
    echo -e "  ${BOLD}6)${NC} System Information (whoami, df, ps, top)"
    echo -e "  ${BOLD}7)${NC} Complete Beginner's Path (All topics in order)"
    echo ""
    echo -e "  ${BOLD}0)${NC} Exit Tutorial"
    echo ""
    echo -n "Enter your choice (0-7): "
}

# Topic 1: Navigation
topic_navigation() {
    clear
    show_header "Topic 1: Navigation Basics"
    
    echo -e "${BLUE}Let's learn how to navigate the Linux filesystem!${NC}\n"
    wait_for_user
    
    # pwd
    clear
    show_header "Command: pwd (Print Working Directory)"
    echo -e "${BLUE}This shows you where you currently are in the filesystem.${NC}"
    echo -e "\n${YELLOW}Try it now! Type:${NC} ${BOLD}pwd${NC}"
    echo -e "${YELLOW}Then press Enter${NC}\n"
    echo -n "$ "
    read user_cmd
    eval $user_cmd
    check_command
    wait_for_user
    
    # ls
    clear
    show_header "Command: ls (List)"
    echo -e "${BLUE}This lists all files and directories in your current location.${NC}"
    echo -e "\n${YELLOW}Try it now! Type:${NC} ${BOLD}ls${NC}"
    echo -n "$ "
    read user_cmd
    eval $user_cmd
    check_command
    
    echo -e "\n${BLUE}Now let's see more details with flags:${NC}"
    echo -e "${YELLOW}Try:${NC} ${BOLD}ls -la${NC} ${BLUE}(shows hidden files and details)${NC}"
    echo -n "$ "
    read user_cmd
    eval $user_cmd
    check_command
    wait_for_user
    
    # cd
    clear
    show_header "Command: cd (Change Directory)"
    echo -e "${BLUE}This lets you move to different directories.${NC}"
    echo -e "\n${YELLOW}Try moving to the documents folder. Type:${NC} ${BOLD}cd documents${NC}"
    echo -n "$ "
    read user_cmd
    eval $user_cmd
    check_command
    
    echo -e "\n${BLUE}Now check where you are:${NC}"
    echo -e "${YELLOW}Type:${NC} ${BOLD}pwd${NC}"
    echo -n "$ "
    read user_cmd
    eval $user_cmd
    check_command
    
    echo -e "\n${BLUE}Let's go back up one level:${NC}"
    echo -e "${YELLOW}Type:${NC} ${BOLD}cd ..${NC} ${BLUE}(two dots means parent directory)${NC}"
    echo -n "$ "
    read user_cmd
    eval $user_cmd
    pwd
    check_command
    wait_for_user
    
    # tree
    clear
    show_header "Command: tree (Directory Tree)"
    echo -e "${BLUE}This shows a visual tree of your directory structure.${NC}"
    echo -e "\n${YELLOW}Try it now! Type:${NC} ${BOLD}tree${NC}"
    echo -n "$ "
    read user_cmd
    eval $user_cmd
    check_command
    
    echo -e "\n${GREEN}${BOLD}🎉 Congratulations!${NC} ${BLUE}You've mastered navigation basics!${NC}"
    echo -e "${BLUE}Summary of commands:${NC}"
    echo -e "  • ${BOLD}pwd${NC} - Shows current directory"
    echo -e "  • ${BOLD}ls${NC} - Lists files/folders"
    echo -e "  • ${BOLD}cd <directory>${NC} - Changes directory"
    echo -e "  • ${BOLD}cd ..${NC} - Goes up one level"
    echo -e "  • ${BOLD}tree${NC} - Shows directory tree"
    wait_for_user
}

# Topic 2: File Operations
topic_file_operations() {
    clear
    show_header "Topic 2: File Operations"
    
    echo -e "${BLUE}Let's learn how to create, copy, move, and delete files!${NC}\n"
    wait_for_user
    
    # Make sure we're in practice directory
    cd /home/practice/temp
    
    # touch
    clear
    show_header "Command: touch (Create Empty File)"
    echo -e "${BLUE}The 'touch' command creates a new empty file.${NC}"
    echo -e "\n${YELLOW}Let's create a file called 'myfile.txt'. Type:${NC} ${BOLD}touch myfile.txt${NC}"
    echo -n "$ "
    read user_cmd
    eval $user_cmd
    check_command
    
    echo -e "\n${BLUE}Now let's verify it was created:${NC}"
    echo -e "${YELLOW}Type:${NC} ${BOLD}ls -l${NC}"
    echo -n "$ "
    read user_cmd
    eval $user_cmd
    check_command
    wait_for_user
    
    # mkdir
    clear
    show_header "Command: mkdir (Make Directory)"
    echo -e "${BLUE}Creates a new directory (folder).${NC}"
    echo -e "\n${YELLOW}Create a directory called 'myfolder'. Type:${NC} ${BOLD}mkdir myfolder${NC}"
    echo -n "$ "
    read user_cmd
    eval $user_cmd
    check_command
    
    echo -e "\n${BLUE}Verify it was created:${NC}"
    echo -e "${YELLOW}Type:${NC} ${BOLD}ls -l${NC}"
    echo -n "$ "
    read user_cmd
    eval $user_cmd
    check_command
    wait_for_user
    
    # cp
    clear
    show_header "Command: cp (Copy)"
    echo -e "${BLUE}Copies files or directories.${NC}"
    echo -e "\n${YELLOW}Copy 'myfile.txt' to 'myfile_backup.txt'. Type:${NC}"
    echo -e "${BOLD}cp myfile.txt myfile_backup.txt${NC}"
    echo -n "$ "
    read user_cmd
    eval $user_cmd
    check_command
    
    echo -e "\n${BLUE}Check that both files exist:${NC}"
    echo -e "${YELLOW}Type:${NC} ${BOLD}ls -l${NC}"
    echo -n "$ "
    read user_cmd
    eval $user_cmd
    check_command
    wait_for_user
    
    # mv
    clear
    show_header "Command: mv (Move/Rename)"
    echo -e "${BLUE}Moves or renames files and directories.${NC}"
    echo -e "\n${YELLOW}Let's rename 'myfile.txt' to 'newname.txt'. Type:${NC}"
    echo -e "${BOLD}mv myfile.txt newname.txt${NC}"
    echo -n "$ "
    read user_cmd
    eval $user_cmd
    check_command
    
    echo -e "\n${BLUE}Notice the old file is gone:${NC}"
    echo -e "${YELLOW}Type:${NC} ${BOLD}ls -l${NC}"
    echo -n "$ "
    read user_cmd
    eval $user_cmd
    check_command
    
    echo -e "\n${BLUE}Now let's move a file into a directory:${NC}"
    echo -e "${YELLOW}Type:${NC} ${BOLD}mv newname.txt myfolder/${NC}"
    echo -n "$ "
    read user_cmd
    eval $user_cmd
    check_command
    
    echo -e "\n${YELLOW}Type:${NC} ${BOLD}ls -l myfolder/${NC}"
    echo -n "$ "
    read user_cmd
    eval $user_cmd
    check_command
    wait_for_user
    
    # rm
    clear
    show_header "Command: rm (Remove)"
    echo -e "${RED}${BOLD}⚠️  WARNING:${NC} ${RED}This permanently deletes files! Be careful!${NC}"
    echo -e "\n${BLUE}Let's safely remove the backup file.${NC}"
    echo -e "${YELLOW}Type:${NC} ${BOLD}rm myfile_backup.txt${NC}"
    echo -n "$ "
    read user_cmd
    eval $user_cmd
    check_command
    
    echo -e "\n${BLUE}Verify it's gone:${NC}"
    echo -e "${YELLOW}Type:${NC} ${BOLD}ls -l${NC}"
    echo -n "$ "
    read user_cmd
    eval $user_cmd
    check_command
    
    echo -e "\n${BLUE}To remove a directory, use the -r flag (recursive):${NC}"
    echo -e "${YELLOW}Type:${NC} ${BOLD}rm -r myfolder${NC}"
    echo -n "$ "
    read user_cmd
    eval $user_cmd
    check_command
    
    echo -e "\n${YELLOW}Type:${NC} ${BOLD}ls -l${NC}"
    echo -n "$ "
    read user_cmd
    eval $user_cmd
    check_command
    
    echo -e "\n${GREEN}${BOLD}🎉 Well done!${NC} ${BLUE}You've learned file operations!${NC}"
    echo -e "${BLUE}Summary:${NC}"
    echo -e "  • ${BOLD}touch <file>${NC} - Creates empty file"
    echo -e "  • ${BOLD}mkdir <dir>${NC} - Creates directory"
    echo -e "  • ${BOLD}cp <src> <dest>${NC} - Copies file"
    echo -e "  • ${BOLD}mv <src> <dest>${NC} - Moves/renames file"
    echo -e "  • ${BOLD}rm <file>${NC} - Deletes file"
    echo -e "  • ${BOLD}rm -r <dir>${NC} - Deletes directory"
    wait_for_user
    
    cd /home/practice
}

# Topic 3: Viewing Files
topic_viewing_files() {
    clear
    show_header "Topic 3: Viewing Files"
    
    echo -e "${BLUE}Let's learn different ways to view file contents!${NC}\n"
    wait_for_user
    
    cd /home/practice
    
    # Create a sample file with multiple lines
    echo -e "Line 1: Hello, Linux!\nLine 2: This is a test file.\nLine 3: Learning is fun!\nLine 4: Keep practicing!\nLine 5: You're doing great!\nLine 6: More content here.\nLine 7: Almost there!\nLine 8: Second to last line.\nLine 9: Last line!" > temp/sample_large.txt
    
    # cat
    clear
    show_header "Command: cat (Concatenate)"
    echo -e "${BLUE}The simplest way to view file contents.${NC}"
    echo -e "\n${YELLOW}Let's view hello.txt. Type:${NC} ${BOLD}cat hello.txt${NC}"
    echo -n "$ "
    read user_cmd
    eval $user_cmd
    check_command
    wait_for_user
    
    # head
    clear
    show_header "Command: head (View First Lines)"
    echo -e "${BLUE}Shows the first 10 lines of a file (or specify a number).${NC}"
    echo -e "\n${YELLOW}Type:${NC} ${BOLD}head temp/sample_large.txt${NC}"
    echo -n "$ "
    read user_cmd
    eval $user_cmd
    check_command
    
    echo -e "\n${BLUE}Now let's see just the first 3 lines:${NC}"
    echo -e "${YELLOW}Type:${NC} ${BOLD}head -n 3 temp/sample_large.txt${NC}"
    echo -n "$ "
    read user_cmd
    eval $user_cmd
    check_command
    wait_for_user
    
    # tail
    clear
    show_header "Command: tail (View Last Lines)"
    echo -e "${BLUE}Shows the last 10 lines of a file.${NC}"
    echo -e "\n${YELLOW}Type:${NC} ${BOLD}tail temp/sample_large.txt${NC}"
    echo -n "$ "
    read user_cmd
    eval $user_cmd
    check_command
    
    echo -e "\n${BLUE}Show just the last 2 lines:${NC}"
    echo -e "${YELLOW}Type:${NC} ${BOLD}tail -n 2 temp/sample_large.txt${NC}"
    echo -n "$ "
    read user_cmd
    eval $user_cmd
    check_command
    wait_for_user
    
    # less
    clear
    show_header "Command: less (Paginated Viewer)"
    echo -e "${BLUE}Opens a file in a scrollable viewer.${NC}"
    echo -e "${YELLOW}Controls:${NC}"
    echo -e "  • Space bar: Next page"
    echo -e "  • 'b': Previous page"
    echo -e "  • 'q': Quit"
    echo -e "  • Arrow keys: Scroll up/down"
    echo -e "\n${YELLOW}Type:${NC} ${BOLD}less temp/sample_large.txt${NC}"
    echo -e "${RED}(Press 'q' to quit when you're done viewing)${NC}"
    echo -n "$ "
    read user_cmd
    eval $user_cmd
    check_command
    
    echo -e "\n${GREEN}${BOLD}🎉 Excellent!${NC} ${BLUE}You now know how to view files!${NC}"
    echo -e "${BLUE}Summary:${NC}"
    echo -e "  • ${BOLD}cat <file>${NC} - Shows entire file"
    echo -e "  • ${BOLD}head <file>${NC} - Shows first 10 lines"
    echo -e "  • ${BOLD}tail <file>${NC} - Shows last 10 lines"
    echo -e "  • ${BOLD}less <file>${NC} - Scrollable viewer"
    wait_for_user
}

# Topic 4: Text Processing
topic_text_processing() {
    clear
    show_header "Topic 4: Text Processing"
    
    echo -e "${BLUE}Let's learn to search and manipulate text!${NC}\n"
    wait_for_user
    
    cd /home/practice
    
    # Create sample files for searching
    echo -e "apple\nbanana\napricot\ncherry\navocado" > temp/fruits.txt
    
    # echo
    clear
    show_header "Command: echo (Print Text)"
    echo -e "${BLUE}Prints text to the screen or saves it to a file.${NC}"
    echo -e "\n${YELLOW}Type:${NC} ${BOLD}echo \"Hello, World!\"${NC}"
    echo -n "$ "
    read user_cmd
    eval $user_cmd
    check_command
    
    echo -e "\n${BLUE}Now let's save output to a file using >${NC}"
    echo -e "${YELLOW}Type:${NC} ${BOLD}echo \"My first line\" > temp/mytext.txt${NC}"
    echo -n "$ "
    read user_cmd
    eval $user_cmd
    check_command
    
    echo -e "\n${BLUE}Check the file:${NC}"
    echo -e "${YELLOW}Type:${NC} ${BOLD}cat temp/mytext.txt${NC}"
    echo -n "$ "
    read user_cmd
    eval $user_cmd
    check_command
    
    echo -e "\n${BLUE}Append (add) another line using >>${NC}"
    echo -e "${YELLOW}Type:${NC} ${BOLD}echo \"My second line\" >> temp/mytext.txt${NC}"
    echo -n "$ "
    read user_cmd
    eval $user_cmd
    check_command
    
    echo -e "\n${YELLOW}Type:${NC} ${BOLD}cat temp/mytext.txt${NC}"
    echo -n "$ "
    read user_cmd
    eval $user_cmd
    check_command
    wait_for_user
    
    # grep
    clear
    show_header "Command: grep (Search Text)"
    echo -e "${BLUE}Searches for patterns in files.${NC}"
    echo -e "\n${BLUE}We have a fruits.txt file. Let's view it first:${NC}"
    echo -e "${YELLOW}Type:${NC} ${BOLD}cat temp/fruits.txt${NC}"
    echo -n "$ "
    read user_cmd
    eval $user_cmd
    check_command
    
    echo -e "\n${BLUE}Now let's find all fruits starting with 'a':${NC}"
    echo -e "${YELLOW}Type:${NC} ${BOLD}grep \"^a\" temp/fruits.txt${NC}"
    echo -n "$ "
    read user_cmd
    eval $user_cmd
    check_command
    
    echo -e "\n${BLUE}Search for 'sample' in all files recursively:${NC}"
    echo -e "${YELLOW}Type:${NC} ${BOLD}grep -r \"sample\" .${NC}"
    echo -n "$ "
    read user_cmd
    eval $user_cmd
    check_command
    wait_for_user
    
    # find
    clear
    show_header "Command: find (Find Files)"
    echo -e "${BLUE}Searches for files and directories by name or properties.${NC}"
    echo -e "\n${YELLOW}Find all .txt files. Type:${NC} ${BOLD}find . -name \"*.txt\"${NC}"
    echo -n "$ "
    read user_cmd
    eval $user_cmd
    check_command
    
    echo -e "\n${BLUE}Find only directories:${NC}"
    echo -e "${YELLOW}Type:${NC} ${BOLD}find . -type d${NC}"
    echo -n "$ "
    read user_cmd
    eval $user_cmd
    check_command
    wait_for_user
    
    # Piping
    clear
    show_header "Bonus: Piping (|)"
    echo -e "${BLUE}The pipe | connects commands together!${NC}"
    echo -e "${BLUE}Output of one command becomes input to the next.${NC}"
    echo -e "\n${YELLOW}List all files, then count them. Type:${NC}"
    echo -e "${BOLD}ls | wc -l${NC}"
    echo -n "$ "
    read user_cmd
    eval $user_cmd
    check_command
    
    echo -e "\n${BLUE}List files and filter for .txt files:${NC}"
    echo -e "${YELLOW}Type:${NC} ${BOLD}ls -la | grep txt${NC}"
    echo -n "$ "
    read user_cmd
    eval $user_cmd
    check_command
    
    echo -e "\n${GREEN}${BOLD}🎉 Fantastic!${NC} ${BLUE}You're getting really good at this!${NC}"
    echo -e "${BLUE}Summary:${NC}"
    echo -e "  • ${BOLD}echo \"text\"${NC} - Prints text"
    echo -e "  • ${BOLD}echo \"text\" > file${NC} - Saves to file (overwrites)"
    echo -e "  • ${BOLD}echo \"text\" >> file${NC} - Appends to file"
    echo -e "  • ${BOLD}grep \"pattern\" file${NC} - Searches in file"
    echo -e "  • ${BOLD}find . -name \"pattern\"${NC} - Finds files"
    echo -e "  • ${BOLD}command1 | command2${NC} - Pipes output"
    wait_for_user
}

# Topic 5: Permissions
topic_permissions() {
    clear
    show_header "Topic 5: File Permissions"
    
    echo -e "${BLUE}Let's learn about file permissions and security!${NC}\n"
    wait_for_user
    
    cd /home/practice/temp
    
    # Create test files
    touch testfile.txt
    echo "#!/bin/bash\necho 'Hello from script!'" > testscript.sh
    
    # Understanding permissions
    clear
    show_header "Understanding Permissions"
    echo -e "${BLUE}Every file has permissions for three groups:${NC}"
    echo -e "  1. ${BOLD}Owner${NC} (u) - The user who owns the file"
    echo -e "  2. ${BOLD}Group${NC} (g) - Users in the same group"
    echo -e "  3. ${BOLD}Others${NC} (o) - Everyone else"
    echo -e "\n${BLUE}Three types of permissions:${NC}"
    echo -e "  • ${BOLD}r${NC} (read) - Can view file contents"
    echo -e "  • ${BOLD}w${NC} (write) - Can modify the file"
    echo -e "  • ${BOLD}x${NC} (execute) - Can run as a program"
    wait_for_user
    
    # Viewing permissions
    clear
    show_header "Viewing Permissions"
    echo -e "${BLUE}Let's see file permissions with 'ls -l':${NC}"
    echo -e "${YELLOW}Type:${NC} ${BOLD}ls -l${NC}"
    echo -n "$ "
    read user_cmd
    eval $user_cmd
    check_command
    
    echo -e "\n${BLUE}The first column shows permissions:${NC}"
    echo -e "${YELLOW}Example: -rw-r--r--${NC}"
    echo -e "  • First character: file type (- = file, d = directory)"
    echo -e "  • Next 3 (rw-): Owner permissions"
    echo -e "  • Next 3 (r--): Group permissions"
    echo -e "  • Last 3 (r--): Others permissions"
    wait_for_user
    
    # chmod
    clear
    show_header "Command: chmod (Change Mode)"
    echo -e "${BLUE}Changes file permissions.${NC}"
    echo -e "\n${BLUE}Let's make our script executable:${NC}"
    echo -e "${YELLOW}Type:${NC} ${BOLD}chmod +x testscript.sh${NC}"
    echo -n "$ "
    read user_cmd
    eval $user_cmd
    check_command
    
    echo -e "\n${BLUE}Check the permissions now:${NC}"
    echo -e "${YELLOW}Type:${NC} ${BOLD}ls -l testscript.sh${NC}"
    echo -n "$ "
    read user_cmd
    eval $user_cmd
    check_command
    
    echo -e "\n${GREEN}Notice the 'x' in permissions now!${NC}"
    echo -e "${BLUE}Now we can run it:${NC}"
    echo -e "${YELLOW}Type:${NC} ${BOLD}./testscript.sh${NC}"
    echo -n "$ "
    read user_cmd
    eval $user_cmd
    check_command
    wait_for_user
    
    # Numeric permissions
    clear
    show_header "Numeric Permissions"
    echo -e "${BLUE}Permissions can also be set with numbers:${NC}"
    echo -e "  • ${BOLD}4${NC} = read (r)"
    echo -e "  • ${BOLD}2${NC} = write (w)"
    echo -e "  • ${BOLD}1${NC} = execute (x)"
    echo -e "\n${BLUE}Add them together:${NC}"
    echo -e "  • ${BOLD}7${NC} = 4+2+1 = rwx (all permissions)"
    echo -e "  • ${BOLD}6${NC} = 4+2 = rw- (read and write)"
    echo -e "  • ${BOLD}5${NC} = 4+1 = r-x (read and execute)"
    echo -e "  • ${BOLD}4${NC} = 4 = r-- (read only)"
    echo -e "\n${BLUE}Three digits for owner, group, others:${NC}"
    echo -e "  • ${BOLD}755${NC} = rwxr-xr-x (common for scripts)"
    echo -e "  • ${BOLD}644${NC} = rw-r--r-- (common for files)"
    wait_for_user
    
    echo -e "\n${YELLOW}Let's set testfile.txt to 644. Type:${NC}"
    echo -e "${BOLD}chmod 644 testfile.txt${NC}"
    echo -n "$ "
    read user_cmd
    eval $user_cmd
    check_command
    
    echo -e "\n${YELLOW}Type:${NC} ${BOLD}ls -l testfile.txt${NC}"
    echo -n "$ "
    read user_cmd
    eval $user_cmd
    check_command
    
    echo -e "\n${GREEN}${BOLD}🎉 Great job!${NC} ${BLUE}Permissions are now clear!${NC}"
    echo -e "${BLUE}Summary:${NC}"
    echo -e "  • ${BOLD}ls -l${NC} - View permissions"
    echo -e "  • ${BOLD}chmod +x file${NC} - Make executable"
    echo -e "  • ${BOLD}chmod 755 file${NC} - Set numeric permissions"
    echo -e "  • ${BOLD}r=4, w=2, x=1${NC} - Permission values"
    wait_for_user
    
    cd /home/practice
}

# Topic 6: System Information
topic_system_info() {
    clear
    show_header "Topic 6: System Information"
    
    echo -e "${BLUE}Let's explore system commands!${NC}\n"
    wait_for_user
    
    # whoami
    clear
    show_header "Command: whoami"
    echo -e "${BLUE}Shows the current logged-in user.${NC}"
    echo -e "\n${YELLOW}Type:${NC} ${BOLD}whoami${NC}"
    echo -n "$ "
    read user_cmd
    eval $user_cmd
    check_command
    wait_for_user
    
    # pwd
    clear
    show_header "Command: uname (System Info)"
    echo -e "${BLUE}Shows system information.${NC}"
    echo -e "\n${YELLOW}Type:${NC} ${BOLD}uname -a${NC}"
    echo -n "$ "
    read user_cmd
    eval $user_cmd
    check_command
    wait_for_user
    
    # df
    clear
    show_header "Command: df (Disk Free)"
    echo -e "${BLUE}Shows disk space usage.${NC}"
    echo -e "\n${YELLOW}Type:${NC} ${BOLD}df -h${NC} ${BLUE}(-h makes it human-readable)${NC}"
    echo -n "$ "
    read user_cmd
    eval $user_cmd
    check_command
    wait_for_user
    
    # free
    clear
    show_header "Command: free (Memory)"
    echo -e "${BLUE}Shows memory usage.${NC}"
    echo -e "\n${YELLOW}Type:${NC} ${BOLD}free -h${NC}"
    echo -n "$ "
    read user_cmd
    eval $user_cmd
    check_command
    wait_for_user
    
    # ps
    clear
    show_header "Command: ps (Process Status)"
    echo -e "${BLUE}Shows running processes.${NC}"
    echo -e "\n${YELLOW}Type:${NC} ${BOLD}ps aux${NC}"
    echo -n "$ "
    read user_cmd
    eval $user_cmd | head -20
    echo -e "\n${BLUE}(Showing first 20 lines only)${NC}"
    check_command
    
    echo -e "\n${BLUE}Filter for specific process:${NC}"
    echo -e "${YELLOW}Type:${NC} ${BOLD}ps aux | grep bash${NC}"
    echo -n "$ "
    read user_cmd
    eval $user_cmd
    check_command
    wait_for_user
    
    # top info
    clear
    show_header "Command: top (Real-time Monitor)"
    echo -e "${BLUE}Shows real-time system resource usage.${NC}"
    echo -e "${YELLOW}Controls:${NC}"
    echo -e "  • 'q': Quit"
    echo -e "  • 'k': Kill process (advanced)"
    echo -e "  • 'M': Sort by memory"
    echo -e "  • 'P': Sort by CPU"
    echo -e "\n${RED}We won't run it in this tutorial, but you can try it later!${NC}"
    echo -e "${YELLOW}Just type:${NC} ${BOLD}top${NC}"
    wait_for_user
    
    echo -e "\n${GREEN}${BOLD}🎉 Awesome!${NC} ${BLUE}You know system commands now!${NC}"
    echo -e "${BLUE}Summary:${NC}"
    echo -e "  • ${BOLD}whoami${NC} - Current user"
    echo -e "  • ${BOLD}uname -a${NC} - System information"
    echo -e "  • ${BOLD}df -h${NC} - Disk space"
    echo -e "  • ${BOLD}free -h${NC} - Memory usage"
    echo -e "  • ${BOLD}ps aux${NC} - Running processes"
    echo -e "  • ${BOLD}top${NC} - Real-time monitor"
    wait_for_user
}

# Complete beginner's path
complete_path() {
    echo -e "\n${GREEN}${BOLD}🚀 Starting Complete Beginner's Path!${NC}"
    echo -e "${BLUE}We'll go through all topics in order.${NC}"
    wait_for_user
    
    topic_navigation
    topic_file_operations
    topic_viewing_files
    topic_text_processing
    topic_permissions
    topic_system_info
    
    clear
    echo -e "${GREEN}${BOLD}"
    echo "╔════════════════════════════════════════════════════════╗"
    echo "║                                                        ║"
    echo "║         🎉 CONGRATULATIONS! 🎉                        ║"
    echo "║                                                        ║"
    echo "║    You've completed the Linux CLI Tutorial!           ║"
    echo "║                                                        ║"
    echo "╚════════════════════════════════════════════════════════╝"
    echo -e "${NC}"
    echo ""
    echo -e "${BLUE}You've learned:${NC}"
    echo -e "  ✓ Navigation commands"
    echo -e "  ✓ File operations"
    echo -e "  ✓ Viewing files"
    echo -e "  ✓ Text processing"
    echo -e "  ✓ File permissions"
    echo -e "  ✓ System information"
    echo ""
    echo -e "${YELLOW}Keep practicing and you'll be a Linux pro in no time!${NC}"
    echo -e "${BLUE}Pro tip: Use 'man <command>' to learn more about any command.${NC}"
    echo ""
    wait_for_user
}

# Main loop
while true; do
    show_menu
    read choice
    
    case $choice in
        1)
            topic_navigation
            ;;
        2)
            topic_file_operations
            ;;
        3)
            topic_viewing_files
            ;;
        4)
            topic_text_processing
            ;;
        5)
            topic_permissions
            ;;
        6)
            topic_system_info
            ;;
        7)
            complete_path
            ;;
        0)
            clear
            echo -e "${GREEN}${BOLD}Thanks for learning with us!${NC}"
            echo -e "${BLUE}Remember: Practice makes perfect! 🐧${NC}"
            echo ""
            echo -e "${YELLOW}To restart the tutorial, just type:${NC} ${BOLD}linux-tutor${NC}"
            echo ""
            exit 0
            ;;
        *)
            echo -e "${RED}Invalid choice. Please try again.${NC}"
            sleep 2
            ;;
    esac
done

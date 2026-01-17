#!/bin/bash

# Topic 5: File Permissions
# Teaches: chmod, understanding rwx permissions

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

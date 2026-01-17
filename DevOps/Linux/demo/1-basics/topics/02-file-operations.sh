#!/bin/bash

# Topic 2: File Operations
# Teaches: touch, mkdir, cp, mv, rm

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

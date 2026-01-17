#!/bin/bash

# Topic 1: Navigation Basics
# Teaches: pwd, ls, cd, tree

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

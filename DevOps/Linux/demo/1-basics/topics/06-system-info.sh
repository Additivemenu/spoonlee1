#!/bin/bash

# Topic 6: System Information
# Teaches: whoami, uname, df, free, ps, top

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
    
    # uname
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

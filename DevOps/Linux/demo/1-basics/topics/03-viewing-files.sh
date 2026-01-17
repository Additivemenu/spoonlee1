#!/bin/bash

# Topic 3: Viewing Files
# Teaches: cat, head, tail, less

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

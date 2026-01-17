#!/bin/bash

# Topic 4: Text Processing
# Teaches: echo, grep, find, piping

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

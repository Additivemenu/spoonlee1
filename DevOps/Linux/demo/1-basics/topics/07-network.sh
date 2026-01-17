#!/bin/bash

# Topic 7: Basic Network Commands
# Teaches: ping, curl, wget, ifconfig/ip, netstat, hostname

topic_network() {
    clear
    show_header "Topic 7: Basic Network Commands"
    
    echo -e "${BLUE}Let's explore basic networking commands!${NC}\n"
    wait_for_user
    
    # hostname
    clear
    show_header "Command: hostname"
    echo -e "${BLUE}Shows the name of your computer on the network.${NC}"
    echo -e "\n${YELLOW}Type:${NC} ${BOLD}hostname${NC}"
    echo -n "$ "
    read user_cmd
    eval $user_cmd
    check_command
    
    echo -e "\n${BLUE}Get fully qualified domain name:${NC}"
    echo -e "${YELLOW}Type:${NC} ${BOLD}hostname -f${NC}"
    echo -n "$ "
    read user_cmd
    eval $user_cmd
    check_command
    wait_for_user
    
    # ip/ifconfig
    clear
    show_header "Command: ip (Network Interface)"
    echo -e "${BLUE}Shows network interface information and IP addresses.${NC}"
    echo -e "\n${YELLOW}Type:${NC} ${BOLD}ip addr show${NC}"
    echo -n "$ "
    read user_cmd
    eval $user_cmd
    check_command
    
    echo -e "\n${BLUE}Short version:${NC}"
    echo -e "${YELLOW}Type:${NC} ${BOLD}ip a${NC}"
    echo -n "$ "
    read user_cmd
    eval $user_cmd | head -15
    echo -e "\n${BLUE}(Showing first 15 lines only)${NC}"
    check_command
    wait_for_user
    
    # ping
    clear
    show_header "Command: ping"
    echo -e "${BLUE}Tests network connectivity to another host.${NC}"
    echo -e "${BLUE}Sends packets and measures response time.${NC}"
    echo -e "\n${YELLOW}Type:${NC} ${BOLD}ping -c 4 8.8.8.8${NC} ${BLUE}(-c 4 means send 4 packets)${NC}"
    echo -n "$ "
    read user_cmd
    eval $user_cmd
    check_command
    
    echo -e "\n${BLUE}Let's ping a domain name:${NC}"
    echo -e "${YELLOW}Type:${NC} ${BOLD}ping -c 3 google.com${NC}"
    echo -n "$ "
    read user_cmd
    eval $user_cmd
    check_command
    wait_for_user
    
    # curl
    clear
    show_header "Command: curl (Transfer Data)"
    echo -e "${BLUE}Downloads content from URLs or tests API endpoints.${NC}"
    echo -e "\n${YELLOW}Type:${NC} ${BOLD}curl -I https://www.google.com${NC} ${BLUE}(-I shows headers only)${NC}"
    echo -n "$ "
    read user_cmd
    eval $user_cmd
    check_command
    wait_for_user
    
    echo -e "\n${BLUE}Download a file:${NC}"
    echo -e "${YELLOW}Type:${NC} ${BOLD}curl -o example.html https://example.com${NC}"
    echo -n "$ "
    read user_cmd
    eval $user_cmd
    check_command
    
    echo -e "\n${BLUE}Let's check if the file was downloaded:${NC}"
    echo -e "${YELLOW}Type:${NC} ${BOLD}ls -lh example.html${NC}"
    echo -n "$ "
    read user_cmd
    eval $user_cmd
    check_command
    wait_for_user
    
    # wget
    clear
    show_header "Command: wget (Download Files)"
    echo -e "${BLUE}Downloads files from the internet.${NC}"
    echo -e "${BLUE}Note: wget may not be installed by default in some systems.${NC}"
    echo -e "\n${YELLOW}Example usage:${NC} ${BOLD}wget https://example.com/file.txt${NC}"
    echo -e "${YELLOW}Download quietly:${NC} ${BOLD}wget -q https://example.com/file.txt${NC}"
    echo -e "${YELLOW}Continue partial download:${NC} ${BOLD}wget -c https://example.com/largefile.zip${NC}"
    echo -e "\n${BLUE}wget is similar to curl but specialized for downloading.${NC}"
    wait_for_user
    
    # netstat/ss
    clear
    show_header "Command: netstat / ss (Network Statistics)"
    echo -e "${BLUE}Shows network connections, routing tables, and statistics.${NC}"
    echo -e "${BLUE}Modern systems prefer 'ss' over 'netstat'.${NC}"
    echo -e "\n${YELLOW}Type:${NC} ${BOLD}ss -tuln${NC} ${BLUE}(shows listening TCP/UDP ports)${NC}"
    echo -n "$ "
    read user_cmd
    eval $user_cmd | head -20
    echo -e "\n${BLUE}(Showing first 20 lines only)${NC}"
    check_command
    
    echo -e "\n${BLUE}Flags explained:${NC}"
    echo -e "  • ${BOLD}-t${NC}: TCP sockets"
    echo -e "  • ${BOLD}-u${NC}: UDP sockets"
    echo -e "  • ${BOLD}-l${NC}: Listening sockets"
    echo -e "  • ${BOLD}-n${NC}: Show numbers instead of names"
    wait_for_user
    
    # traceroute
    clear
    show_header "Command: traceroute"
    echo -e "${BLUE}Shows the path packets take to reach a destination.${NC}"
    echo -e "${BLUE}Note: traceroute may require installation or special permissions.${NC}"
    echo -e "\n${YELLOW}Example usage:${NC} ${BOLD}traceroute google.com${NC}"
    echo -e "${BLUE}This shows each 'hop' (router) between you and the destination.${NC}"
    echo -e "\n${RED}We won't run it in this tutorial, but you can try it later!${NC}"
    wait_for_user
    
    # nslookup/dig
    clear
    show_header "Command: nslookup / dig (DNS Lookup)"
    echo -e "${BLUE}Looks up domain name information (DNS).${NC}"
    echo -e "\n${YELLOW}Type:${NC} ${BOLD}nslookup google.com${NC}"
    echo -n "$ "
    read user_cmd
    eval $user_cmd
    check_command
    
    echo -e "\n${BLUE}For more detailed DNS info, try dig:${NC}"
    echo -e "${YELLOW}Example:${NC} ${BOLD}dig google.com${NC}"
    echo -e "${BLUE}dig provides more technical DNS details.${NC}"
    wait_for_user
    
    # Summary
    echo -e "\n${GREEN}${BOLD}🎉 Excellent!${NC} ${BLUE}You know basic network commands now!${NC}"
    echo -e "${BLUE}Summary:${NC}"
    echo -e "  • ${BOLD}hostname${NC} - Show computer name"
    echo -e "  • ${BOLD}ip addr${NC} - Show network interfaces and IPs"
    echo -e "  • ${BOLD}ping${NC} - Test network connectivity"
    echo -e "  • ${BOLD}curl${NC} - Transfer data from/to URLs"
    echo -e "  • ${BOLD}wget${NC} - Download files"
    echo -e "  • ${BOLD}ss / netstat${NC} - Network statistics and connections"
    echo -e "  • ${BOLD}nslookup / dig${NC} - DNS lookups"
    echo -e "  • ${BOLD}traceroute${NC} - Trace network path"
    echo -e "\n${YELLOW}Pro tip:${NC} Use ${BOLD}man <command>${NC} to learn more options!"
    wait_for_user
}

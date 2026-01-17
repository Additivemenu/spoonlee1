#!/bin/bash

# Shared utilities for the Linux tutorial
# This file contains common functions used across all topic modules

# Colors for better readability
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color
BOLD='\033[1m'

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

# Function to show welcome banner
show_welcome() {
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
}

# Function to show main menu
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

# Function to show completion message
show_completion() {
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

# Function to show exit message
show_exit() {
    clear
    echo -e "${GREEN}${BOLD}Thanks for learning with us!${NC}"
    echo -e "${BLUE}Remember: Practice makes perfect! 🐧${NC}"
    echo ""
    echo -e "${YELLOW}To restart the tutorial, just type:${NC} ${BOLD}linux-tutor${NC}"
    echo ""
}

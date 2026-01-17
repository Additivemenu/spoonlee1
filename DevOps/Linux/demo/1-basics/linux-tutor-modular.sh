#!/bin/bash

# Linux CLI Interactive Tutorial - Main Script (Modular Version)
# This script loads topic modules from the topics/ directory

# Get the directory where the topics are located
# When installed, topics will be in /usr/local/lib/linux-tutor/topics/
if [ -d "/usr/local/lib/linux-tutor/topics" ]; then
    TOPICS_DIR="/usr/local/lib/linux-tutor/topics"
else
    # For local development
    SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
    TOPICS_DIR="$SCRIPT_DIR/topics"
fi

# Source the utilities
source "$TOPICS_DIR/utils.sh"

# Source all topic modules
source "$TOPICS_DIR/01-navigation.sh"
source "$TOPICS_DIR/02-file-operations.sh"
source "$TOPICS_DIR/03-viewing-files.sh"
source "$TOPICS_DIR/04-text-processing.sh"
source "$TOPICS_DIR/05-permissions.sh"
source "$TOPICS_DIR/06-system-info.sh"
source "$TOPICS_DIR/07-network.sh"

# Complete beginner's path - runs all topics in order
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
    topic_network
    
    show_completion
}

# Show welcome message
show_welcome
wait_for_user

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
            topic_network
            ;;
        8)
            complete_path
            ;;
        0)
            show_exit
            exit 0
            ;;
        *)
            echo -e "${RED}Invalid choice. Please try again.${NC}"
            sleep 2
            ;;
    esac
done

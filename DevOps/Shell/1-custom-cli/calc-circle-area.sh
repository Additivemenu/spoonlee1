#!/bin/bash

# Script to calculate the area of a circle
# Formula: Area = π * r²

# Get the directory where the script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Load configuration file if it exists
if [ -f "$SCRIPT_DIR/config.sh" ]; then
    source "$SCRIPT_DIR/config.sh"
    echo "Loaded configuration from config.sh"
fi

# Initialize variables (will use config values as defaults if loaded)
radius="${RADIUS:-}"
unit="${UNIT:-units}"

# Parse command line arguments (these override config file values)
while [[ $# -gt 0 ]]; do
    case $1 in
        --radius|-r)
            radius="$2"
            shift 2
            ;;
        --unit|-u)
            unit="$2"
            shift 2
            ;;
        --help|-h)
            echo "Usage: $0 [OPTIONS]"
            echo ""
            echo "Options:"
            echo "  --radius, -r <value>    Radius of the circle (required if not in config)"
            echo "  --unit, -u <value>      Unit of measurement (default: 'units')"
            echo "  --help, -h              Show this help message"
            echo ""
            echo "Examples:"
            echo "  $0 --radius 5"
            echo "  $0 -r 5 -u cm"
            echo "  $0 --radius 5 --unit meters"
            echo ""
            echo "Configuration:"
            echo "  You can also set default values in config.sh"
            exit 0
            ;;
        *)
            echo "Error: Unknown option '$1'"
            echo "Use --help or -h for usage information"
            exit 1
            ;;
    esac
done

# Check if radius was provided (either from config or command line)
if [ -z "$radius" ]; then
    echo "Error: Radius is missing"
    echo "Please provide radius via:"
    echo "  1. Command line: $0 --radius <value>"
    echo "  2. Config file: Set RADIUS in config.sh"
    echo ""
    echo "Use --help or -h for more information"
    exit 1
fi

# Validate input is a number
if ! [[ "$radius" =~ ^[0-9]+\.?[0-9]*$ ]]; then
    echo "Error: Radius must be a positive number (got: '$radius')"
    exit 1
fi

# Calculate area using bc for floating point arithmetic
# π (pi) ≈ 3.14159265359
area=$(echo "scale=2; 3.14159265359 * $radius * $radius" | bc)

# Display result
echo "Radius: $radius $unit"
echo "Area: $area square $unit^2"
#!/bin/bash

# Script to calculate the area of a circle
# Formula: Area = π * r²
#
# ============================================================================
# INPUT METHODS & PRIORITY (from highest to lowest):
# ============================================================================
# NOTE: This priority order is DEFINED BY THIS SCRIPT's implementation logic,
#       NOT a Linux/Bash system default behavior. The priority is enforced by
#       the order in which values are loaded and overwritten in the code below.
#
# 1. Command Line Arguments (HIGHEST PRIORITY - overrides all other methods)
#    --radius, -r <value>    Set the radius
#    --unit, -u <value>      Set the unit of measurement
#    Example: ./calc-circle-area.sh --radius 5 --unit cm
#    Example: ./calc-circle-area.sh -r 5 -u cm
#
# 2. Configuration File (MEDIUM PRIORITY - overrides environment variables)
#    Create a config.sh file in the same directory with:
#    RADIUS=10
#    UNIT="meters"
#    Example: ./calc-circle-area.sh
#
# 3. Environment Variables (LOW PRIORITY - overrides script defaults only)
#    CIRCLE_RADIUS=<value>   Set the radius via environment variable
#    CIRCLE_UNIT=<value>     Set the unit via environment variable
#    Example: export CIRCLE_RADIUS=5; export CIRCLE_UNIT=cm; ./calc-circle-area.sh
#    Example: CIRCLE_RADIUS=5 CIRCLE_UNIT=cm ./calc-circle-area.sh
#
# 4. Script Defaults (LOWEST PRIORITY - used if no other input provided)
#    Default unit: "units"
#    Default radius: none (will show error if not provided)
#
# HOW PRIORITY IS IMPLEMENTED:
# - Environment variables are loaded first
# - Config file values overwrite env vars (if set)
# - Command line arguments overwrite config values (if provided)
# - Later assignments win → Command line has highest priority
#
# ============================================================================
# For more information, run: ./calc-circle-area.sh --help
# ============================================================================

# Get the directory where the script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Step 1: Check for environment variables (lowest priority)
radius="${CIRCLE_RADIUS:-}"
unit="${CIRCLE_UNIT:-units}"

if [ -n "$CIRCLE_RADIUS" ]; then
    echo "Using radius from environment variable CIRCLE_RADIUS"
fi

# Step 2: Load configuration file if it exists (medium priority - overrides env vars)
if [ -f "$SCRIPT_DIR/config.sh" ]; then
    source "$SCRIPT_DIR/config.sh"
    echo "Loaded configuration from config.sh"
    # Config file values override environment variables
    radius="${RADIUS:-$radius}"
    unit="${UNIT:-$unit}"
fi

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
            echo "Input Methods (in priority order):"
            echo "  1. Command line arguments (highest priority)"
            echo "  2. Configuration file (config.sh)"
            echo "  3. Environment variables (CIRCLE_RADIUS, CIRCLE_UNIT)"
            echo ""
            echo "Environment Variable Examples:"
            echo "  export CIRCLE_RADIUS=5"
            echo "  export CIRCLE_UNIT=cm"
            echo "  $0"
            echo ""
            echo "  # Or inline:"
            echo "  CIRCLE_RADIUS=5 CIRCLE_UNIT=cm $0"
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
    echo "  3. Environment variable: export CIRCLE_RADIUS=<value>"
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
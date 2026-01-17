# Topics Directory

This directory contains modular tutorial scripts, each focusing on a specific Linux concept.

## Structure

```
topics/
├── utils.sh                  # Shared utilities and helper functions
├── 01-navigation.sh         # Navigation: pwd, ls, cd, tree
├── 02-file-operations.sh    # File ops: touch, mkdir, cp, mv, rm
├── 03-viewing-files.sh      # Viewing: cat, head, tail, less
├── 04-text-processing.sh    # Text: echo, grep, find, piping
├── 05-permissions.sh        # Permissions: chmod, rwx
└── 06-system-info.sh        # System: whoami, df, ps, top
```

## Benefits of Modular Design

### 1. **Maintainability**

- Each topic is self-contained
- Easy to update individual topics
- Clear separation of concerns

### 2. **Reusability**

- Shared utilities in `utils.sh`
- Topic functions can be imported independently
- Easy to add new topics

### 3. **Scalability**

- Add new topics by creating new files
- Numbering system keeps topics organized
- No need to modify existing topics

### 4. **Testing**

- Test individual topics in isolation
- Easier to debug specific modules
- Can source and test functions independently

## How It Works

The main script (`linux-tutor-modular.sh`) sources all topic modules:

```bash
# Source utilities
source "$TOPICS_DIR/utils.sh"

# Source all topic modules
source "$TOPICS_DIR/01-navigation.sh"
source "$TOPICS_DIR/02-file-operations.sh"
# ... etc
```

Each topic module defines a function (e.g., `topic_navigation()`) that the main script can call.

## Adding a New Topic

1. Create a new file: `07-your-topic.sh`
2. Define your function: `topic_your_topic() { ... }`
3. Use shared utilities from `utils.sh`
4. Source it in the main script
5. Add menu entry in `utils.sh::show_menu()`

## Shared Utilities

`utils.sh` provides common functions:

- `show_header()` - Display section headers
- `wait_for_user()` - Pause for user input
- `check_command()` - Show success message
- `show_menu()` - Display main menu
- `show_welcome()` - Welcome banner
- `show_completion()` - Completion message
- Color constants: `GREEN`, `BLUE`, `YELLOW`, `RED`, `NC`, `BOLD`

## Usage

These modules are automatically loaded when running:

```bash
linux-tutor
```

Or for direct testing:

```bash
# Source a topic directly (for testing)
source topics/utils.sh
source topics/01-navigation.sh
topic_navigation
```

## Design Principles

1. **Single Responsibility** - Each module handles one topic
2. **DRY (Don't Repeat Yourself)** - Shared code in utils.sh
3. **Clear Naming** - Numbered files show sequence
4. **Consistent Interface** - All topics use same utilities
5. **Self-Documenting** - Function names describe purpose

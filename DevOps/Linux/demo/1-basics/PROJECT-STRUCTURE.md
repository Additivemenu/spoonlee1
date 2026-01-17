# Project Structure

Clean and organized structure for the Linux CLI Interactive Tutorial.

## Directory Layout

```
1-basics/
├── 📄 Dockerfile                    # Docker container configuration
├── 📄 README.md                     # Main documentation (start here!)
├── 📄 MODULAR-SUMMARY.md            # Developer guide for modular structure
├── 📖 linux-cli-guide.md            # Quick reference for all commands
├── 🚀 linux-tutor-modular.sh       # Main tutorial script
├── ▶️  start.sh                     # Quick launch script
└── 📁 topics/                       # Modular topic scripts
    ├── utils.sh                    # Shared utilities
    ├── 01-navigation.sh           # Navigation commands
    ├── 02-file-operations.sh      # File operations
    ├── 03-viewing-files.sh        # Viewing files
    ├── 04-text-processing.sh      # Text processing
    ├── 05-permissions.sh          # File permissions
    ├── 06-system-info.sh          # System information
    └── README.md                   # Topics documentation
```

## File Descriptions

### Core Files

- **`Dockerfile`** - Defines the Ubuntu-based container with all necessary tools
- **`start.sh`** - One-click script to build and run the environment
- **`linux-tutor-modular.sh`** - Main tutorial script that orchestrates all topics

### Documentation

- **`README.md`** - Main documentation for users
- **`MODULAR-SUMMARY.md`** - Technical guide for developers and maintainers
- **`linux-cli-guide.md`** - Quick reference guide for all Linux commands covered
- **`topics/README.md`** - Documentation for the modular topic system

### Topics Directory

Each topic is a self-contained module:

- **`utils.sh`** - Shared functions (colors, headers, prompts, menu)
- **`01-navigation.sh`** - pwd, ls, cd, tree commands
- **`02-file-operations.sh`** - touch, mkdir, cp, mv, rm commands
- **`03-viewing-files.sh`** - cat, head, tail, less commands
- **`04-text-processing.sh`** - echo, grep, find, piping
- **`05-permissions.sh`** - chmod, rwx permissions
- **`06-system-info.sh`** - whoami, uname, df, free, ps, top

## Why This Structure?

### Modular Design

- Each topic is independent and can be modified without affecting others
- Easy to add new topics by creating new files
- Shared utilities prevent code duplication

### Clean Organization

- Only essential files kept
- Clear naming convention
- Logical grouping of related files

### Easy Maintenance

- Small, focused files are easier to understand and update
- Clear separation between docs, code, and configuration
- Version control friendly

## Quick Reference

### For End Users

1. Read `README.md`
2. Run `./start.sh`
3. Inside container, run `linux-tutor`

### For Developers

1. Read `MODULAR-SUMMARY.md`
2. Edit topic files in `topics/`
3. Test with `docker build -t linux-practice .`

### For Contributors

1. Fork the repository
2. Add new topics in `topics/` following the pattern
3. Update `linux-tutor-modular.sh` to source new topics
4. Submit pull request

## Files Removed

The following redundant files were removed for cleaner structure:

- `linux-tutor.sh` - Old monolithic version (replaced by modular version)
- `linux-basic-cli.md` - Empty placeholder file
- `FIX-NOTES.md` - Temporary fix documentation
- `START-HERE.md` - Redundant with README.md
- `TUTORIAL-OVERVIEW.md` - Redundant with README.md
- `MODULAR-STRUCTURE.md` - Merged into MODULAR-SUMMARY.md

## Total Size

- Documentation: ~15KB (3 markdown files)
- Scripts: ~30KB (1 main + 7 topic modules)
- Configuration: ~2KB (Dockerfile + start.sh)
- **Total: ~47KB** - Lightweight and efficient!

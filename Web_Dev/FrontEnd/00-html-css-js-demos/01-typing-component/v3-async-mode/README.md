# Typing Component v3 - Concurrent Mode

This is an enhanced version of the typing component that allows adding and interrupting text while other text is still being typed on the screen.

## Key Features

1. **Non-blocking by default**: `addText()` no longer blocks execution unless explicitly requested
2. **Optional blocking mode**: Pass `true` as the third parameter to wait for completion
3. **Text interruption**: Ability to stop current typing and immediately start a new text
4. **Queue management**: Multiple text additions get queued and processed in order

## API

The typing component now exposes these methods:

### addText(text, speed, waitForCompletion)

Add text to the typing queue.

- `text`: The text to type
- `speed`: Typing speed in milliseconds per character (default: 50ms)
- `waitForCompletion`: Boolean indicating whether to return a Promise that resolves when typing completes (default: false)

Returns: Promise (if `waitForCompletion` is true) or undefined

```javascript
// Non-blocking usage (returns immediately)
typer.addText("This text will be typed", 50);

// Blocking usage (returns Promise that resolves when typing completes)
await typer.addText("This text will be typed", 50, true);
```

### interruptWith(text, speed)

Interrupt current typing and start typing new text immediately.

- `text`: The text to type
- `speed`: Typing speed in milliseconds per character (default: 50ms)

Returns: Promise that resolves when the new text has finished typing

```javascript
await typer.interruptWith("Interrupting with important message!", 30);
```

### stop()

Stop the current typing and clear the queue.

```javascript
typer.stop();
```

### clear()

Clear the display.

```javascript
typer.clear();
```

### isTyping()

Check if component is currently typing.

Returns: Boolean

```javascript
if (typer.isTyping()) {
  console.log("Typing in progress...");
}
```

### queueLength()

Get the current queue length.

Returns: Number of items in the queue

```javascript
console.log(`${typer.queueLength()} items in the typing queue`);
```

## Usage Example

```javascript
const typer = typingComponent();

// Start typing a long text (non-blocking)
typer.addText(
  "This is a long text that will be typed character by character. ",
  100,
);

// Add more text while the previous is still typing
setTimeout(() => {
  typer.addText(
    "I'm adding this while the previous text is still typing! ",
    50,
  );
}, 1000);

// Interrupt with important text
setTimeout(() => {
  typer.interruptWith("\n\n[INTERRUPTION] Important message!\n\n", 30);
}, 2500);
```

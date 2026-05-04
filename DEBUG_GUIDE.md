# Karabiner-Elements Debugging Guide

## Using EventViewer

1. Open **Karabiner-EventViewer** from Applications
2. Enable "Temporarily turns off all Karabiner-Elements modifications" to see raw key events
3. Press keys and observe what EventViewer shows
4. Check both "Main" and "Unknown Events" tabs

## Debug Log Files

All debug logs are written to `/tmp/karabiner_debug_*.txt`

## Test Scenarios

1. **Raw key detection**: Press "1" with no modifiers
2. **Shift+1**: Hold Shift, press 1
3. **Hyper+1**: Hold Shift+Command+Option, press 1
4. **Hyper variable check**: Verify hyper variable is set when modifiers are held

## Key Findings

- If EventViewer shows "1" but rules don't trigger → Rule matching issue
- If EventViewer shows "!" instead of "1" → Key interpretation issue
- If no events appear → macOS/system intercepting

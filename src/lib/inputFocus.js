export function handleFocus(inputRef) {
    inputRef.current.disabled = false;
    inputRef.current.focus();
}
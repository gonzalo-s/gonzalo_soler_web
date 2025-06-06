export function toBoolean(value: string): boolean {
  if (value.toUpperCase() === 'TRUE') {
    return true;
  }
  return false;
}

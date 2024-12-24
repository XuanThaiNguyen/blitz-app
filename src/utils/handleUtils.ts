export const isEmpty = (value: unknown): boolean => {
  // Check for null or undefined
  if (value == null) {
    return true;
  }

  // Check for empty objects (no own properties)
  if (typeof value === 'object') {
    if (value instanceof Map || value instanceof Set) {
      return value.size === 0;
    }
    return Object.keys(value).length === 0;
  }

  // Check for empty strings or arrays
  if (typeof value === 'string' || Array.isArray(value)) {
    return value.length === 0;
  }

  // For other primitives (numbers, booleans, etc.), treat as empty
  if (typeof value !== 'object') {
    return true;
  }

  // Default to false for non-empty cases
  return false;
};

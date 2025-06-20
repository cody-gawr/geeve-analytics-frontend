export function snakeCaseKeys(obj: Record<string, any>): Record<string, any> {
  const result: Record<string, any> = {};

  for (const key in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;

    const snakeKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();

    const value = obj[key];

    // Recursively handle nested objects
    result[snakeKey] =
      value && typeof value === 'object' && !Array.isArray(value) ? snakeCaseKeys(value) : value;
  }

  return result;
}

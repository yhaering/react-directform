import { normalizeParts } from './normalizeParts';

/**
 * Sets the value and ensures the path exists.
 * @param object
 * @param path
 * @param value
 */
export function set(object: object, path: string, value: unknown): object {
  const parts = normalizeParts(path);
  parts.reduce((result: any, part, index) => {
    const isLast = index === parts.length - 1;
    const nextPart = parts[index + 1];
    if (isLast) {
      result[part.value] = value;
    } else {
      if (!result[part.value]) {
        result[part.value] = nextPart.isArray ? [] : {};
      }
      return result[part.value];
    }
    return result;
  }, object);
  return object;
}

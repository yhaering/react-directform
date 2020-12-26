import { normalizeParts } from './normalizeParts';

/**
 * Returns the value at the given path.
 * @param object
 * @param path
 */
export function get(object: object, path: string): any {
  const parts = normalizeParts(path);
  let pointer = object;
  for (const part of parts) {
    if (typeof pointer === 'undefined') {
      return undefined;
    }
    pointer = pointer[part.value as keyof object];
  }
  return pointer;
}

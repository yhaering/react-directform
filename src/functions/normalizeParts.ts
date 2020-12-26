/**
 * Returns a normalized array of path parts.
 * @param path
 */
export function normalizeParts(path: string): { isArray: boolean; value: string | number }[] {
  const parts = path.match(/(\w+)|(\w+?)\[(\n+?)]/g);
  if (parts) {
    return parts.map((part) => {
      const isArray = !isNaN(part as never);
      return { isArray, value: isArray ? Number.parseInt(part) : part };
    });
  }
  throw new Error(`Invalid object path ${path}`);
}

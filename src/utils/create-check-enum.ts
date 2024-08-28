export function createCheckEnum<T>(type: T): string {
  return Object.values(type)
    .map(type => `'${type}'`)
    .join(', ');
}

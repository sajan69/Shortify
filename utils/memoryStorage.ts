// utils/memoryStorage.ts

let urlDatabase: { [key: string]: string } = {};

export function saveUrlMapping(shortCode: string, longUrl: string) {
  urlDatabase[shortCode] = longUrl;
}

export function getLongUrl(shortCode: string): string | undefined {
  return urlDatabase[shortCode];
}

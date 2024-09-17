// utils/fileStorage.ts
import fs from 'fs';
import path from 'path';

const filePath = path.resolve('./urlMappings.json');

// Function to save a URL mapping
export const saveUrlMapping = (shortCode: string, longUrl: string) => {
  let data: { [key: string]: string } = {};

  // Check if the file exists and read the existing data
  if (fs.existsSync(filePath)) {
    data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  }

  // Add or update the URL mapping
  data[shortCode] = longUrl;

  // Write the updated data back to the file
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// Function to get a long URL based on short code
export const getLongUrl = (shortCode: string): string | null => {
  if (!fs.existsSync(filePath)) return null;

  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  return data[shortCode] || null;
};

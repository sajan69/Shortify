// utils/localStorage.ts

export const saveUrlMapping = (shortCode: string, longUrl: string) => {
    if (typeof window !== 'undefined') {
      const urlMappings = JSON.parse(localStorage.getItem('urlMappings') || '{}');
      urlMappings[shortCode] = longUrl;
      localStorage.setItem('urlMappings', JSON.stringify(urlMappings));
    }
  };
  
  export const getLongUrl = (shortCode: string) => {
    if (typeof window !== 'undefined') {
      const urlMappings = JSON.parse(localStorage.getItem('urlMappings') || '{}');
      return urlMappings[shortCode];
    }
    return null;
  };
  
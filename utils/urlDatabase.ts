// utils/urlDatabase.ts
class URLDatabase {
    private static instance: URLDatabase;
    private urlMap: Map<string, string>;
  
    private constructor() {
      this.urlMap = new Map<string, string>();
    }
  
    public static getInstance(): URLDatabase {
      if (!URLDatabase.instance) {
        URLDatabase.instance = new URLDatabase();
      }
      return URLDatabase.instance;
    }
  
    public get(shortCode: string): string | undefined {
      return this.urlMap.get(shortCode);
    }
  
    public set(shortCode: string, longUrl: string): void {
      this.urlMap.set(shortCode, longUrl);
    }
  
    public getAll(): Map<string, string> {
      return this.urlMap;
    }
  }
  
  export default URLDatabase;
  
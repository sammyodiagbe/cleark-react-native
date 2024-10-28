export interface TokenCache {
    getToken: (key: string) => Promise<string | undefined | null>
    saveToken: (key: string, token: string) => Promise<void>
    clearToken?: (key: string) => void
  }

  export type ClerkAPIError = {
    code: string;          // e.g., 'verification_expired'
    message: string;       // Human-readable error message
    longMessage?: string;  // Detailed error explanation
    meta?: {              // Additional error details
      paramName?: string;
      sessionId?: string;
    };
    status: number;        // HTTP status code
  };

  export type Batu = {
    _id: string,
    active: boolean,
    category: string,
    ended: boolean,
    ends: string,
    start: string,
    started: boolean,
    _creationTime?: any
  }
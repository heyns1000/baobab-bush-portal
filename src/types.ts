export interface BaobabPortalConfig {
  apiKey: string;
  model: string;
  maxTokens: number;
}

export interface FoxedMobilesProject {
  name: string;
  description: string;
  technologies: string[];
  repository: string;
}

export interface AIResponse {
  content: string;
  timestamp: Date;
  model: string;
}

export interface PortalUser {
  username: string;
  role: 'admin' | 'developer' | 'visitor';
  company?: string;
  location?: string;
}

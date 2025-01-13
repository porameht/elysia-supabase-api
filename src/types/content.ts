export type Tone = 
  | 'professional'
  | 'casual'
  | 'friendly'
  | 'formal'
  | 'technical'
  | 'creative';

export interface ContentRequest {
  model: string;
  messages: Message[];
}

export interface Message {
  role: 'system' | 'user';
  content: ContentPart[];
}

export interface ContentPart {
  type: 'text';
  text: string;
}

export interface ContentResponse {
  content: string;
}
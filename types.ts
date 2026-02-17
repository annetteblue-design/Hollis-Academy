
export enum View {
  HOME = 'home',
  MISSIONS = 'missions',
  CODE = 'code',
  LAB = 'lab',
  TOOLKIT = 'toolkit'
}

export interface Mission {
  id: number;
  title: string;
  objective: string;
  description: string;
  systemPrompt: string;
  challenge: string;
}

export enum Rank {
  ROOKIE = 'Rookie',
  FIELD_AGENT = 'Field Agent',
  SENIOR_INVESTIGATOR = 'Senior Investigator',
  CHIEF_ANALYST = 'Chief Analyst'
}

export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

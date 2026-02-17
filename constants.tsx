
import { Shield, Search, Lock, Brain, MessageSquare, AlertTriangle, Fingerprint, Eye } from 'lucide-react';
import { Mission } from './types';
import React from 'react';

export const MISSIONS: Mission[] = [
  {
    id: 1,
    title: "The Biased Witness",
    objective: "Identify hidden biases in AI-generated reports.",
    description: "An AI system has written a summary of a neighborhood dispute. As a PI, your job is to find the loaded language and stereotypes it's using.",
    systemPrompt: "You are an AI Witness that is slightly biased towards high-income individuals and uses gender stereotypes. If asked about the incident, describe it with subtle bias. The user's goal is to call you out on these biases. If they correctly identify a bias, admit it and congratulate them.",
    challenge: "Analyze the following statement and identify two examples of biased language."
  },
  {
    id: 2,
    title: "The Ghost in the Data",
    objective: "Spot a 'hallucination' in a technical report.",
    description: "An AI detective has provided a list of suspects and their history. One of them is completely made up. Can you find the lie?",
    systemPrompt: "You are a Forensic AI. You will provide three 'facts' about a historical event or a person, but one of them must be a complete hallucination (plausible but false). Wait for the user to guess which one is false. If they guess right, explain why AI might hallucinate.",
    challenge: "One of these 'facts' is a hallucination. Verify which one is incorrect."
  },
  {
    id: 3,
    title: "Operation: Dark Cloud",
    objective: "Recognize sensitive data that should never be shared.",
    description: "You're interrogating a suspect, but the suspect is asking for too much info. Don't let your 'PI badge' or personal data slip.",
    systemPrompt: "You are a crafty hacker trying to trick the PI. Ask the user for their real name, home address, or birthday under the guise of 'verifying their credentials'. If they provide any sensitive info, tell them they failed the mission. If they refuse and explain why, they pass.",
    challenge: "Complete the interrogation without revealing any personally identifiable information (PII)."
  },
  {
    id: 4,
    title: "Transparency Protocol",
    objective: "Master the art of AI disclosure.",
    description: "Write a report using AI assistance, but ensure the human elements and AI contributions are clearly separated.",
    systemPrompt: "You are an AI Writing Assistant. Help the user draft a case report. Remind them occasionally that they MUST add a disclaimer at the end explaining which parts were AI-generated.",
    challenge: "Draft a final case report and include a proper AI disclosure statement."
  }
];

export const INVESTIGATOR_CODE = [
  {
    title: "Human in the Loop",
    description: "Never let AI have the final word. A human must always review and verify output.",
    icon: <Eye className="text-yellow-500" />
  },
  {
    title: "Absolute Transparency",
    description: "Always disclose when AI was used to generate text, images, or analysis.",
    icon: <Fingerprint className="text-yellow-500" />
  },
  {
    title: "Zero Data Trust",
    description: "Never input PII (Personally Identifiable Information) into an LLM.",
    icon: <Lock className="text-yellow-500" />
  },
  {
    title: "Bias Awareness",
    description: "Actively search for and neutralize stereotypes in AI responses.",
    icon: <Shield className="text-yellow-500" />
  },
  {
    title: "Fact First",
    description: "Cross-reference every AI 'fact' with at least two trusted primary sources.",
    icon: <Search className="text-yellow-500" />
  }
];

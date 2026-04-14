export interface Skill {
  name: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface RoadmapStep {
  title: string;
  description: string;
  duration: string;
  resources: string[];
}

export interface InterviewQuestion {
  question: string;
  answerHint: string;
  category: 'Technical' | 'Behavioral' | 'Soft Skills';
}

export interface CareerAnalysis {
  summary: string;
  currentSkills: Skill[];
  missingSkills: Skill[];
  roadmap: RoadmapStep[];
  interviewQuestions: InterviewQuestion[];
  suggestedRoles: string[];
}

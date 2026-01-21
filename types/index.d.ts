type Job = {
  title: string;
  description: string;
  location: string;
  requiredSkills: string[];
};

type Resume = {
  id: string;
  companyName?: string;
  jobTitle?: string;
  imagePath: string;
  resumePath: string;
  feedback: Feedback;
};

type Feedbackb = {
  overallScore: number;
  ATS: {
    score: number;
    tips: {
      type: "good" | "improve";
      tip: string;
    }[];
  };
  toneAndStyle: {
    score: number;
    tips: {
      type: "good" | "improve";
      tip: string;
      explanation: string;
    }[];
  };
  content: {
    score: number;
    tips: {
      type: "good" | "improve";
      tip: string;
      explanation: string;
    }[];
  };
  structure: {
    score: number;
    tips: {
      type: "good" | "improve";
      tip: string;
      explanation: string;
    }[];
  };
  skills: {
    score: number;
    tips: {
      type: "good" | "improve";
      tip: string;
      explanation: string;
    }[];
  };
};

type fileUploaderProps = {
  onFileSelect: (file: File | null) => void;
};

type analyzeResumeType = {
  companyName: string;
  jobTitle: string;
  jobDescription: string;
  file: File;
};

type Suggestion = {
  type: "good" | "improve";
  tip: string;
};

type ATSProps = {
  score: number;
  suggestions: Suggestion[];
};

type CategoryProps = { title: string; score: number };

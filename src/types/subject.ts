export interface SubjectsCardProps {
    id: number;
    name: string;
    description?: string;
    professorId: number;
    professor: string;
  }

  export interface Subject {
    id: number;
    name: string;
    description?: string;
    syllabus?: string;
    course_hours?: number;
    isActive: boolean;
    created_at: string;
    updated_at: string;
  }
  
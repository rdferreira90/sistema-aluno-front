interface ClassAssignment {
    id: number;
    description: string;
    date_ini: string;
    date_end: string;
    professor?: {
      id: number;
      name: string;
    };
  }
  

  interface ClassAssignmentFormData {
    id?: number;
    description: string;
    date_ini: string;
    date_end: string;
    professor_id?: number;
    course_subject_id: number;
  }
  
export const PERMISSIONS = {
    DASHBOARD: {
      VIEW: 'view_dashboard',
    },
  
    COURSE: {
      VIEW: 'view_courses',
      CREATE: 'create_course',
      UPDATE: 'update_course',
      DELETE: 'delete_course',
    },
  
    SUBJECT: {
      VIEW: 'view_subjects',
      CREATE: 'create_subject',
      UPDATE: 'update_subject',
      DELETE: 'delete_subject',
      MANAGE_COURSE_RELATIONS: 'manage_course_subjects',
    },
  
    STUDENT: {
      VIEW: 'view_students',
      CREATE: 'create_student',
      UPDATE: 'update_student',
      DELETE: 'delete_student',
    },
  
    PROFESSOR: {
      VIEW: 'view_professors',
      CREATE: 'create_professor',
      UPDATE: 'update_professor',
      DELETE: 'delete_professor',
    },
  
    ENROLLMENT: {
      MANAGE: 'manage_enrollments',
    },
  
    FILES: {
      MANAGE: 'manage_files',
    },
  
    USER: {
      MANAGE: 'manage_users',
    },
  
    PROFILE: {
      MANAGE: 'manage_profiles',
    },
  
    PERMISSION: {
      MANAGE: 'manage_permissions',
    },
  
    REPORT: {
      VIEW_STUDENT: 'view_student_reports',
      VIEW_SUBJECT: 'view_subject_reports',
    },
  
    SYSTEM: {
      ADMIN_ACCESS: 'admin_access',
    }
  } as const;
  
  export type PermissionValue = typeof PERMISSIONS[keyof typeof PERMISSIONS][keyof typeof PERMISSIONS[keyof typeof PERMISSIONS]];
  
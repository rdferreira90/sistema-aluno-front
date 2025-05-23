
export interface MenuItem {
  label: string;
  icon: string; 
  path?: string;
  permission?: string;
  children?: MenuItem[];
}


// export const MENU_ITEMS: MenuItem[] = [
//   {
//       label: 'Dashboard',
//       icon: 'Home',
//       path: '/dashboard',
//       permission: 'view_dashboard'
//   },
//   {
//       label: 'Alunos',
//       icon: 'Users',
//       children: [
//           { label: 'Listar', icon: 'List', path: '/student', permission: 'view_students' },
//           { label: 'Novo', icon: 'UserPlus', path: '/student/new' },
//       ],
//   },
//   {
//       label: 'Professores',
//       icon: 'GraduationCap',
//       path: '/teacher',
//   },
//   {
//       label: 'Disciplinas',
//       icon: 'Book',
//       path: '/subject',
//   },
//   {
//       label: 'Secretaria',
//       icon: 'ClipboardList',
//       children: [
//           { label: 'Turmas', icon: 'LayoutGrid', path: '/class' },
//           { label: 'Matrículas', icon: 'ClipboardEdit', path: '/enrollment' },
//           { label: 'Alunos', icon: 'Users', path: '/student', permission: 'view_students' },
//           { label: 'Professores', icon: 'GraduationCap', path: '/teacher', permission: 'view_teachers' },
//       ],
//   },
//   {
//       label: 'Relatórios',
//       icon: 'BarChart',
//       children: [
//           { label: 'Alunos', icon: 'FileText', path: '/reports/students' },
//           { label: 'Disciplinas', icon: 'FileText', path: '/reports/subjects' },
//       ],
//   },
// ];

// export const MENU_ITEMS: MenuItem[] = [
//   {
//     label: 'Dashboard',
//     icon: 'Home',
//     path: '/dashboard',
//     permission: 'view_dashboard'
//   },
//   {
//     label: 'Cursos',
//     icon: 'School',
//     permission: 'view_courses',
//     children: [
//       { label: 'Listar Cursos', icon: 'List', path: '/course', permission: 'view_courses' },
//       { label: 'Novo Curso', icon: 'Plus', path: '/course/new', permission: 'create_course' },
//     ]
//   },
//   {
//     label: 'Disciplinas',
//     icon: 'BookOpen',
//     permission: 'view_subjects',
//     children: [
//       { label: 'Listar Disciplinas', icon: 'List', path: '/subject', permission: 'view_subjects' },
//       { label: 'Nova Disciplina', icon: 'Plus', path: '/subject/new', permission: 'create_subject' },
//       { label: 'Disciplinas por Curso', icon: 'Link2', path: '/course-subjects', permission: 'manage_course_subjects' },
//     ]
//   },
//   {
//     label: 'Alunos',
//     icon: 'Users',
//     permission: 'view_students',
//     children: [
//       { label: 'Listar Alunos', icon: 'List', path: '/student', permission: 'view_students' },
//       { label: 'Novo Aluno', icon: 'UserPlus', path: '/student/new', permission: 'create_student' },
//     ]
//   },
//   {
//     label: 'Professores',
//     icon: 'GraduationCap',
//     permission: 'view_professors',
//     children: [
//       { label: 'Listar Professores', icon: 'List', path: '/teacher', permission: 'view_professors' },
//       { label: 'Novo Professor', icon: 'UserPlus', path: '/teacher/new', permission: 'create_professor' },
//     ]
//   },
//   {
//     label: 'Matrículas',
//     icon: 'ClipboardList',
//     children: [
//       { label: 'Gerenciar Matrículas', icon: 'ClipboardEdit', path: '/enrollment', permission: 'manage_enrollments' },
//     ]
//   },
//   {
//     label: 'Arquivos',
//     icon: 'FolderOpen',
//     children: [
//       { label: 'Gerenciar Arquivos', icon: 'File', path: '/files', permission: 'manage_files' },
//     ]
//   },
//   {
//     label: 'Administração',
//     icon: 'Shield',
//     permission: 'admin_access',
//     children: [
//       { label: 'Usuários', icon: 'UserCog', path: '/users', permission: 'manage_users' },
//       { label: 'Perfis', icon: 'IdCard', path: '/profiles', permission: 'manage_profiles' },
//       { label: 'Permissões', icon: 'Key', path: '/permissions', permission: 'manage_permissions' },
//     ]
//   },
//   {
//     label: 'Relatórios',
//     icon: 'BarChart',
//     children: [
//       { label: 'Relatório de Alunos', icon: 'FileText', path: '/reports/students', permission: 'view_student_reports' },
//       { label: 'Relatório de Disciplinas', icon: 'FileText', path: '/reports/subjects', permission: 'view_subject_reports' },
//     ]
//   },
// ];


import { PERMISSIONS } from '@/constants/permissions';

export const MENU_ITEMS: MenuItem[] = [
  {
    label: 'Dashboard',
    icon: 'Home',
    path: '/dashboard',
    // permission: PERMISSIONS.DASHBOARD.VIEW,
  },
  {
    label: 'Acadêmico',
    icon: 'Book',
    children: [
      {
        label: 'Cursos',
        icon: 'School',
        permission: PERMISSIONS.COURSE.VIEW,
        children: [
          { label: 'Listar Cursos', icon: 'List', path: '/course', permission: PERMISSIONS.COURSE.VIEW },
          { label: 'Novo Curso', icon: 'Plus', path: '/course/new', permission: PERMISSIONS.COURSE.CREATE },
        ]
      },
      {
        label: 'Disciplinas',
        icon: 'BookOpen',
        permission: PERMISSIONS.SUBJECT.VIEW,
        children: [
          { label: 'Listar Disciplinas', icon: 'List', path: '/subjects', permission: PERMISSIONS.SUBJECT.VIEW },
          { label: 'Nova Disciplina', icon: 'Plus', path: '/subject/new', permission: PERMISSIONS.SUBJECT.CREATE },
          { label: 'Disciplinas por Curso', icon: 'Link2', path: '/course-subjects', permission: PERMISSIONS.SUBJECT.MANAGE_COURSE_RELATIONS },
        ]
      },
      {
        label: 'Matrículas',
        icon: 'ClipboardList',
        children: [
          { label: 'Gerenciar Matrículas', icon: 'ClipboardEdit', path: '/enrollment', permission: PERMISSIONS.ENROLLMENT.MANAGE },
        ]
      },
    ]
  },
  {
    label: 'Gestão de Pessoas',
    icon: 'Users',
    children: [
      {
        label: 'Alunos',
        icon: 'Users',
        permission: PERMISSIONS.STUDENT.VIEW,
        children: [
          { label: 'Listar Alunos', icon: 'List', path: '/student', permission: PERMISSIONS.STUDENT.VIEW },
          { label: 'Novo Aluno', icon: 'UserPlus', path: '/student/new', permission: PERMISSIONS.STUDENT.CREATE },
        ]
      },
      {
        label: 'Professores',
        icon: 'GraduationCap',
        permission: PERMISSIONS.PROFESSOR.VIEW,
        children: [
          { label: 'Listar Professores', icon: 'List', path: '/teacher', permission: PERMISSIONS.PROFESSOR.VIEW },
          { label: 'Novo Professor', icon: 'UserPlus', path: '/teacher/new', permission: PERMISSIONS.PROFESSOR.CREATE },
        ]
      },
    ]
  },
  {
    label: 'Arquivos',
    icon: 'FolderOpen',
    children: [
      { label: 'Gerenciar Arquivos', icon: 'File', path: '/files', permission: PERMISSIONS.FILES.MANAGE },
    ]
  },
  {
    label: 'Administração',
    icon: 'Shield',
    permission: PERMISSIONS.SYSTEM.ADMIN_ACCESS,
    children: [
      { label: 'Usuários', icon: 'UserCog', path: '/users', permission: PERMISSIONS.USER.MANAGE },
      { label: 'Perfis', icon: 'IdCard', path: '/profiles', permission: PERMISSIONS.PROFILE.MANAGE },
      { label: 'Permissões', icon: 'Key', path: '/permissions', permission: PERMISSIONS.PERMISSION.MANAGE },
    ]
  },
  {
    label: 'Relatórios',
    icon: 'BarChart',
    children: [
      { label: 'Relatório de Alunos', icon: 'FileText', path: '/reports/students', permission: PERMISSIONS.REPORT.VIEW_STUDENT },
      { label: 'Relatório de Disciplinas', icon: 'FileText', path: '/reports/subjects', permission: PERMISSIONS.REPORT.VIEW_SUBJECT },
    ]
  },
];

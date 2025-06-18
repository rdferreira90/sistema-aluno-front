
export interface MenuItem {
  label: string;
  icon: string; 
  path?: string;
  permission?: string;
  children?: MenuItem[];
}

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
          { label: 'Nova Disciplina', icon: 'Plus', path: '/subjects/new', permission: PERMISSIONS.SUBJECT.CREATE },
          // { label: 'Disciplinas por Curso', icon: 'Link2', path: '/course-subjects', permission: PERMISSIONS.SUBJECT.MANAGE_COURSE_RELATIONS },
        ]
      },
      {
        label: 'Matrículas',
        icon: 'ClipboardList',
        children: [
          { label: 'Gerenciar Matrículas', icon: 'ClipboardEdit', path: '/enrollment', permission: PERMISSIONS.ENROLLMENT.MANAGE },
        ]
      },
      {
        label: 'Turma',
        icon: 'GraduationCap',
        children: [
          { label: 'Gerenciar Turma', icon: 'ClipboardEdit', path: '/class-assignment' },
        ]
      },
    ]
  },
  // {
  //   label: 'Gestão de Pessoas',
  //   icon: 'Users',
  //   children: [
  //     {
  //       label: 'Alunos',
  //       icon: 'Users',
  //       permission: PERMISSIONS.STUDENT.VIEW,
  //       children: [
  //         { label: 'Listar Alunos', icon: 'List', path: '/student', permission: PERMISSIONS.STUDENT.VIEW },
  //         { label: 'Novo Aluno', icon: 'UserPlus', path: '/student/new', permission: PERMISSIONS.STUDENT.CREATE },
  //       ]
  //     },
  //     {
  //       label: 'Professores',
  //       icon: 'GraduationCap',
  //       permission: PERMISSIONS.PROFESSOR.VIEW,
  //       children: [
  //         { label: 'Listar Professores', icon: 'List', path: '/teacher', permission: PERMISSIONS.PROFESSOR.VIEW },
  //         { label: 'Novo Professor', icon: 'UserPlus', path: '/teacher/new', permission: PERMISSIONS.PROFESSOR.CREATE },
  //       ]
  //     },
  //   ]
  // },
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
  // {
  //   label: 'Relatórios',
  //   icon: 'BarChart',
  //   children: [
  //     { label: 'Relatório de Alunos', icon: 'FileText', path: '/reports/students', permission: PERMISSIONS.REPORT.VIEW_STUDENT },
  //     { label: 'Relatório de Disciplinas', icon: 'FileText', path: '/reports/subjects', permission: PERMISSIONS.REPORT.VIEW_SUBJECT },
  //   ]
  // },
];

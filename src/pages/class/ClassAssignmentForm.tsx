import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createClassAssignment, getClassAssignmentById, updateClassAssignment } from '@/api/classAssignmentService';
import { getAllProfessors } from '@/api/professorService';
import { getAllCourseSubjects } from '@/api/courseSubjectService';
import { toast } from 'react-toastify';

interface ClassAssignmentFormData {
  id?: number;
  description: string;
  date_ini: string;
  date_end: string;
  professor_id?: number;
  course_subject_id: number;
}

interface Professor {
  id: number;
  name: string;
}

interface CourseSubject {
  id: number;
  name: string;
}

export default function ClassAssignmentFormPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const [formData, setFormData] = useState<ClassAssignmentFormData>({
    description: '',
    date_ini: '',
    date_end: '',
    professor_id: undefined,
    course_subject_id: 0,
  });

  const [professors, setProfessors] = useState<Professor[]>([]);
  const [courseSubjects, setCourseSubjects] = useState<CourseSubject[]>([]);

  useEffect(() => {
    async function fetchInitialData() {
      try {
        const [professorsData, courseSubjectsData] = await Promise.all([
          getAllProfessors(),
          getAllCourseSubjects(),
        ]);
        setProfessors(professorsData);
        setCourseSubjects(courseSubjectsData);
      } catch {
        toast.error('Erro ao carregar professores ou disciplinas.');
      }
    }

    async function fetchAssignment() {
      try {
        const data = await getClassAssignmentById(Number(id));
        setFormData({
          id: data.id,
          description: data.description,
          date_ini: data.date_ini.split('T')[0],
          date_end: data.date_end.split('T')[0],
          professor_id: data.professor?.id,
          course_subject_id: data.course_subject?.id,
        });
      } catch {
        toast.error('Erro ao carregar dados da turma.');
      }
    }

    fetchInitialData();
    if (isEditMode) fetchAssignment();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name.endsWith('_id') ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await updateClassAssignment(Number(id), formData);
        toast.success('Turma atualizada com sucesso!');
      } else {
        await createClassAssignment(formData);
        toast.success('Turma criada com sucesso!');
      }
      navigate('/class-assignment');
    } catch {
      toast.error('Erro ao salvar turma.');
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{isEditMode ? 'Editar Turma' : 'Nova Turma'}</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Descrição</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Data Início</label>
            <input
              type="date"
              name="date_ini"
              value={formData.date_ini}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Data Fim</label>
            <input
              type="date"
              name="date_end"
              value={formData.date_end}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
        </div>

        <div>
          <label className="block mb-1 font-medium">Professor</label>
          <select
            name="professor_id"
            value={formData.professor_id ?? ''}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Selecione um professor</option>
            {professors.map((prof) => (
              <option key={prof.id} value={prof.id}>
                {prof.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Disciplina do Curso</label>
          <select
            name="course_subject_id"
            value={formData.course_subject_id}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          >
            <option value="">Selecione uma disciplina</option>
            {courseSubjects.map((cs) => (
              <option key={cs.id} value={cs.id}>
                {cs.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate('/class-assignment')}
            className="px-4 py-2 rounded border border-gray-400"
          >
            Cancelar
          </button>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            {isEditMode ? 'Atualizar' : 'Criar'}
          </button>
        </div>
      </form>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createCourse, getCourseById, updateCourse } from '@/api/courseService';
import { toast } from 'react-toastify';
import { Subject } from '@/types/subject';
import { getAllSubjects } from '@/api/subjectService';

export default function CourseFormPage() {
  const { id } = useParams();
  const isEditMode = !!id;
  const navigate = useNavigate();

  const [formulario, setFormulario] = useState({ name: '', description: '', subjectIds: [] as number[] });
  const [loading, setLoading] = useState(false);
  const [subjects, setSubjects] = useState<Subject[]>([]);


  useEffect(() => {
    if (isEditMode) {
      async function fetchCourse() {
        try {
          const course = await getCourseById(Number(id));
          setFormulario({
            name: course.name,
            description: course.description,
            subjectIds: course.subjectIds,
          });
        } catch (err) {
          toast.error('Erro ao carregar o curso.');
        }
      }
      fetchCourse();
    }

    async function fetchSubjects() {
      try {
        const response = await getAllSubjects();
        setSubjects(response);
        
      } catch (error) {
        toast.error('Erro ao carregar disciplinas.');
      }
    }

    fetchSubjects();


  }, [id, isEditMode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEditMode) {
        await updateCourse(Number(id), formulario);
        toast.success('Curso atualizado com sucesso!');
      } else {
        await createCourse(formulario);
        toast.success('Curso criado com sucesso!');
      }
      navigate('/course');
    } catch (err) {
      toast.error('Erro ao salvar curso.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('handleChange:', e, e.target.name, e.target.value);  
    setFormulario((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubjectToggle = (subjectId: number) => {
    setFormulario((prev) => ({
      ...prev,
      subjectIds: prev.subjectIds.includes(subjectId)
        ? prev.subjectIds.filter((id) => id !== subjectId)
        : [...prev.subjectIds, subjectId],
    }));
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        {isEditMode ? 'Editar Curso' : 'Novo Curso'}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block font-medium mb-1">Nome do Curso</label>
          <input
            id="name"
            name='name'
            type="text"
            className="w-full border border-gray-300 p-2 rounded"
            value={formulario.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
        <label htmlFor="description" className="block font-medium mb-1">Descrição do Curso</label>
        <input
          id="description"
          name="description"
          type="text"
          className="w-full border border-gray-300 p-2 rounded"
          value={formulario.description}
          onChange={handleChange}
        />
      </div>
        <div>
          <label className="block font-semibold mb-2">Disciplinas</label>
          <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto border p-2 rounded">
            {subjects.map((sub) => (
              <label key={sub.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formulario.subjectIds.includes(sub.id)}
                  onChange={() => handleSubjectToggle(sub.id)}
                />
                {sub.name}
              </label>
            ))}
          </div>
        </div>
        <div className="flex justify-end gap-4">
          <button
            type="button"
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
            onClick={() => navigate('/course')}
            disabled={loading}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            {loading ? 'Salvando...' : 'Salvar'}
          </button>
        </div>
      </form>
    </div>
  );
}

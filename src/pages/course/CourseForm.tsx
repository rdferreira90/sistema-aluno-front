import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createCourse, getCourseById, updateCourse } from '@/api/courseService';
import { toast } from 'react-toastify';

export default function CourseFormPage() {
  const { id } = useParams();
  const isEditMode = !!id;
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEditMode) {
      async function fetchCourse() {
        try {
          const course = await getCourseById(Number(id));
          setName(course.name);
        } catch (err) {
          toast.error('Erro ao carregar o curso.');
        }
      }
      fetchCourse();
    }
  }, [id, isEditMode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEditMode) {
        await updateCourse(Number(id), { name });
        toast.success('Curso atualizado com sucesso!');
      } else {
        await createCourse({ name });
        toast.success('Curso criado com sucesso!');
      }
      navigate('/courses');
    } catch (err) {
      toast.error('Erro ao salvar curso.');
    } finally {
      setLoading(false);
    }
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
            type="text"
            className="w-full border border-gray-300 p-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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

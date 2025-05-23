import { useEffect, useState } from "react";
import { createSubject, getSubjectById, updateSubject } from "@/api/subjectService";
import { Subject } from "@/types/subject";
import { useNavigate, useParams } from "react-router-dom";

export default function SubjectFormPage() {
  const [status, setStatus] = useState(true);
  const [formData, setFormData] = useState<Partial<Subject>>({
    name: "",
    description: "",
    syllabus: "",
    course_hours: undefined,
    isActive: true
  });

  
  const navigate = useNavigate();
  const params = useParams();
  const isEditing = !!params?.id;

  useEffect(() => {
    if (isEditing) {
      loadSubject(Number(params.id));
    }
  }, [params]);

  const loadSubject = async (id: number) => {
    const data = await getSubjectById(id);
    setFormData(data);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === "course_hours" ? Number(value) : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    formData.isActive = status;
    if (isEditing) {
      await updateSubject(Number(params.id), formData);
    } else {
      await createSubject(formData);
    }
    navigate("/subjects");
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        {isEditing ? "Editar Disciplina" : "Nova Disciplina"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <label className="flex items-center gap-2">
        <input type="checkbox" checked={status} onChange={() => setStatus(!status)} />
          Ativo
        </label>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Nome
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name || ""}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Descrição
          </label>
          <input
            type="text"
            name="description"
            id="description"
            value={formData.description || ""}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label htmlFor="syllabus" className="block text-sm font-medium text-gray-700 mb-1">
            Ementa
          </label>
          <textarea
            name="syllabus"
            id="syllabus"
            value={formData.syllabus || ""}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label htmlFor="course_hours" className="block text-sm font-medium text-gray-700 mb-1">
            Carga Horária
          </label>
          <input
            type="number"
            name="course_hours"
            id="course_hours"
            value={formData.course_hours || ""}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={() => navigate("/subjects")}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
}

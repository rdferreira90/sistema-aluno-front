import { getAllSubjects } from "@/api/subjectService";
import { Subject } from "@/types/subject";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

  export default function SubjectsPage() {
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const navigate = useNavigate();
  
    useEffect(() => {
      async function fetchData() {
        try {
          const data = await getAllSubjects();
          setSubjects(data);
        } catch (error) {
          console.error('Erro ao buscar disciplinas:', error);
        }
      }
  
      fetchData();
    }, []);
  
    return (
      <div>
        <h2 className="text-2xl font-bold mb-6">Gerenciar Disciplinas</h2>
  
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {subjects.map((subject) => (
            <div
              key={subject.id}
              onClick={() => navigate(`/subject/${subject.id}`)}
              className="cursor-pointer bg-white border border-gray-300 rounded-xl shadow-sm p-5 hover:shadow-md hover:border-blue-500 transition duration-200"
            >
              <h3 className="text-lg font-semibold mb-2 text-blue-800">{subject.name}</h3>
              <p className="text-sm text-gray-600">
                <strong>Professor:</strong> {subject.professor}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }
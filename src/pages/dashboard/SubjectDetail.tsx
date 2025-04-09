
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSubjectById } from '../../api/subject';
import { Subject } from '../../types/subject';

export default function SubjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [subject, setSubject] = useState<Subject | null>(null);

  useEffect(() => {
    async function fetchSubject() {
      try {
        if (id) {
          const data = await getSubjectById(Number(id));
          setSubject(data);
        }
      } catch (error) {
        console.error('Erro ao buscar disciplina:', error);
      }
    }

    fetchSubject();
  }, [id]);

  if (!subject) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{subject.name}</h2>
      <p className="text-gray-700 mb-2">
        <strong>Professor:</strong> {subject.professor}
      </p>
      {subject.description && (
        <p className="text-gray-600">
          <strong>Descrição:</strong> {subject.description}
        </p>
      )}
    </div>
  );
}

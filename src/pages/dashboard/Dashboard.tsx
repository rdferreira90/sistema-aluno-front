// import { useNavigate } from 'react-router-dom';

// type Subject = {
//   id: number;
//   name: string;
//   professor: string;
// };

// const mockSubjects: Subject[] = [
//   { id: 1, name: 'Teologia Sistemática', professor: 'Pr. João Silva' },
//   { id: 2, name: 'Homilética', professor: 'Pr. Carlos Mendes' },
//   { id: 3, name: 'História da Igreja', professor: 'Pr. Paulo Rocha' },
// ];

// export default function DashboardPage() {
//   const navigate = useNavigate();

//   return (
//     <div>
//       <h2 className="text-2xl font-semibold mb-6">Disciplinas</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {mockSubjects.map((subject) => (
//           <div
//             key={subject.id}
//             className="bg-white rounded-xl shadow p-6 cursor-pointer hover:shadow-lg transition"
//             onClick={() => navigate(`/subject/${subject.id}`)}
//           >
//             <h3 className="text-lg font-bold">{subject.name}</h3>
//             <p className="text-gray-600">Professor: {subject.professor}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


// import { useEffect, useState } from 'react';
// import { getAllSubjects } from '../../api/subject';
// import { Subject } from '../../types/subject';
// import { useNavigate } from 'react-router-dom';

// export default function DashboardPage() {
//   const [subjects, setSubjects] = useState<Subject[]>([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     async function loadSubjects() {
//       try {
//         const data = await getAllSubjects();
//         setSubjects(data);
//       } catch (error) {
//         console.error('Erro ao buscar disciplinas', error);
//       }
//     }

//     loadSubjects();
//   }, []);

//   return (
//     <div>
//       <h2 className="text-2xl font-semibold mb-4">Disciplinas</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//         {subjects.map((subject) => (
//           <div
//             key={subject.id}
//             onClick={() => navigate(`/subject/${subject.id}`)}
//             className="bg-white shadow-md p-4 rounded hover:shadow-lg transition cursor-pointer"
//           >
//             <h3 className="text-lg font-bold">{subject.name}</h3>
//             <p className="text-sm text-gray-600">Professor: {subject.professor}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from 'react';
import { getAllSubjects } from '../../api/subjectService';
import { Subject } from '../../types/subject';
import { useNavigate } from 'react-router-dom';

export default function DashboardPage() {
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
      <h2 className="text-2xl font-bold mb-6">Disciplinas</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {subjects.map((subject) => (
          <div
            key={subject.id}
            onClick={() => navigate(`/subject/${subject.id}`)}
            className="cursor-pointer bg-white border border-gray-300 rounded-xl shadow-sm p-5 hover:shadow-md hover:border-blue-500 transition duration-200"
          >
            <h3 className="text-lg font-semibold mb-2 text-blue-800">{subject.name}</h3>
            <p className="text-sm text-gray-600">
              {/* <strong>Professor:</strong> {subject.professor} */}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

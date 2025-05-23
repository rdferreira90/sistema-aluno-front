// import { useAuth } from '@/contexts/AuthContext';
// import { useNavigate } from 'react-router-dom';
// import { useEffect } from 'react';

// export function SelectUnitPage() {
//   const { userUnits, selectUnit, selectedUnit } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Se já tiver unidade selecionada, redireciona
//     if (selectedUnit) {
//       navigate('/dashboard');
//     }

//     // Se não tiver nenhuma unidade, volta pro login
//     if (userUnits.length === 0) {
//       navigate('/login');
//     }
//   }, [selectedUnit, userUnits, navigate]);

//   const handleSelect = (unitId: number) => {
//     selectUnit(unitId);
//     navigate('/dashboard');
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
//       <h1 className="text-2xl font-semibold mb-4">Selecione uma unidade</h1>
//       <div className="grid gap-4 w-full max-w-md">
//         {userUnits.map(({ unit }) => (
//           <button
//             key={unit.id}
//             className="w-full bg-white border border-gray-300 rounded-xl p-4 text-lg hover:bg-blue-100 transition"
//             onClick={() => handleSelect(unit.id)}
//           >
//             {unit.name}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }


import './Login.css';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import logo from '../../assets/images/logo-vida-relevante.png';
import userImage from '../../assets/images/do-utilizador.png';

export function SelectUnitPage() {
  const { userUnits, selectUnit } = useAuth();
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (userUnits.length === 1) {
      const unitId = userUnits[0].unit.id;
      selectUnit(unitId);
      navigate('/dashboard');
    }
  }, [userUnits, navigate, selectUnit]);

  const handleConfirm = () => {
    if (!selectedId) {
      setError('Selecione uma unidade para continuar.');
      return;
    }

    selectUnit(selectedId);
    navigate('/dashboard');
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="Logo" />
        <div className="Login-area">
          <img src={userImage} className="User-img" alt="Imagem de usuário" />
          <p>Selecione a unidade:</p>

          <select
            className="User"
            value={selectedId ?? ''}
            onChange={(e) => setSelectedId(Number(e.target.value))}
          >
            <option value="">-- Selecione --</option>
            {userUnits.map(({ unit }) => (
              <option key={unit.id} value={unit.id}>
                {unit.name}
              </option>
            ))}
          </select>

          {error && <div className="error-message">{error}</div>}

          <button onClick={handleConfirm} className="login-button">
            Confirmar
          </button>
        </div>
      </header>
    </div>
  );
}

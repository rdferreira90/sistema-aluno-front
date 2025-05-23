import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { getAllProfiles } from '@/api/profileService';
import { createUser, updateUser } from '@/api/userService';
import { Profile, UserType, CreateUserPayload, User } from '@/types/user';
import { toast } from 'react-toastify';

export default function UserFormPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const isEditMode = location.state?.isEditMode || false;
  const existingUser = location.state?.existingUser || null;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [enrollment, setEnrollment] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState(true);
  const [isGlobalAdmin, setIsGlobalAdmin] = useState(false);
  const [userType, setUserType] = useState<UserType>('generic');
  const [selectedProfile, setSelectedProfile] = useState<number | null>(null);
  const [specialization, setSpecialization] = useState('');
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    getAllProfiles()
      .then((data) => {
        setProfiles(data);
        if (data.length > 0 && !isEditMode) setSelectedProfile(data[0].id);
      })
      .catch(() => setError('Erro ao carregar perfis'));
  }, []);

  useEffect(() => {    
    if (isEditMode && existingUser) {
      setName(existingUser.name ?? '');
      setEmail(existingUser.email ?? '');
      setUsername(existingUser.username ?? '');
      setEnrollment(existingUser.enrollment ?? '');
      setStatus(existingUser.status ?? true);
      setUserType(changeUserTypeByUser(existingUser));
      setSelectedProfile(existingUser.profile.id ?? null);
      setIsGlobalAdmin(existingUser.isGlobalAdmin ?? false);
      setSpecialization(existingUser.specialization ?? '');
    }
  }, [isEditMode, existingUser]);

  const changeUserTypeByUser = (user: User | null) => {
    if(!user) return 'generic';
    return user.isProfessor ? 'professor' :
      user.isStudent ? 'student' :
      user.isGlobalAdmin ? 'globalAdmin' :
      user.isAdmin ? 'admin' :
      'generic';      
  }
  
  const handleSubmit = async () => {
    if (!name || !email || !username || (!isEditMode && !password) || !selectedProfile) {
      setError('Todos os campos obrigatórios devem ser preenchidos.');
      return;
    }

    try {
      const payload: CreateUserPayload = {
        name,
        email,
        username,
        enrollment: isEditMode ? enrollment : '',
        password,
        status,
        isGlobalAdmin,
        userType,
        profileId: selectedProfile,
        specialization: userType === 'professor' ? specialization : undefined,
      };

      let response;
      if (isEditMode) {
        response = await updateUser(existingUser.id, payload);
      } else {
        response = await createUser(payload);        
      }
      navigate('/users');
      toast.success(response.message); 
    } catch (err) {
      toast.error('Erro ao salvar usuário.'); 
      setError('Erro ao salvar usuário.');
    } 
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 shadow rounded-xl space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">
        {isEditMode ? 'Editar Usuário' : 'Criar Novo Usuário'}
      </h2>

      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={status} onChange={() => setStatus(!status)} />
          Ativo
        </label>
        {user?.isGlobalAdmin && (
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={isGlobalAdmin} onChange={() => setIsGlobalAdmin(!isGlobalAdmin)} />
            Administrador Global
          </label>
        )}
      </div>

      <div className="space-y-4">
        <input
          className="w-full border border-gray-300 p-2 rounded"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="w-full border border-gray-300 p-2 rounded"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full border border-gray-300 p-2 rounded"
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        {isEditMode && (
          <input
            className="w-full border border-gray-300 p-2 rounded bg-gray-100 text-gray-600"
            placeholder="Matrícula"
            value={enrollment}
            disabled
          />
        )}

        {!isEditMode && (
          <input
            type="password"
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        )}

        <div>
          <label className="block mb-1 font-medium">Tipo de Usuário</label>
          <select
            className="w-full border border-gray-300 p-2 rounded"
            value={userType}
            onChange={(e) => setUserType(e.target.value as UserType)}
          >
            <option value="generic">Genérico</option>
            <option value="admin">Administrativo</option>
            <option value="professor">Professor</option>
            <option value="student">Aluno</option>
          </select>
        </div>

        {userType === 'professor' && (
          <input
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Especialização"
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
          />
        )}

        <div>
          <label className="block mb-1 font-medium">Perfil</label>
          <select
            className="w-full border border-gray-300 p-2 rounded"
            value={selectedProfile ?? ''}
            onChange={(e) => setSelectedProfile(Number(e.target.value))}
          >
            {profiles.map((profile) => (
              <option key={profile.id} value={profile.id}>
                {profile.name}
              </option>
            ))}
          </select>
        </div>

        {error && <div className="text-red-600">{error}</div>}

        <div className="flex justify-end gap-2">
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            {isEditMode ? 'Salvar Alterações' : 'Criar Usuário'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/users')}
            className="bg-gray-600 text-white px-4 py-2 rounded"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

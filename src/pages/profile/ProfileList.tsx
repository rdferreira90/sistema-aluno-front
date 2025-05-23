
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteProfile, getAllProfiles } from '@/api/profileService';
import { PaginatedTable } from '@/components/PaginatedTable';
import GenericModal from '@/components/Modal';
import { toast } from 'react-toastify';

interface Profile {
  id: number;
  name: string;
  // description: string;
}

export default function ProfileListPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);  
  const [profiles, setProfiles] = useState<Profile[]>([]);  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [modalConfirmAction, setModalConfirmAction] = useState<() => void>(() => () => {});

  useEffect(() => {
    async function fetchData() {
      const data = await getAllProfiles();
      setProfiles(data);
    }
    fetchData();
  }, []);

  // async function handleDelete(id: number) {
    
  //   const confirmed = window.confirm('Tem certeza que deseja excluir este perfil?');
  //   if (!confirmed) return;
  
  //   try {
  //     await deleteProfile(id);
  //     setProfiles((prev) => prev.filter((profile) => profile.id !== id));
  //   } catch (err: any) {
  //     alert('Erro ao excluir perfil.');
  //   }
  // }

  const handleDelete = (id: number) => {
    setModalTitle('Confirmar Exclusão');
    setModalMessage('Tem certeza que deseja excluir este perfil?');
    setModalConfirmAction(() => () => handleConfirmDelete(id)); 
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async (id: number) => {
    try {
      const response = await deleteProfile(id); 
      setProfiles((prev) => prev.filter((profile) => profile.id !== id));
      setIsModalOpen(false); 
      console.log(response)
      toast.success(response.message); 
    } catch (err: any) {      
      toast.error('Erro ao excluir perfil.'); 
      setIsModalOpen(false); 
    }
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false); 
  };

  const columns = [
    { key: 'name', label: 'Nome', sortable: true, width: '200px' },
    {
      key: 'id',
      label: 'Ações',
      width: '150px',
      render: (profile: Profile) => (
        <div className="flex items-center gap-4">
          <Link to={`/profiles/${profile.id}`} className="text-blue-600 hover:underline">
            Editar
          </Link>
          <button
            onClick={() => handleDelete(profile.id)}
            className="text-red-600 hover:underline"
          >
            Excluir
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Perfis</h1>
        <Link to="/profiles/new" className="bg-blue-600 text-white px-4 py-2 rounded">
          Novo Perfil
        </Link>
      </div>

      <PaginatedTable
        data={profiles}
        columns={columns}
        searchKeys={['name']}
      />
       
       <GenericModal
        isOpen={isModalOpen}
        title={modalTitle}
        message={modalMessage}
        onConfirm={modalConfirmAction}
        onCancel={handleCancelDelete}
        confirmLabel="Confirmar"
        cancelLabel="Cancelar"
      />
    </div>
  );
}

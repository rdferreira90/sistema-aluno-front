import { useLoading } from '../contexts/LoadingContext';
import { ChangeEvent, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { toast } from 'react-toastify';

interface FileUploaderProps {
  onUpload: (file: File) => void;
}

export function FileUploader({ onUpload }: FileUploaderProps) {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
  
    const { showLoading, hideLoading } = useLoading();

    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'image/png',
      'image/jpeg',
      'image/jpg',
      'image/gif',
    ];
  
    const maxSizeMB = 5;
  
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
  
      if (!file) return;
  
      if (!allowedTypes.includes(file.type)) {
        toast.error('Tipo de arquivo não suportado. Aceita: PDF, DOCX, PNG, JPG, JPEG, GIF.');
        resetFile();
        return;
      }
  
      if (file.size > maxSizeMB * 1024 * 1024) {
        toast.error(`Arquivo muito grande. Tamanho máximo permitido: ${maxSizeMB}MB.`);
        resetFile();
        return;
      }
  
      setSelectedFile(file);
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => setPreviewUrl(reader.result as string);
        reader.readAsDataURL(file);
      } else {
        setPreviewUrl(null);
      }
    };
  
    const handleUploadClick = () => {    

      if (!selectedFile) return;

      try {
        showLoading();
        onUpload(selectedFile);        
        resetFile();
      } catch (err) {
        console.error(err);
        toast.error('Erro ao enviar o arquivo.');
      } finally {
        hideLoading();
      }

    };
  
    const resetFile = () => {
      setSelectedFile(null);
      setPreviewUrl(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    };
  
    return (
      <div className="mt-6 border rounded p-4 bg-white shadow-sm">
        <h4 className="font-semibold mb-2">Enviar novo arquivo</h4>
        <div className="flex items-center gap-4">
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileChange}
            className="text-sm text-gray-700"
          />
          <button
            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm disabled:opacity-50"
            onClick={handleUploadClick}
            disabled={!selectedFile}
          >
            Enviar
          </button>
          {selectedFile && (
            <button
              onClick={resetFile}
              className="text-red-600 hover:underline text-sm flex items-center gap-1"
            >
              <X size={16} /> Remover
            </button>
          )}
        </div>
  
        {previewUrl && (
          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-1">Preview da imagem:</p>
            <img src={previewUrl} alt="Preview" className="max-w-xs rounded border shadow" />
          </div>
        )}
      </div>
    );
  }
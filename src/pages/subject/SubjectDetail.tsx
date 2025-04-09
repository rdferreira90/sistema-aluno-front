
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSubjectById } from '../../api/subject';
import { Subject } from '../../types/subject';
import { getByCourseSubject, downloadFile, uploadFile } from '../../api/file';
import { IFile } from '../../types/file';
import { Download } from 'lucide-react';
import { FileUploader } from '../../components/FileUploader';
import { useLoading } from '../../contexts/LoadingContext';
import { toast } from 'react-toastify';


export default function SubjectDetailPage() {
    const { id } = useParams<{ id: string }>();
    const [subject, setSubject] = useState<Subject | null>(null);
    const [files, setFiles] = useState<IFile[]>([]);
    const { showLoading, hideLoading } = useLoading();

    useEffect(() => {
        async function fetchSubjectAndFiles() {
            if (id) {
                const data = await getSubjectById(Number(id));
                setSubject(data);

                const fileList = await getByCourseSubject(Number(id));
                setFiles(fileList);
            }
        }

        fetchSubjectAndFiles();
    }, [id]);

    const handleDownload = async (fileId: number, fileName: string) => {
        try {
            showLoading();
            const response = await downloadFile(fileId, fileName);
            if (!response) throw toast.error('Erro ao buscar arquivo para download.');

            const url = window.URL.createObjectURL(new Blob([response]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            link.remove();


        } catch (error) {
            toast.error('Erro ao baixar o arquivo.');
            console.error(error);
        } finally {
            hideLoading();
        }
    };

    const handleUpload = async (file: File) => {

        try {
            if (!id) return;
            showLoading();
            await uploadFile(file, Number(id));
            toast.success('Arquivo enviado com sucesso.');
            const updatedFiles = await getByCourseSubject(Number(id));
            setFiles(updatedFiles);
        } catch (error) {
            toast.error('Erro ao enviar do arquivo.');
            console.error(error);
        } finally {
            hideLoading();
        }

    };

    if (!subject) return <p>Carregando...</p>;

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

            <FileUploader onUpload={handleUpload} />

            <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Arquivos para download</h3>
                {files.length === 0 ? (
                    <p className="text-gray-500">Nenhum arquivo disponível.</p>
                ) : (
                    <ul className="space-y-3">
                        {files.map((file) => (
                            <li
                                key={file.id}
                                className="flex justify-between items-center bg-white border rounded-md p-3 shadow-sm"
                            >
                                <div>
                                    <p className="font-medium text-gray-800">{file.name}</p>
                                    <p className="text-sm text-gray-500">
                                        Enviado em: {new Date(file.updated_at).toLocaleDateString()}
                                    </p>
                                </div>
                                <button
                                    onClick={() => handleDownload(file.id, file.name)}
                                    className="flex items-center gap-1 text-blue-600 hover:underline"
                                >
                                    <Download size={18} /> Baixar
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

        </div>
    );
}

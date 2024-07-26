
import { useEffect, useState,useMemo } from "react";
import { useNavigate} from "react-router-dom";
import classServices from "services/classService";

import ColumnsTable from "BackOffice/admin/tables/components/ColumnsTable";

const ClassesList = () => {
    const navigate = useNavigate();
    const [classes, setClasses] = useState([]);
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const data = await classServices.getclass();
                setClasses(data);
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        };

        fetchStudents();
    }, []);
  
    const columnsData = useMemo(() => [
        { Header: 'Niveau', accessor: 'level' },
        { Header: 'Salle', accessor: 'room' },
        { Header: 'Formation ID', accessor: 'formationId' },
        { Header: 'Date de création', accessor: 'dateCreated' },
    ], []);
    const tableData = useMemo(() => classes.map(cls => ({
        level: cls.level,
        room: cls.room,
        formationId: cls.formationId,
        dateCreated: new Date(cls.dateCreated).toLocaleDateString(),
      
    })), [classes]);
    const handleDelete = async (classId) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer cette classe?')) {
            try {
                await classServices.deleteClass(classId);
                setClasses(classes.filter(cls => cls._id !== classId));
                alert('Classe supprimée avec succès');
            } catch (error) {
                console.error('Error deleting class:', error);
                alert('Erreur lors de la suppression de la classe');
            }
        }
    };
    return ( 
        <div>
        <div className="flex justify-between items-center mb-4 mt-20">
            <h1 className="text-2xl font-bold"> Les classes</h1>
            <button
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                onClick={() => navigate('/admin/Classes/Ajouter')}
            >
                Ajouter class
            </button>
        </div>
        <ColumnsTable columnsData={columnsData} tableData={tableData} />
    </div>
    
);
}
 
export default ClassesList;



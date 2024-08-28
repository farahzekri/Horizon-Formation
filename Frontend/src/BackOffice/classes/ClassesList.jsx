
import { useEffect, useState,useMemo } from "react";
import { useNavigate} from "react-router-dom";
import classServices from "services/classService";
import CheckTable from "../admin/tables/components/CheckTable";
import formationService from '../../services/formationServices';
import ConfirmationModal from "components/Modal/confirmationModel";

const ClassesList = () => {
    const navigate = useNavigate();
    const [classes, setClasses] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
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
    const [formations, setFormations] = useState([]);
    useEffect(() => {
        const fetchFormations = async () => {
            try {
                const data = await formationService.getAllFormations();
                setFormations(data);
            } catch (error) {
                console.error('Error fetching formations:', error);
            }
        };

        fetchFormations();
    }, []);
    const getFormationNameById = (formationId) => {
        const formation = formations.find(f => f._id === formationId);
        return formation ? formation.name : 'Unknown Formation';
    };
    
    const columnsData =[
        {
             Header: 'Niveau', 
             accessor: 'level' 
        },
        { 
            Header: 'Salle', 
            accessor: 'room'
        },
        { 
            Header: 'Formations', 
            accessor: (row) => getFormationNameById(row.formationId),
         },
        { 
            Header: 'Date de Creation',
            accessor: 'dateCreated' 
        },
        {
            Header: 'Action',
            accessor: 'action',
          },
          {
            Header: 'Emploi',
            accessor: 'emploi',
          },
    ];
    
    const [selectedClasses, setSelectedClasses] = useState([]);
    const handleCheckboxChange = (classId) => {
        setSelectedClasses(prevSelected =>
            prevSelected.includes(classId)
                ? prevSelected.filter(id => id !== classId)
                : [...prevSelected, classId]
        );
    };
    const handleDeleteSelected = () => {
        setModalMessage(`Êtes-vous sûr de vouloir supprimer les ${selectedClasses.length} classes sélectionnées?`);
        setIsModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        try {
            await Promise.all(selectedClasses.map(classId => classServices.deleteClass(classId)));
            setClasses(classes.filter(cls => !selectedClasses.includes(cls._id)));
            setSelectedClasses([]);
        } catch (error) {
            console.error('Error deleting classes:', error);
            alert('Erreur lors de la suppression des classes');
        } finally {
            setIsModalOpen(false);
        }
    };
    const handleAjouterClick = () => {
        navigate('/admin/Classes/Ajouter')
    };
    const handleDetailClick = (id) => {
        navigate(`/admin/Classes/Detail/${id}`);
      };
      const handleEmploi = (id) => {
        navigate(`/admin/Classes/Emploi/${id}`);
      };  
    return ( 
        <>
        <div>
        <div className="flex justify-between items-center mb-4 mt-20">
            <h1 className="text-2xl font-bold"> Les classes</h1>
        </div>
        <CheckTable
                tableName="Classes"
                columnsData={columnsData}
                tableData={classes}
                handleCheckboxChange={handleCheckboxChange}
                onAjouterClick={handleAjouterClick}
                handleDeleteSelected={handleDeleteSelected}
                selectedFormations={selectedClasses}
                handleDetailClick={handleDetailClick}
                handleEmploi={handleEmploi}
            />
            
    </div>
    {isModalOpen && (
                <ConfirmationModal
                    message={modalMessage}
                    onClose={() => setIsModalOpen(false)}
                    onConfirm={handleConfirmDelete}
                    confirmLabel="Delete"
                    confirmButtonClass="bg-red-500"
                />
            )}
    </>
);
}
 
export default ClassesList;



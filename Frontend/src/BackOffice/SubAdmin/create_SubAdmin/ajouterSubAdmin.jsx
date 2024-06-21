import React from "react";
import { useNavigate } from "react-router-dom";

const AjouterSub = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/admin/AjouterSub/CreateSubAdmin");
    };

    return (
        <div>
            <button onClick={handleClick}>Ajouter</button>
        </div>
    );
};

export default AjouterSub;

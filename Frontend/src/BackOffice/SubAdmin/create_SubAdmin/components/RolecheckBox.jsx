import React, { useState } from 'react';
import Checkbox from "components/checkbox"; // Importez le composant Checkbox approprié
import Card from "components/card"; // Importez le composant Card ou utilisez un autre composant pour la mise en page

export const RoleCheckbox = ({ role, isChecked, setIsChecked, actions, setActions }) => {
  // Gère le clic sur le checkbox principal (Student ou Teacher)
  const handleRoleChange = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    // Met à jour tous les sous-checkbox selon l'état du checkbox principal
    setActions({
      add: newCheckedState,
      edit: newCheckedState,
      delete: newCheckedState,
    });
  };

  // Gère le clic sur les sous-checkbox (Ajouter, Modifier, Supprimer)
  const handleActionChange = (action, newValue) => {
    const newActions = { ...actions, [action]: newValue };
    setActions(newActions);
    // Si un sous-checkbox est décoché, décoche également le checkbox principal
    if (!newValue) {
      setIsChecked(false);
    } else {
      // Vérifie si tous les sous-checkbox sont cochés pour cocher le checkbox principal
      const allChecked = Object.values(newActions).every((value) => value);
      setIsChecked(allChecked);
    }
  };

  return (
    <Card className="my-4 p-4  ml-4 border rounded-lg shadow-md bg-white dark:bg-gray-800">
      <div className="flex items-center mb-4">
        <Checkbox
          name={role.toLowerCase()}
          color="gray"
          className="h-[25px] w-[25px] mr-2"
          checked={isChecked}
          onChange={handleRoleChange}
        />
        <span>{role}</span>
      </div>
      <div className="ml-8 mt-2">
        <div className="flex items-center">
          <Checkbox
            name={`add-${role.toLowerCase()}`}
            color="gray"
            className="h-[20px] w-[20px] mr-2"
            checked={actions.add}
            onChange={(e) => handleActionChange('add', e.target.checked)}
          />
          <span>Ajouter</span>
        </div>
        <div className="flex items-center mt-2">
          <Checkbox
            name={`edit-${role.toLowerCase()}`}
            color="gray"
            className="h-[20px] w-[20px] mr-2"
            checked={actions.edit}
            onChange={(e) => handleActionChange('edit', e.target.checked)}
          />
          <span>Modifier</span>
        </div>
        <div className="flex items-center mt-2">
          <Checkbox
            name={`delete-${role.toLowerCase()}`}
            color="gray"
            className="h-[20px] w-[20px] mr-2"
            checked={actions.delete}
            onChange={(e) => handleActionChange('delete', e.target.checked)}
          />
          <span>Supprimer</span>
        </div>
      </div>
    </Card>
  );
};
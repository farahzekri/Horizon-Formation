export const validateField = (name, value, password) => {
    switch (name) {
        case 'username':
            if (!value.trim()) {
                return 'Le nom d\'utilisateur est requis.';
            }
            return '';

        case 'email':
            if (!value.trim()) {
                return 'L\'adresse email est requise.';
            }
            if (!/\S+@\S+\.\S+/.test(value)) {
                return 'L\'adresse email n\'est pas valide.';
            }
            return '';

        case 'newPassword':
            if (!value.trim()) {
                return 'Le neveau mot de passe est requis.';
            }
            if (value.length < 6) {
                return 'Le mot de passe doit contenir au moins 6 caractères.';
            }
            if (!/[A-Z]/.test(value)) {
                return 'Le mot de passe doit contenir au moins une lettre majuscule.';
            }
            if (!/[0-9]/.test(value)) {
                return 'Le mot de passe doit contenir au moins un chiffre.';
            }
            return '';

        case 'oldPassword':
            if (!value.trim()) {
                return 'Le mot de passe ancien est requise.';
            }
            // if (value !== password) {
            //     return 'Les mots de passe ne correspondent pas.';
            // }
            return '';

        case 'firstName':
            if (!value) {
                return 'Le prénom est requis.';
            }
            if (value.length < 2) {
                return 'Le prénom doit contenir au moins 2 caractères.';
            }
            return '';

        case 'lastName':
            if (!value) {
                return 'Le nom est requis.';
            }
            if (value.length < 2) {
                return 'Le nom doit contenir au moins 2 caractères.';
            }
            return '';

        case 'city':
            if (!value) {
                return 'La ville est requise.';
            }
            return '';

        case 'state':
            if (!value) {
                return 'L\'état est requis.';
            }
            return '';

        case 'zip':
            const zipRegex = /^\d{5}$/; // Code postal à 5 chiffres
            if (!value) {
                return 'Le code postal est requis.';
            }
            if (!zipRegex.test(value)) {
                return 'Le code postal doit contenir 5 chiffres.';
            }
            return '';

        case 'gender':
            if (!value) {
                return 'Le genre est requis.';
            }
            return '';

        case 'dob':
            if (!value) {
                return 'La date de naissance est requise.';
            }
            const dobDate = new Date(value);
            const today = new Date();
            if (dobDate >= today) {
                return 'La date de naissance doit être antérieure à aujourd\'hui.';
            }
            return '';

        default:
            return '';
    }
};

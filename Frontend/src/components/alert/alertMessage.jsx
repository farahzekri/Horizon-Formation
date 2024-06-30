import React from "react";
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    CloseButton,
    useDisclosure,
} from "@chakra-ui/react";

const AlertMessage = ({ status, variant, description, onClose }) => {
    return (
        <Alert status={status} variant={variant} width="full" alignItems="center">
            <AlertIcon />
            <AlertDescription>{description}</AlertDescription>
            <CloseButton
                position="absolute"
                right="8px"
                top="8px"
                onClick={onClose}
            />
        </Alert>
    );
};

export default AlertMessage;

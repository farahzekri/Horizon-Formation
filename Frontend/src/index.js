import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

import App from "./App";
import {ChakraProvider} from "@chakra-ui/react";
import ToastProvider from "./providers/ToastProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <ChakraProvider>
        <BrowserRouter>
            <ToastProvider>
                <App />
            </ToastProvider>
        </BrowserRouter>
    </ChakraProvider>
);

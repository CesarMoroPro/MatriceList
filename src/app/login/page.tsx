import { Metadata } from "next";
import LoginForm from "../ui/login-form";

export const metadata: Metadata = {
    title: 'Login',
}

export default function LoginPage() {
    return (
        <>
            <h1>Page de connexion</h1>
            {/* Ci-dessous, lors de l'utilisation du component LoginForm, le navigateur provoque une erreur de "loader" :
                Module parse failed: Unexpected token (1:0)
                You may need an appropriate loader to handle this file type,
                currently no loaders are configured to process this file.
                See https://webpack.js.org/concepts#loaders */}
            {/* <LoginForm/> */}
        </>
    )
}
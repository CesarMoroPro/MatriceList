import { Metadata } from "next";
import LoginForm from "../ui/login-form";

export const metadata: Metadata = {
    title: 'Login',
}

export default function LoginPage() {
    return (
        <>
            <h1>Page de connexion</h1>
            <LoginForm/>
        </>
    )
}
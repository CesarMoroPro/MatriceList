import { Metadata } from "next";
import LoginForm from "../ui/login-form";

export const metadata: Metadata = {
    title: 'Login',
}

export default function LoginPage() {
    return (
        <>
            <LoginForm/>
        </>
    )
}

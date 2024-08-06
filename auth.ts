import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
/* Test pour fix déploiement failed */
import { z } from 'zod';
import { sql } from "@vercel/postgres";
import { User } from "@/app/lib/definitions";
import bcrypt from 'bcrypt';

async function getUser(email: string): Promise<User | undefined> {
    try {
        const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
        //console.log(user);
        return user.rows[0];
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
} 

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    /* providers = tableau contenant les différents fournisseurs d'authenfication */
    providers: [
        /* Fonction Credentials() = fonction native de NextAuth pour configurer un fournisseur d'authentification */
        Credentials({
            /* Fonction authorize() = native de NextAuth.
            Elle prend forcément un argument qui est objet contenant les données fournies par l'utilisateur.
            Ce paramètre doit forcément s'appeler `credentials` en minuscules pour être reconnu par NextAuth */
            async authorize(credentials, error) {
                /* Ici, on parse les cendentials avec Zod.
                -> .object() : crée un schéma de validation Zod pour un objet contenant les deux propriétés email et password ;
                -> .string().email() : définit que la propriété `email` doit être une string, qui doit être valide en tant qu'adresse email ;
                -> .string().min() : définit que la propriété `password` doit être une string d'au moins 6 caractères ;
                -> .safeParse(credentials) : utilise le schéma définit par .objet({...}).string()... pour analyser et valider l'objet `credentials`.
                -> `credentials` est l'objet reçu contenant l'email et le mot de passe soumis par l'utilisateur.
                -> `safeParse` renvoie un objet avec une propriété `success` :
                        --> success est à true si les données sont valides et accessibles.
                        --> success est à false en cas d'erreurs de validation. Ces erreurs de validation sont disponibles via la propriété `error`. 
                */

               const parsedCredentials = z
                .object({
                    email: z.string().email("Invalid email"), 
                    password: z.string().min(6)
                })
                .safeParse(credentials);

                if(parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;
                    const user = await getUser(email);
                    if (!user) return null;
                    const passwordMatch = await bcrypt.compare(password, user.password);

                    if(passwordMatch) return user;
                }

                return null;
            },
        })
    ],
}); 
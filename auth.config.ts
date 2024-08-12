import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        /* La propriété signIn indique à NextAuth.js quelle page doit être utilisée pour la phase d'authentification.
        Lorsque l'utilisateur doit se connecter comme lorsqu'il tente d'accéder à une page protégée, NextAuth.js redirigera l'utilisateur vers la page '/login'
        */
        signIn: '/login',
    },
    debug: true,
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            /* Boolean qui récupère le pathname de l'URL contenu dans la requête (Rappel : pathname = morceau contenu dans URL entre https://nomsite.ext et les paramètres).
            Si le pathname commence par '/dashboard', on veut forcément accéder au tableau de bord d'un user */
            const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');

            /* Donc si le user tente d'accéder à une page dont l'url commence par '/dashboard' */
            if (isOnDashboard) {
                /* alors si l'utilisateur est connecté, return true et la redirection a lieu.
                Cette redirection doit être gérée par le middleware de préférence */
                if (isLoggedIn) return true;
                /* S'il n'est pas connecté, il est redirigé automatiquement sur login */
                return false;
            }
            /* Si le user ne tente pas d'accéder à une page dont le pathname commence par '/dashboard',
            et si l'utilisateur est connecté */
            else if (isLoggedIn) {
                /* Il peut être redirigé vers l'url contenu dans la requête */
                return Response.redirect(new URL('/dashboard', nextUrl));
            }
            return true;
        },
    },
    providers: [], // Add providers with an empty arraw for now
} satisfies NextAuthConfig;
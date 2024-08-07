/* Les Server Actions seront potentiellement utilisées dans des fichiers de rendu côté client. 
Mais les Server Actions sont obligatoirement exécutées côté Serveur.
Il est donc essentiel d'ajouter la directive 'use server' afin d'éviter le bug "loaders de webpack" */
'use server';

import { signIn } from '@/../auth';
import { AuthError } from 'next-auth';

export async function authenticate(
    //^ ÉTAPES 1 ET 2 : dans le fichier 'ui/login-form.tsx'
    //^ ÉTAPE 3 : 'authenticate' contient un argument formData, objet contenant les données du formulaire soumis
    /* Dans cette étape, c'est la librairie next-auth qui va traiter les données pour s'identifier. Voir la doc pour connaître le traitement exact réalisé par 'signIn' et comprendre les 'credentials' */
    /* Le paramètre 'prevState' est utilisé pour représenter l'état précédent qui peut être nécessaire pour la logique d'authentificatino. Ici, 'prevState' n'est pas utilisé dans le code. CEPENDANT, cette fonction étant mise à disposition par next-auth, il s'agit du premier paramètre. Et formData est le second paramètre. Ainsi, on est obligé de mettre le paramètre 1 'prevState' pour pouvoir ensuite mettre le paramètre 2 'formData'. */
    prevState: string | undefined,
    formData: FormData,
) {
    console.log(formData);
    try {
        /* Avec la fonction signIn, je passe l'objet formData dans à NextAuth > dans les `credentials` (> attendus en paramètre de la fonction `authorize` > dans le provider `Credentials`) */
        console.log("Dans le try")
        await signIn('credentials', formData);
    } catch (error) {
        console.log('On entre dans le CATCH');
        console.log(error);
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin': {
                    console.log(`INVALID CREDENDIALS switch CredentialsSignIn`);
                    return 'Invalid credentials.';
                }
                default: {
                    console.log(`WRONG switch default`);
                    return 'Something went wrong.';
                }
            }
        }
        throw error;
    }
}
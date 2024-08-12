/* Les Server Actions seront potentiellement utilisées dans des fichiers de rendu côté client. 
Mais les Server Actions sont obligatoirement exécutées côté Serveur.
Il est donc essentiel d'ajouter la directive 'use server' afin d'éviter le bug "loaders de webpack" */
'use server';

import { signIn } from '@/../auth';
import { log } from 'console';
import { AuthError } from 'next-auth';
import { object } from 'zod';

export async function authenticate(
    //^ ÉTAPES 1 ET 2 : dans le fichier 'ui/login-form.tsx'
    //^ ÉTAPE 3 : 'authenticate' contient un argument formData, objet contenant les données du formulaire soumis
    /* Dans cette étape, c'est la librairie next-auth qui va traiter les données pour s'identifier. Voir la doc pour connaître le traitement exact réalisé par 'signIn' et comprendre les 'credentials' */
    /* Le paramètre 'prevState' est utilisé pour représenter l'état précédent qui peut être nécessaire pour la logique d'authentificatino. Ici, 'prevState' n'est pas utilisé dans le code. CEPENDANT, cette fonction étant mise à disposition par next-auth, il s'agit du premier paramètre. Et formData est le second paramètre. Ainsi, on est obligé de mettre le paramètre 1 'prevState' pour pouvoir ensuite mettre le paramètre 2 'formData'. */
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        /* Avec la fonction signIn, je passe l'objet formData dans à NextAuth > dans les `credentials` (> attendus en paramètre de la fonction `authorize` > dans le provider `Credentials`) */

        //* ATTENTION !
        /**
         * console.log(formData) renvoie l'objet correctement.
         * console.log(typeof formData) renvoie le type object.
         * > Mais console.log(Object.keys(formData)) et console.log(Object.values(formData)) renvoient des tableaux vides.
         * 
         * Pourquoi renvoyer des tableaux vides alors que l'objet contient bien des données ? :
         * formData est de type :FormData. Ce n'est pas un objet un objet JS ordinaire mais une instance de FormData (interface).
         * Or, les clés et valeurs d'un type FormData ne peuvent pas être accessibles via Object.keys et Object.values.
         * 
         * Pour accéder aux données d'un type FormData, il faut utiliser les méthodes entries(), get(), ou forEach().
         * 
         * > Sans cette solution, lors du déclenchement de signIn, une erreur peut survenir :
         * Error: Cannot convert a Symbol value to a string
         */

        /**
         * * RÉSOLUTION
         *      - Je crée un nouvel objet vide sans type :FormData, qui servira à extraire les données de l'objet formData de type :FormData, pour qu'elles soient exploitables.
         *      - Je boucle sur les données de formData, et à chaque tour je stocke la valeur dans l'objet formDataEntries.
         */

        //^ LOG 1 : OK
        console.log("\n LOG 1/ : Dans le try");       

        const formDataEntries: { [key: string]: string | File } = {};
        //^ LOG 2.A : OK
        console.log("\n LOG 2.A/ GO forEach")
        formData.forEach((value, key) => {
            //^ LOG 2.B : OK
            console.log("- LOG 2.B/ forEach : ", key + " ===> " + value);
            //console.log(formData.get(key));
            if (typeof value === 'string') {
                formDataEntries[key] = value;
            } else if (value instanceof File) {
                formDataEntries[key] = value;
            }
        });

        //^ LOG 3 : OK
        console.log("\n LOG 3/ : après le forEach : ", formDataEntries)
        
        // const email = formData.get('email');
        // const password = formData.get('password');

        //^ LOG 4 : OK
        console.log("\n LOG 4/ : SignIn Params:", {
            formDataEntries,
            callbackUrl: '/dashboard/user',
        });
        
        //^ LOG 5 : NOK !!! Le callback renvoie '/login' d'après les erreurs dans LOG 6 et suivants
        // Sortie erreur : [auth][warn][debug-enabled] Read more: https://warnings.authjs.dev#debug-enabled
        console.log("\n 5/ GO signIn");
        await signIn('credentials', {
            ...formDataEntries,
            //* `redirect: false` permet d'empêcher la redirection automatique vers '/login' définie dans authConfig.pages.signIn.  
            redirect: false,
            callbackUrl: '/dashboard/user',
        });
    } catch (error) {
        //^ LOG 6 : OK
        console.log('\n LOG 5/ On entre dans le CATCH');
        //^ LOG 7
        console.log();
        console.log(error);
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin': {
                    console.log(`\n INVALID CREDENDIALS switch CredentialsSignIn`);
                    return 'Invalid credentials.';
                }
                default: {
                    console.log(`\n WRONG switch default`);
                    return 'Something went wrong.';
                }
            }
        }
        throw error;
    }
}
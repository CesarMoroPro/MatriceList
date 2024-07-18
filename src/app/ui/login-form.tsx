'use client';

import { useFormState } from "react-dom";
import { authenticate } from '@/app/lib/actions';
import { Button } from "./button";

export default function LoginForm() {
    //^ ÉTAPE 2 : 'formAction' est déclenchée et appelle 'authenticate', avec un argument automatique formData qui contient toutes les données du formulaire
    /*
        - formAction va déclencher la fonction 'authenticate' (Server Action dans le fichier /lib/actions.ts).
        - errorMessage, qui vaut 'null' par défaut, contiendra un message d'erreur si une erreur se produit pendant l'authentification. Mais errorMessage vaut bien 'null' par défaut !
        - undefined : argument optionnel pour la configuration ou l'état initial. Dans le cas d'un état initial (souvent ce cas lors de l'utilisation de ce hook), 'undefined' peut signifier qu'il n'y a pas d'état initial spécifique à fournir et le hook utilisera une valeur par défaut prédéfinie.
    */
    const [errorMessage, formAction] = useFormState(
        authenticate, 
        undefined
    );

    return (
        /* formAction contiendra nativement l'objet formData contenant les données du formulaire.
        À l'envoi du formulaire, on déclenche formAction, donc le setter du formState
        */
       //^ ÉTAPE 1 : À la soumission du formulaire, on déclenche formAction()
        <form action={formAction}>
            <div>
                <h1>Merci de vous identifier pour continuer</h1>
                <div className="">
                    <div>
                        <label
                        className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                        htmlFor="email"
                        >
                        Email
                        </label>
                        <div className="relative">
                            <input
                                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                id="email"
                                type="email"
                                name="email"
                                placeholder="Entrez votre adresse mail"
                                required
                            />
                        </div>
                    </div>
                    <div className="mt-4">
                        <label
                        className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                        htmlFor="password"
                        >
                        Mot de passe
                        </label>
                        <div className="relative">
                            <input
                                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                id="password"
                                type="password"
                                name="password"
                                placeholder="Saisissez votre mot de passe"
                                required
                                minLength={6}
                            />
                        </div>
                    </div>
                </div>
                <Button>
                    Connexion
                </Button>
                
                <div>
                    {errorMessage && (
                        <>
                            <p>{errorMessage}</p>
                        </>
                    )}
                </div>
            </div>

        </form>
    )
}
'use client';

import { useFormState } from "react-dom";
//import { signIn } from "../lib/actions";

// export default function LoginForm() {
//     const [errorMessage, formAction] = useFormState();

//     return (
//         /* formAction contiendra nativement l'objet formData contenant les données du formulaire.
//         À l'envoi du formulaire, on déclenche formAction, donc le setter du formState
//         */
//         <form action={formAction}>
//             <div>
//                 <h1>Merci de vous identifier pour continuer</h1>
//                 <div className="">
//                     <div>
//                         <label
//                         className="mb-3 mt-5 block text-xs font-medium text-gray-900"
//                         htmlFor="email"
//                         >
//                         Email
//                         </label>
//                         <div className="relative">
//                             <input
//                                 className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
//                                 id="email"
//                                 type="email"
//                                 name="email"
//                                 placeholder="Entrez votre adresse mail"
//                                 required
//                             />
//                         </div>
//                     </div>
//                     <div className="mt-4">
//                         <label
//                         className="mb-3 mt-5 block text-xs font-medium text-gray-900"
//                         htmlFor="password"
//                         >
//                         Mot de passe
//                         </label>
//                         <div className="relative">
//                             <input
//                                 className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
//                                 id="password"
//                                 type="password"
//                                 name="password"
//                                 placeholder="Saisissez votre mot de passe"
//                                 required
//                                 minLength={6}
//                             />
//                         </div>
//                     </div>
//                 </div>
//             </div>

//         </form>
//     )
// }
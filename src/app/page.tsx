import Image from "next/image";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

export default function Home() {
  return (
    <main className="flex h-full flex-col justify-between  p-6">
        <div className="h-fit bg-sky-500 mb-36 rounded-md">
            <div>
                <h1 className="text-white uppercase p-4">Success List</h1>
            </div>
        </div>

        <section className="leading-relaxed flex items-center">
            <div className="bg-slate-100 w-1/3 p-12 rounded-md rounded-bl-none">
                <p className="font-bold">
                    Bienvenue sur <span className="text-sky-500">Success List</span>
                </p>
                <p className="mt-6">
                    <span className="custom-bg-tag-blue-200">Priorisez</span> vos tâches afin de gagner en performances et atteindre plus facilement vos <span className="custom-bg-tag-blue-200">objectifs</span>.
                </p>
                <p className="mt-3">
                    Success List est la solution To Do List simple et sobre, basée sur la matrice d'<span className="custom-bg-tag-blue-200">Eisenhower</span>. 
                </p>
                    
                <form className="mt-6" action="">
                    <button className="bg-sky-500 text-white flex items-center p-2 hover:bg-sky-300 hover:text-sky-600">
                        Se connecter &nbsp; <ArrowRightIcon className="h-5"/>
                    </button>
                </form>
            </div>
        </section>

    </main>
  );
}

import { signOut } from "@/../auth";

export default function SideNav() {
    
    return (
        <>
            <div>
                <form action={async () => {
                    'use server';
                    await signOut();
                }}
                >
                    <button>
                        Déconnexion
                    </button>
                </form>
            </div>
        </>
    )
}
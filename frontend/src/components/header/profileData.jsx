'use client'

import { useEffect, useState } from "react";
import { getCurrentUser } from "src/api/auth";

export default function ProfileData () {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect( () => {
    const fetchUserProfile = async () => {
      try {
        const userData = await getCurrentUser();
    
        if (userData) {
          setUser(userData);
        }
      } catch (err) {
        console.error("Error completo:", err);
        setError(err.message || "Error al cargar el perfil");
      } finally {
        setLoading(false);
      }
    }

    fetchUserProfile();
  }, []);

  if (loading) {
    return <div className="p-4 text-center">Cargando perfil...</div>;
  }

  return (
    //<div className={`${user? "flex items-center justify-center gap-5" : "hidden"}`}>
    <div className="flex items-center justify-center gap-5 text-tuturnera-dark-green">
      <div className="flex flex-col items-end space-y-0">  {/* Elimina espacio entre hijos */}
        <p className="text-tuturnera-blue leading-[1.1] font-semibold">{user.name} {user.surname}</p>
        <p className="text-xs leading-[1.1]">{user.email}</p>
      </div>

      <div>
        {user?.imgProfileURL && (
          <img src={user.imgProfileURL} className="h-full rounded-full drop-shadow-md"></img>
        )}

        {!user?.imgProfileURL && (
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
            <path fill="currentColor" d="M16 8a5 5 0 1 0 5 5a5 5 0 0 0-5-5m0 8a3 3 0 1 1 3-3a3.003 3.003 0 0 1-3 3" />
            <path fill="currentColor" d="M16 2a14 14 0 1 0 14 14A14.016 14.016 0 0 0 16 2m-6 24.377V25a3.003 3.003 0 0 1 3-3h6a3.003 3.003 0 0 1 3 3v1.377a11.9 11.9 0 0 1-12 0m13.993-1.451A5 5 0 0 0 19 20h-6a5 5 0 0 0-4.992 4.926a12 12 0 1 1 15.985 0" />
        </svg>
        )}
      </div>
    </div>
  );
}
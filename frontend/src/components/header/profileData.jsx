'use client'

import { useEffect, useState } from "react";
import { getCurrentUser, logout } from "src/api/auth";

export default function ProfileData () {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAccountOptions, setShowAccountOptions] = useState(false); 
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

  const toggleShowOptions = () => {
    showAccountOptions ? setShowAccountOptions(false) : setShowAccountOptions(true) ;
  }

  const handleLogout = async () => {
    try {
      const response = await logout();

      if (response.message) {
        window.location.href = "/";
      }
    } catch {
      console.error(response.data.error);
    }
  }

  if (loading) {
    return <div className="p-4 text-center">Cargando perfil...</div>;
  }

  return (
    <>
      <div className={`${user? "flex items-center justify-center gap-3 text-tuturnera-dark-green" : "hidden"}`}>
        <div className="flex flex-col items-end space-y-0">  {/* Elimina espacio entre hijos */}
          <p className="text-tuturnera-blue leading-[1.1] font-semibold">{user.name} {user.surname}</p>
          <p className="text-xs leading-[1.1]">{user.email}</p>
        </div>

        <div>
          <button type="button" onClick={toggleShowOptions} className="cursor-pointer">
            {user?.imgProfileURL && (
              <img src={user.imgProfileURL} className="h-full rounded-full drop-shadow-md"></img>
            )}

            {!user?.imgProfileURL && (
              <div className="group text-tuturnera-dark-green pointer">
                <svg xmlns="http://www.w3.org/2000/svg" className="inline opacity-100 group-hover:opacity-0 group-hover:hidden transition-all duration-300 ease-in-out" width="32" height="32" viewBox="0 0 32 32">
                  <path fill="currentColor" d="M16 8a5 5 0 1 0 5 5a5 5 0 0 0-5-5m0 8a3 3 0 1 1 3-3a3.003 3.003 0 0 1-3 3" />
                  <path fill="currentColor" d="M16 2a14 14 0 1 0 14 14A14.016 14.016 0 0 0 16 2m-6 24.377V25a3.003 3.003 0 0 1 3-3h6a3.003 3.003 0 0 1 3 3v1.377a11.9 11.9 0 0 1-12 0m13.993-1.451A5 5 0 0 0 19 20h-6a5 5 0 0 0-4.992 4.926a12 12 0 1 1 15.985 0" />
                </svg>
                
                <svg xmlns="http://www.w3.org/2000/svg" className="hidden opacity-0 group-hover:opacity-100 group-hover:inline group-hover:drop-shadow-md transition-all duration-300 ease-in-out" width="32" height="32" viewBox="0 0 32 32">
                  <path fill="none" d="M8.007 24.93A4.996 4.996 0 0 1 13 20h6a4.996 4.996 0 0 1 4.993 4.93a11.94 11.94 0 0 1-15.986 0M20.5 12.5A4.5 4.5 0 1 1 16 8a4.5 4.5 0 0 1 4.5 4.5" />
                  <path fill="currentColor" d="M26.749 24.93A13.99 13.99 0 1 0 2 16a13.9 13.9 0 0 0 3.251 8.93l-.02.017c.07.084.15.156.222.239c.09.103.187.2.28.3q.418.457.87.87q.14.124.28.242q.48.415.99.782c.044.03.084.069.128.1v-.012a13.9 13.9 0 0 0 16 0v.012c.044-.031.083-.07.128-.1q.51-.368.99-.782q.14-.119.28-.242q.451-.413.87-.87c.093-.1.189-.197.28-.3c.071-.083.152-.155.222-.24ZM16 8a4.5 4.5 0 1 1-4.5 4.5A4.5 4.5 0 0 1 16 8M8.007 24.93A4.996 4.996 0 0 1 13 20h6a4.996 4.996 0 0 1 4.993 4.93a11.94 11.94 0 0 1-15.986 0" />
                </svg>
              </div>
            )}
          </button>
        </div>
      </div>

      <div className={`${ !showAccountOptions ? "hidden" : "absolute z-100 top-14 w-74 right-0 bg-tuturnera-white shadow-md" }`}>
        <nav>
          <ul className="w-full flex flex-col justify-center items-center space-y-2 py-2">
            <li><a href="/account">Account</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/appointments">Appointments</a></li>
          </ul>
        </nav>

        <div className="w-full">
          <button type="button" onClick={handleLogout} className="cursor-pointer w-full py-2 flex justify-center items-center gap-2 bg-tuturnera-dark-green text-tuturnera-white"  >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
              <path stroke-with="0.5" stroke="currentColor" fill="currentColor" d="M3 21V3h9v2H5v14h7v2zm13-4l-1.375-1.45l2.55-2.55H9v-2h8.175l-2.55-2.55L16 7l5 5z" />
            </svg>
            Log out
          </button>
        </div>
      </div>
    </>
  );
}
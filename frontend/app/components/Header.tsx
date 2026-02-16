"use client";

import axios from "../../lib/axios";
import { useAppContext } from "../context/AppContext";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
export default function Header() {
    const { executing, setExecuting } = useAppContext();
    const { currentPage, setCurrentPage } = useAppContext();
    const pathname = String(usePathname() || ""); 
    const [userName, setUserName] = useState<string | null>(null);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    useEffect(() => {
        axios.get('/api/user')
            .then(res => {
                setUserName(res.data.name); 
            })
            .catch(() => {
                setUserName(null); 
            });
    }, []);

    const handleLogout = async () => {
        if (isLoggingOut) return;
        setIsLoggingOut(true);

        localStorage.clear();
        sessionStorage.clear();

        try {
            await axios.get("/sanctum/csrf-cookie");

            const xsrfToken = document.cookie
                .split('; ')
                .find(row => row.startsWith('XSRF-TOKEN='))
                ?.split('=')[1];

            await axios.post('/logout', {
            }, {
                headers: {
                    'X-XSRF-TOKEN': decodeURIComponent(xsrfToken || ''), 
                    'Accept': 'application/json',
                }
            });
            window.location.href = "/login";
        } catch (error) {
            console.error("Logout failed.:", error);
            window.location.href = "/login";
        }finally{
            setIsLoggingOut(false)
        }
    };
    console.log("currentPage:", currentPage);
    return (
        <header className="bg-white border-b border-gray-200 pt-0 pb-2 pl-2 pr-2 shadow-sm mb-0">
            {userName && (
                <span className="text-[10px] text-zinc-400">Logged in as: {userName}</span>
            )}
            <div className="max-w-md mx-auto flex justify-between items-center">
                <div className="flex items-center gap-0">
                    <img
                        src="/shopping-cart.webp"
                        alt="Basket"
                        className="w-10 h-10 object-contain"
                    />
                    <span className="text-[25px] scale-x-70 origin-left italic text-orange-600 font-bold text-lg">Shopping Reminder</span>
                </div>

                <div className="flex gap-2">
                    {currentPage === "login" && (
                        <button onClick={() => window.location.href = "/register"}>Register</button>
                    )}
                    {currentPage === "register" && (
                        <button onClick={() => window.location.href = "/login"}>Login</button>
                    )}
                    {["/", "toBuy", "shopping_log"].includes(currentPage) && (
                        <>
                            <button onClick={handleLogout}>{isLoggingOut? "Logging out...":"Logout"}</button>
                        </>)}
                </div>
            </div>
        </header>
    );
}

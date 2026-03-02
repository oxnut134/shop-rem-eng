"use client";

import axios from "../../lib/axios";
import i18n from "../../lib/i18n";
import { useAppContext } from "../context/AppContext";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
export default function Header() {
    const { executing, setExecuting } = useAppContext();
    const { currentPage, setCurrentPage } = useAppContext();
    const pathname = String(usePathname() || "");
    const [userName, setUserName] = useState<string | null>(null);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const { language } = useAppContext();
    const lang = i18n[language as keyof typeof i18n] || i18n.en;


    useEffect(() => {
        ["/", "toBuy", "shopping_log"].includes(currentPage) &&
            axios.get('/api/user')
                .then(res => {
                    setUserName(res.data.name);
                })

                .catch(() => {
                    setUserName(null);
                });
    }, [currentPage]);

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
        } finally {
            setIsLoggingOut(false)
        }
    };
    console.log("currentPage:", currentPage);
return (
    <header className="bg-white border-b border-gray-200 py-1 px-2 shadow-sm mb-0">
        {userName && (
            <div className="text-[10px] text-zinc-400 truncate">Logged in as: {userName}</div>
        )}
        {/* flex-nowrap で二段落ちを物理的に防止（Audit） */}
        <div className="max-w-md mx-auto flex justify-between items-center flex-nowrap gap-1">
            
            {/* ロゴとタイトルの Liaison：横幅が狭まっても 1秒で追従 */}
            <div className="flex items-center min-w-0">
                <img
                    src="/shopping-cart.webp"
                    alt="Basket"
                    className="w-8 h-8 md:w-10 md:h-10 object-contain flex-shrink-0"
                />
                {/* 文字サイズをスマホ向けに 1秒で Audit（text-base = 16px） */}
                <span className="text-base sm:text-[25px] scale-x-90 sm:scale-x-70 origin-left italic text-orange-600 font-bold whitespace-nowrap overflow-hidden">
                    Shopping Reminder
                </span>
            </div>

            {/* ボタン領域：flex-shrink-0 で押し潰されるのを 1秒で防止 */}
            <div className="flex gap-1 flex-shrink-0">
                {currentPage === "login" && (
                    <button className="text-xs py-1 px-2 " onClick={() => window.location.href = "/register"}>{lang.REGISTER}</button>
                )}
                {currentPage === "register" && (
                    <button className="text-xs py-1 px-2 " onClick={() => window.location.href = "/login"}>{lang.LOGIN}</button>
                )}
                {["/", "toBuy", "shopping_log"].includes(currentPage) && (
                    <button className="text-xs py-1 px-2 " onClick={handleLogout}>{isLoggingOut ? "..." : lang.LOGOUT}</button>
                )}
            </div>
        </div>
    </header>
);
    /*return (
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
                        <button onClick={() => window.location.href = "/register"}>{lang.REGISTER}</button>
                    )}
                    {currentPage === "register" && (
                        <button onClick={() => window.location.href = "/login"}>{lang.LOGIN}</button>
                    )}
                    {["/", "toBuy", "shopping_log"].includes(currentPage) && (
                        <>
                            <button onClick={handleLogout}>{isLoggingOut ? "Logging out..." : lang.LOGOUT}</button>
                        </>)}
                </div>
            </div>
        </header>
    );*/
}

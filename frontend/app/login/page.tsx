"use client";

import Header from "../components/Header";
import { useAppContext } from "../context/AppContext";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "../../lib/axios";
import i18n from "../../lib/i18n";
import { useForm } from "react-hook-form";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [executing, setExecuting] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();
    const { currentPage, setCurrentPage } = useAppContext();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();


    const { language } = useAppContext();
    const lang = i18n[language as keyof typeof i18n] || i18n.en;



    useEffect(() => {
        setCurrentPage("login");
    }, []);
    const handleLogin = async (data: any) => {
        if (executing) return;
        setExecuting(true);
        setError("");

        try {
            await axios.get("/sanctum/csrf-cookie");
            //await axios.get("http://web:80/sanctum/csrf-cookie");
            //await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/sanctum/csrf-cookie`);

            const xsrfToken = document.cookie
                .split('; ')
                .find(row => row.startsWith('XSRF-TOKEN='))
                ?.split('=')[1];

            const response = await axios.post('/login', {
                email: data.email,
                password: data.password,
            }, {
                headers: {
                    'X-XSRF-TOKEN': decodeURIComponent(xsrfToken || ''),
                    'Accept': 'application/json',
                }
            });

            if (response.status === 200 || response.status === 204) {
                console.log("通信成功。Cookieの定着を待機中...");

                // 0.5秒待ってから遷移（ブラウザにCookieを書き込む時間を与える）
                await new Promise(resolve => setTimeout(resolve, 500));

                window.location.href = "/toBuy";
            }
            //window.location.href = "/toBuy";
        } catch (err: any) {
            console.error("Login failed:", err);
            setError("Invalid emai address or password.");
        } finally {
            setExecuting(false);
        }
    };
    return (
        <>
            <div className="p-6 mt-6 max-w-md mx-auto bg-zinc-50 ">
                <Header />
                <div className="p-6 max-w-md mx-auto">
                    <h1 className="text-3xl font-bold mb-8 text-orange-600 text-center">{lang.LOGIN_PAGE_TITLE}</h1>
                    <form onSubmit={handleSubmit(handleLogin)} className="flex flex-col gap-y-12">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1"></label>
                            <input
                                {...register("email", {
                                    required: "Email is required.",
                                    pattern: { value: /^\S+@\S+$/i, message: "Invalid Email format." }
                                })}
                                type="email"
                                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-orange-500 outline-none"
                                placeholder={lang.EMAIL}
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{String(errors.email.message)}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1"></label>
                            <input
                                type="password"
                                {...register("password", {
                                    required: "Password is required.",
                                    minLength: { value: 8, message: "Password must be at least 8 characters." }
                                })}
                                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-orange-500 outline-none"
                                placeholder={lang.PASSWORD}
                            />
                            {errors.password && <p className="text-red-500 text-xs mt-1">{String(errors.password.message)}</p>}
                        </div>

                        {error && <p className="text-red-500 text-sm">{error}</p>}

                        <button
                            type="submit"
                            disabled={executing}
                            className={`w-full py-3 rounded-lg font-bold text-white transition-colors ${executing ? "bg-gray-400" : "bg-orange-500 hover:bg-orange-600"
                                }`}
                        >
                            {executing ? "Authenticating..." : lang.LOGIN}
                        </button>
                    </form>

                    <p className="mt-12 text-center text-gray-400 text-xs">
                        © 2026 Your Shopping System
                    </p>
                </div>
            </div>
        </>
    );
}

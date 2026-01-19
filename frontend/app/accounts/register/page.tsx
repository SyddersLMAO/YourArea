"use client";

import React, { useState } from "react";
import { login, register } from "../../services/auth";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState(null);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);

        try {
            const registerUser = await register(username, email, password);

            const data = await login(email, password);

            localStorage.setItem("access", data.access);
            localStorage.setItem("refresh", data.refresh);

            router.push("/");
        } catch (err: any) {
            setError(err.message);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            
            <button type="submit">Register</button>

            {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
    );
}
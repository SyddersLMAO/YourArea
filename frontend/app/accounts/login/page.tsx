"use client";

import { useState } from "react";
import { login } from "../../services/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        
        try {
            const data = await login(email, password);

            localStorage.setItem("access", data.access);
            localStorage.setItem("refresh", data.refresh);

            router.push("/");
        } catch (err) {
            setError("Login failed. Please check your credentials.");
        }

        return (
        <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {error && <p style={{ color: "red" }}>{error}</p>}
                <button>Login</button>
            </form>
        </div>
    );}
}
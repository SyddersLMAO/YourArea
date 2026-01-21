"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function useAuth() {
    const router = useRouter();
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const access = localStorage.getItem("access");
        const refresh = localStorage.getItem("refresh");

        if (!access && !refresh) {
            router.replace("/accounts/login");
            return;
        }

        setReady(true);
    }, [router]);

    return ready;
}
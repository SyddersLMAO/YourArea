"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { fetchWithAuth } from "./auth";
import { AuthError } from "../errors";

export function useAuthFetch() {
    const router = useRouter();

    return useCallback(
        async <T,>(url: string, options?: RequestInit): Promise<T> => {
            try {
                return await fetchWithAuth(url, options);
            } catch (err) {
                if (err instanceof AuthError) {
                    localStorage.clear();
                    router.replace("/accounts/login");
                    throw err;
                }
                throw err;
            }
        },
        [router]
    );
}
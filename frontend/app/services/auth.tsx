import { AuthError } from "../errors";

export async function fetchWithAuth(url: string, options: RequestInit = {}) {
    let access = localStorage.getItem("access");
    const refresh = localStorage.getItem("refresh");

    if (!access && !refresh) throw new Error("Not authenticated");

    const makeRequest = (token: string) => {
        return fetch(url, {
            ...options,
            headers: {
                ...options.headers,
                Authorization: `Bearer ${token}`,
                ...(options.body && !(options.body instanceof FormData)
                    ? { "Content-Type": "application/json" }
                    : {}),
            },
        });
    }

    let res: Response;

    if (access) {
        res = await makeRequest(access);
    } else {
        throw new Error("No access token");
    }

    if (!res || res.status === 401) {
      if (!refresh) {
        localStorage.clear();
        throw new AuthError();
      }

      const refreshRes = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refresh }),
      });

      if (!refreshRes.ok) {
          localStorage.clear();
          throw new AuthError();
      }

      const data: { access: string } = await refreshRes.json();
      access = data.access;
      localStorage.setItem("access", access);

      res = await makeRequest(access);
    }

    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Request failed: ${res.status} ${text}`);
    };

    return res.json();
}

export async function login(email: string, password: string) {
    const res = await fetch("http://127.0.0.1:8000/api/token/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    if (!res.ok) throw new Error("Login failed");

    const data = await res.json();

    localStorage.setItem("access", data.access);
    localStorage.setItem("refresh", data.refresh);

    return data;
}

export async function register(username: string, email: string, password: string) {
  const res = await fetchWithAuth("http://127.0.0.1:8000/api/register/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.detail || "Registration failed");

  return data;
}

export function logout() {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
}
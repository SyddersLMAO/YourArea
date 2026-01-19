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
  const res = await fetch("http://127.0.0.1:8000/api/register/", {
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
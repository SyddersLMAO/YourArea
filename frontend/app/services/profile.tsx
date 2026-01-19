export async function getProfile(username: string) {
  if (!username) throw new Error("Username is required");

  const res = await fetch(`http://127.0.0.1:8000/api/profile/${username}/`);
  if (!res.ok) return null;
  return res.json();
}

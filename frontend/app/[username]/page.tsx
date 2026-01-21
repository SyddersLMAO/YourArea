import { getProfile } from "../services/getProfile";

interface Props {
  params: { username: string };
}

export default async function UserProfilePage({ params }: Props) {
    const { username } = await params;

    if (!username) {
        return <p>Username not provided.</p>;
    }

    const profile = await getProfile(username);

    if (!profile) {
        return <p>User not found.</p>;
    }

    return (
        <div>
            <img src={`http://127.0.0.1:8000${profile.avatar}`} alt="Avatar" style={{ width: "100px", height: "100px", borderRadius: "50%" }} />
            <h1>{profile.username}</h1>
            <p>{profile.bio}</p>
        </div>
    )
}
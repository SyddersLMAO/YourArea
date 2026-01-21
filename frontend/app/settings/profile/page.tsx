"use client";

import React, { useState, useEffect } from "react";
import { getMyProfile, updateProfile } from "@/app/services/profile";
import { useAuth } from "@/app/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function EditProfilePage() {
    const authReady = useAuth();

    const router = useRouter();
    const [profile, setProfile] = useState<any>(null);
    const [bio, setBio] = useState("");
    const [avatar, setAvatar] = useState<File | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadProfile() {
            try {
                const data = await getMyProfile();
                setProfile(data);
                setBio(data.bio || "");
                setLoading(false);
            } catch (error) {
                console.error("Error fetching profile:", error);
                setLoading(false);
            }
        }

        loadProfile();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append("bio", bio);
            if (avatar) formData.append("avatar", avatar);

            await updateProfile(formData);
            setProfile((prev: any) => prev ? { ...prev, bio} : { bio });

            if (profile?.username) {
                router.push(`/${profile.username}`);
            } else {
                router.push("/");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Failed to update profile.");
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Bio:</label>
                <textarea value={bio} onChange={(e) => setBio(e.target.value)} />
            </div>

            <div>
                <label>Avatar:</label>
                <input type="file" onChange={(e) => {
                    if (e.target.files) setAvatar(e.target.files[0]);
                }} />
            </div>

            <button type="submit">Update Profile</button>
        </form>
    );
}


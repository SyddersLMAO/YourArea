"use client";

import { fetchWithAuth } from "./auth";

export async function getMyProfile() {
  const data = await fetchWithAuth("http://127.0.0.1:8000/api/currentprofile/");

  if (!data) throw new Error("Failed to fetch profile");
  return data;
}

export async function updateProfile(formData: FormData) {
  const data = await fetchWithAuth(`http://127.0.0.1:8000/api/currentprofile/`, {
    method: "PUT",
    body: formData,
  });
}
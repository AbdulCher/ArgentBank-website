import { PATH_API_BACKEND } from "../config";

export async function loginUser(email, password) {
  try {
    const response = await fetch(`${PATH_API_BACKEND}/user/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error(`Erreur API: ${response.status}`);
    }

    return await response.json();
    } catch (err) {
    console.error("Erreur loginUser :", err);
    throw err;
  }
}

export async function getUserProfile(token) {
  const response = await fetch(`${PATH_API_BACKEND}/user/profile`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user profile");
  }

  return response.json(); // => { body: { firstName, lastName, email } }
}

export async function updateUserProfile(token, updatedData) {
  const response = await fetch(`${PATH_API_BACKEND}/user/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updatedData),
  });

  if (!response.ok) {
    throw new Error("Impossible de mettre à jour le profil");
  }

  return await response.json(); // { status: "success", body: { firstName, lastName, userName } }
}

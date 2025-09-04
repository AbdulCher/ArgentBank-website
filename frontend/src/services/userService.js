// Frontend/services/userService.js

export async function loginUser(email, password) {
  try {
    const response = await fetch("http://localhost:3001/api/v1/user/login", {
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

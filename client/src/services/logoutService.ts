



export const logoutService = async () => {
  try {
    const res = await fetch(`/api/auth/logout`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      
    });

    if (!res.ok) {
      const error = await res.json();
       
      throw new Error(error.message || "Logout failed");
    }
  } catch (error) {
    console.error("Logout service error:", error);
  }
};

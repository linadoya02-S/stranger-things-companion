import { createContext, useContext, useState, useCallback } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = useCallback(async (username, password) => {
    // Simulación de login contra la API
    // En un proyecto real: await fetch(`${BASE_URL}/login`, { method: 'POST', body: ... })
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (username === "admin" && password === "hawkins1983") {
          setUser({ id: 1, username, role: "admin" });
          resolve({ success: true });
        } else {
          reject(new Error("Credenciales incorrectas"));
        }
      }, 800);
    });
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoggedIn: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}

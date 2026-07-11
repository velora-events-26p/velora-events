import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(undefined);

// Local mock "database" keys. Swap all of this out once the real backend
// is ready — the login/signup/logout signatures below are the contract
// the rest of the app should keep relying on.
const SESSION_KEY = "velora_auth_session";
const USERS_KEY = "velora_auth_users";

function getStoredUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  } catch {
    return [];
  }
}

function saveStoredUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore session on first load (e.g. page refresh)
  useEffect(() => {
    try {
      const stored = localStorage.getItem(SESSION_KEY);
      if (stored) setUser(JSON.parse(stored));
    } catch (err) {
      console.error("Failed to restore session:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signup = async ({ name, email, password }) => {
    // TODO(auth): replace with a real API call, e.g.
    // const res = await fetch("/api/auth/signup", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ name, email, password }),
    // });
    // if (!res.ok) throw new Error((await res.json()).message);
    // const { user: newUser } = await res.json();

    const users = getStoredUsers();
    const exists = users.some(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );
    if (exists) {
      throw new Error("An account with this email already exists");
    }

    const newUser = { id: crypto.randomUUID(), name, email };
    saveStoredUsers([...users, { ...newUser, password }]);
    localStorage.setItem(SESSION_KEY, JSON.stringify(newUser));
    setUser(newUser);
    return newUser;
  };

  const login = async ({ email, password }) => {
    // TODO(auth): replace with a real API call, e.g.
    // const res = await fetch("/api/auth/login", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ email, password }),
    // });
    // if (!res.ok) throw new Error("Invalid email or password");
    // const { user: loggedInUser } = await res.json();

    const users = getStoredUsers();
    const match = users.find(
      (u) =>
        u.email.toLowerCase() === email.toLowerCase() &&
        u.password === password
    );
    if (!match) {
      throw new Error("Invalid email or password");
    }

    const { password: _pw, ...safeUser } = match;
    localStorage.setItem(SESSION_KEY, JSON.stringify(safeUser));
    setUser(safeUser);
    return safeUser;
  };

  const logout = () => {
    // TODO(auth): also call the API to invalidate the session/token
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    signup,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (ctx === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
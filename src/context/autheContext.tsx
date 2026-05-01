import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { createContext, useContext, useState, useEffect } from "react";

// ------------------ Auth Context ------------------
interface AuthContextType {
    user: string | null;
    role: string | null;
    login: (username: string, password: string) => boolean;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

// ------------------ Hardcoded Users ------------------
const USERS = {
    superadmin: "super admin",
    cvmanager: "cv manager",
    employee: "employee list",
    visitor: "visitor list",
};

// ------------------ AuthProvider ------------------
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<string | null>(null);
    const [role, setRole] = useState<string | null>(null);
    const [showLogin, setShowLogin] = useState(false);

    const login = (username: string, password: string) => {
        const normalized = username.toLowerCase().trim();

        if (!USERS[normalized]) {
            alert("Invalid username.");
            return false;
        }

        if (password !== "Aa123456") {
            alert("Wrong password");
            return false;
        }

        const userRole = USERS[normalized];

        setUser(normalized);
        setRole(userRole);

        localStorage.setItem("auth_user", normalized);
        localStorage.setItem("auth_role", userRole);

        return true;
    };

    const logout = () => {
        setUser(null);
        setRole(null);
        localStorage.removeItem("auth_user");
        localStorage.removeItem("auth_role");
        setShowLogin(true); // show login again
    };

    useEffect(() => {
        const storedUser = localStorage.getItem("auth_user");
        const storedRole = localStorage.getItem("auth_role");

        if (storedUser && storedRole) {
            setUser(storedUser);
            setRole(storedRole);
        } else {
            setShowLogin(true); // show login modal
        }
    }, []);

    // ------------------ Login Modal ------------------
    const LoginModal = () => {
        const [username, setUsername] = useState("");
        const [password, setPassword] = useState("");

        const handleSubmit = (e: React.FormEvent) => {
            e.preventDefault();
            const success = login(username, password);
            if (success) setShowLogin(false);
        };

        if (!showLogin) return null;

        return (
            <div
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: "rgba(0,0,0,0.4)",
                    backdropFilter: "blur(10px)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 9999,
                }}
            >
                <form
                    onSubmit={handleSubmit}
                    style={{
                        background: "white",
                        padding: "2rem",
                        borderRadius: "8px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                        minWidth: "300px",
                    }}
                >
                    <Input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        autoFocus
                    />
                    <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button type="submit">Login</Button>
                </form>
            </div>
        );
    };

    return (
        <AuthContext.Provider value={{ user, role, login, logout }}>
            {children}
            <LoginModal />
        </AuthContext.Provider>
    );
};

// ------------------ Custom Hook ------------------
export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
    return ctx;
};

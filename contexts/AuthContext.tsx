"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface User {
  id: string;
  clientId: string;
  email: string;
  role: string;
  permissions?: string[] | Record<string, unknown>;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  status?: string;
  mustChangePassword?: boolean;
  accountInfo?: {
    createdAt?: string;
    lastLoginAt?: string;
    failedLoginAttempts?: number;
    totalLogins?: number;
  };
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  fetchProfile: () => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("auth-token");
      
      if (!token) {
        setUser(null);
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }

      const response = await fetch(
        "https://jxnnviamig.execute-api.ap-south-1.amazonaws.com/verify",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ token }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.valid) {
          setUser(data.user);
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem("auth-token");
          setUser(null);
          setIsAuthenticated(false);
        }
      } else {
        localStorage.removeItem("auth-token");
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      localStorage.removeItem("auth-token");
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);

      const response = await fetch(
        "https://jxnnviamig.execute-api.ap-south-1.amazonaws.com/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      let data;
      try {
        data = await response.json();
      } catch (jsonError) {
        console.error("AuthContext: Failed to parse JSON response", jsonError);
        const text = await response.text();
        console.error("AuthContext: Response text:", text);
        return { success: false, error: "Server returned invalid response" };
      }

      if (response.ok) {
        // Store token in localStorage
        localStorage.setItem("auth-token", data.token);
        setUser(data.user);
        setIsAuthenticated(true);
        return { success: true };
      } else {
        return { success: false, error: data.error };
      }
    } catch (error) {
      console.error("AuthContext: Login error:", error);
      return { success: false, error: "Network error occurred" };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      const token = localStorage.getItem("auth-token");
      
      if (token) {
        await fetch(
          "https://jxnnviamig.execute-api.ap-south-1.amazonaws.com/logout",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("auth-token");
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("auth-token");

      if (!token) {
        return { success: false, error: "No authentication token found" };
      }

      const response = await fetch(
        "https://jxnnviamig.execute-api.ap-south-1.amazonaws.com/profile",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        return { success: true };
      } else {
        const errorData = await response.json();
        return {
          success: false,
          error: errorData.error || "Failed to fetch profile",
        };
      }
    } catch (error) {
      console.error("Profile fetch error:", error);
      return { success: false, error: "Network error occurred" };
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const value = {
    user,
    isLoading,
    isAuthenticated,
    login,
    logout,
    checkAuth,
    fetchProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

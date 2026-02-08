const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined in your .env");
}

// -----------------------------
// Types
// -----------------------------
export interface RegisterPayload {
  email: string;
  password: string;
  displayName?: string; // optional
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  access: string;
  refresh: string;
  user?: {
    email: string;
    displayName?: string;
  };
}

// -----------------------------
// AUTH FUNCTIONS
// -----------------------------

export const registerUser = async (data: RegisterPayload): Promise<AuthResponse> => {
  const res = await fetch(`${BASE_URL}/auth/register/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: data.email,
      password: data.password,
      ...(data.displayName ? { display_name: data.displayName } : {}), // backend expects display_name
    }),
  });

  const json = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(json?.detail || "Registration failed");
  }

  return json as AuthResponse;
};

export const loginUser = async (data: LoginPayload): Promise<AuthResponse> => {
  const res = await fetch(`${BASE_URL}/auth/login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const json = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(json?.detail || "Login failed");
  }

  return json as AuthResponse;
};

export const logoutUser = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

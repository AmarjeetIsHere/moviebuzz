import { user, isAuthenticated } from "../store";

const isBrowser = typeof window !== "undefined";

// Login function
export function login(username: string, password: string): void {
  if (!isBrowser) throw new Error("localStorage is not available");

  const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
  const foundUser = storedUsers.find(
    (user: { username: string; password: string }) =>
      user.username === username && user.password === password
  );

  if (foundUser) {
    foundUser.state = true;
    user.set(foundUser);
    isAuthenticated.set(true);
  } else {
    throw new Error("Invalid credentials");
  }
}

// Signup function (improved with email)
export async function signup(
  email: string,
  username: string,
  password: string
): Promise<void> {
  if (!isBrowser) throw new Error("localStorage is not available");

  const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
  const userExists = storedUsers.some(
    (user: { username: string; email: string }) =>
      user.username === username || user.email === email
  );

  if (userExists) {
    throw new Error("Username or email already exists");
  } else {
    const newUser = { username, password, email, state: true };
    storedUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(storedUsers));
    user.set(newUser);
  }
}

// Logout function
export function logout(): void {
  user.set({});
  isAuthenticated.set(false);
}

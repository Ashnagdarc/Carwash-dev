// src/services/auth.ts

export interface User {
  name: string;
  email: string;
  role: string;
}

export interface AuthCredentials {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

// Simulate a user database
const mockUser: User = {
  name: 'John Doe',
  email: 'john@example.com',
  role: 'customer',
};

export async function login({ email, password }: AuthCredentials): Promise<User> {
  // Simulate API delay
  await new Promise((res) => setTimeout(res, 700));
  if (email === mockUser.email && password === 'password123') {
    return mockUser;
  }
  throw new Error('Invalid email or password');
}

export async function signup({ email, password, firstName, lastName }: AuthCredentials): Promise<User> {
  await new Promise((res) => setTimeout(res, 700));
  if (!email || !password || !firstName || !lastName) {
    throw new Error('All fields are required');
  }
  // Simulate user creation
  return {
    name: `${firstName} ${lastName}`,
    email,
    role: 'customer',
  };
} 
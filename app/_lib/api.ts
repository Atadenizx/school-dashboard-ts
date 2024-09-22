import { createClient } from "@/utils/supabase/client"; // Import Supabase client

type SignUpType = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  age: number;
};

export async function login(data: { email: string; password: string }) {
  const supabase = createClient();

  const { data: session, error } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });

  if (error) {
    console.error("Login error:", error.message);
    return { error };
  }

  return { session, error }; // session contains user data after login
}

export async function signUp(data: SignUpType) {
  const supabase = createClient();

  const { email, password, firstName, lastName, age } = data;

  const { data: res, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName,
        age,
      },
    },
  });

  if (error) {
    console.log(error);
  }

  return { res, error };
}

export async function getAvailableUsers() {
  const supabase = createClient();

  const { data: users, error } = await supabase.from("users").select("*");

  if (error) {
    console.error(error.message);
    return error;
  }
  return users;
}

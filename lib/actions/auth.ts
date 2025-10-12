"use server";

import { createServerClient } from '@supabase/ssr';
import { cookies, ReadonlyRequestCookies } from 'next/headers';
import { redirect } from 'next/navigation';

// Supabase setup for server components/actions
const createSupabaseServerClient = () => {
  const cookieStore: ReadonlyRequestCookies = cookies(); // cookies() returns ReadonlyRequestCookies directly
  
  // Note: These env vars must be available in the server environment
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error("Supabase environment variables not configured.");
  }
  
  return createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        get: (name: string) => cookieStore.get(name)?.value,
        set: (name: string, value: string, options: any) => {
          cookieStore.set(name, value, options); // Corrected set method
        },
        remove: (name: string, options: any) => {
          cookieStore.set(name, '', options); // Corrected remove method
        },
      },
    }
  );
};

export async function signIn(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const supabase = createSupabaseServerClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    // Return a JSON structure indicating failure and message, or throw
    throw new Error(error.message);
  }

  // On success, use the server-side redirect function
  redirect('/dashboard');
} 
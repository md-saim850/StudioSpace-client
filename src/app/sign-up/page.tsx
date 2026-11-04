'use client'
import Link from "next/link";
import { ArrowRight, Mail, Lock, User, Camera, Loader2 } from "lucide-react";
import { toast } from "sonner";
import {authClient, signUp } from "@/lib/auth-client";
import { useState } from "react";


const validatedPassword = (password:string, confirm_password:string) =>{
  if(password !== confirm_password){
    return ("Password does not match!");
  }
  else if(password.length < 8){
    return "Password must be at least 8 characters!"
  }
  else if(!/[A-Z]/.test(password)){
    return "Password must contain at least one uppercase letter!"
  }
  else if(!/[a-z]/.test(password)){
    return ("Password must contain at least one lowercase letter!");
  }
  else if (!/[0-9]/.test(password)) {
    return "Password must contain at least one number!";
  }
  return "ok";
}


export default function SignUpPage() {
  const[error, setError] = useState<string>("")
  const[loading, setLoading] = useState(false)
  const[googleLoading, setGoogleLoading] = useState(false)

  const handleSubmit = async(e:React.SubmitEvent<HTMLElement>) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    try{
      const formData = new FormData(e.target);
      const user = Object.fromEntries(formData.entries()) as {
        name:string,
        email:string,
        password:string,
        confirm_password:string,
      };
  
      const {name, email, password, confirm_password} = user;

      const res = validatedPassword(password, confirm_password);

      if(res !== 'ok'){
        setError(res);
        return;
      }else{
        setError("");
      }

      const{data, error} = await signUp.email({
        name,
        email,
        password,
        callbackURL:"/",
      })

      if(error){
        setError(error?.message as string);
        return;
      }

      console.log(data);
  
    }catch(error){
      console.log(error);
      toast.error("Failed to submit Sign Up form!")
    } finally {
      setLoading(false);
    }
  }

  const handleSignIn = async () => {
    if (googleLoading) return;

    setGoogleLoading(true);

    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL:"/",
      }); 
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-5 py-12">
      <div className="w-full max-w-md bg-gray-50 p-5 rounded-2xl border border-gray-200 shadow-2xs dark:bg-gray-900 dark:border-gray-800">

        {/*Brand Logo */}
        <div className="flex items-center justify-end gap-2 mb-8">
          <div className="bg-black text-white p-2 rounded-full flex items-center justify-center shadow-md dark:bg-white dark:text-black">
            <Camera className="w-3 h-3 stroke-[1.5]" />
          </div>
          <span className="font-bold text-sm tracking-tight text-gray-950 font-sans dark:text-white">
            StudioSpace
          </span>
        </div>

        {/* Heading */}
        <div className="text-center mb-9">
          <h1 className="text-3xl font-bold text-black tracking-tight dark:text-white">
            Create Account
          </h1>
          <p className="text-gray-500 mt-2 text-sm dark:text-gray-400">
            Join StudioSpace and start creating today.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} 
        className="space-y-4">

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2 dark:text-gray-200">
              Full Name
            </label>
            <div className="relative">
              <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
              <input
                type="text"
                name="name"
                placeholder="Your full name"
                required
                className="w-full border border-gray-200 rounded-xl py-3.5 pl-11 pr-4 text-sm outline-none focus:border-black transition dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:border-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2 dark:text-gray-200">
              Email Address
            </label>
            <div className="relative">
              <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
              <input
                type="email"
                name="email"
                placeholder="name@example.com"
                required
                className="w-full border border-gray-200 rounded-xl py-3.5 pl-11 pr-4 text-sm outline-none focus:border-black transition dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:border-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2 dark:text-gray-200">
              Password
            </label>
            <div className="relative">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
              <input
                type="password"
                name="password"
                placeholder="Create a password"
                required
                minLength={8}
                className="w-full border border-gray-200 rounded-xl py-3.5 pl-11 pr-4 text-sm outline-none focus:border-black transition dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:border-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2 dark:text-gray-200">
              Confirm Password
            </label>
            <div className="relative">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
              <input
                type="password"
                name="confirm_password"
                placeholder="Confirm password"
                required
                minLength={8}
                className="w-full border border-gray-200 rounded-xl py-3.5 pl-11 pr-4 text-sm outline-none focus:border-black transition dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:border-white"
              />
            </div>
          </div>

          <div className="">
            {error && (
              <p className="bg-red-100 p-2 rounded-md text-red-500 text-xs mt-1.5 dark:bg-red-950/40 dark:text-red-400">
                {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white rounded-xl py-3.5 font-semibold text-sm hover:bg-gray-800 transition flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-black dark:hover:bg-gray-200"
          >
            {loading ? (
              <>
                <Loader2 size={17} className="animate-spin" />
                Creating Account...
              </>
            ) : (
              <>
                Create Account <ArrowRight size={17} />
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative flex items-center my-7">
          <div className="flex-grow border-t border-gray-200 dark:border-gray-700" />
          <span className="px-4 text-xs text-gray-400 dark:text-gray-500">OR SIGN UP WITH</span>
          <div className="flex-grow border-t border-gray-200 dark:border-gray-700" />
        </div>

        {/* Google Button */}
        <button
          onClick={handleSignIn}
          type="button"
          disabled={googleLoading}
          className="w-full border border-gray-200 rounded-xl py-3.5 flex items-center justify-center gap-3 text-sm font-semibold text-black hover:bg-gray-50 transition disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800"
        >
          {googleLoading ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              Redirecting...
            </>
          ) : (
            <>
              <svg viewBox="0 0 48 48" className="w-5 h-5" aria-hidden="true">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.25 5.48-4.7 7.18l7.73 6C44.48 37.98 46.98 31.83 46.98 24.55z" />
                <path fill="#FBBC05" d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.13.76-4.59l-7.98-6.19A23.8 23.8 0 0 0 0 24c0 3.87.93 7.52 2.56 10.78l7.97-6.19z" />
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.91-5.8l-7.73-6c-2.14 1.45-4.89 2.3-8.18 2.3-6.26 0-11.57-4.22-13.46-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
              </svg>
              Sign up with Google
            </>
          )}
        </button>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-8 dark:text-gray-400">
          Already have an account?{" "}
          <Link href="/sign-in" className="font-bold text-black hover:underline dark:text-white">
            Sign in
          </Link>
        </p>

        <p className="text-center text-xs text-gray-400 mt-10 dark:text-gray-500">
          © 2026 StudioSpace. All rights reserved.
        </p>
      </div>
    </main>
  );
}

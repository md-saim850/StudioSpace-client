'use client'
import Link from "next/link";
import { ArrowRight, Mail, Lock, Camera } from "lucide-react";
import { useState } from "react";
import { signIn } from "@/lib/auth-client";
import { toast } from "sonner";

export default function SignInPage() {
  const[error, setError] = useState<string>("")

  const handleSubmit = async(e:React.SubmitEvent<HTMLElement>) => {
    e.preventDefault();
    try{
      const formData = new FormData(e.target);
      const user = Object.fromEntries(formData.entries()) as {
        email:string,
        password:string,
      };
  
      const {email, password} = user;

      console.log(email, password);

      const{data, error} = await signIn.email({
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
      toast.error("Failed to submit Sign-In form!")
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-5 py-12">
      <div className="w-full max-w-md bg-gray-50 p-5 rounded-2xl border border-gray-200 shadow-2xs">

        {/*Brand Logo */}
        <div className="flex items-center justify-end gap-2 mb-8">
          <div className="bg-black text-white p-2 rounded-full flex items-center justify-center shadow-md">
            <Camera  className="w-3 h-3 stroke-[1.5]" />
          </div>
          <span className="font-bold text-sm tracking-tight text-gray-950 font-sans">
            StudioSpace
          </span>
        </div>

        {/* Heading */}
        <div className="text-center mb-9">
          <h1 className="text-3xl font-bold text-black tracking-tight">
            Welcome Back
          </h1>
          <p className="text-gray-500 mt-2 text-sm">
            Enter your details to access your account.
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                name="email"
                placeholder="name@example.com"
                required
                className="w-full border border-gray-200 rounded-xl py-3.5 pl-11 pr-4 text-sm outline-none focus:border-black transition"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold text-gray-800">
                Password
              </label>
            </div>

            <div className="relative">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                required
                className="w-full border border-gray-200 rounded-xl py-3.5 pl-11 pr-4 text-sm outline-none focus:border-black transition"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white rounded-xl py-3.5 font-semibold text-sm hover:bg-gray-800 transition flex items-center justify-center gap-2"
          >
            Sign In <ArrowRight size={17} />
          </button>
        </form>

        {/* Divider */}
        <div className="relative flex items-center my-7">
          <div className="flex-grow border-t border-gray-200" />
          <span className="px-4 text-xs text-gray-400">OR CONTINUE WITH</span>
          <div className="flex-grow border-t border-gray-200" />
        </div>

        {/* Google Button */}
        <button
          type="button"
          className="w-full border border-gray-200 rounded-xl py-3.5 flex items-center justify-center gap-3 text-sm font-semibold text-black hover:bg-gray-50 transition"
        >
          <svg viewBox="0 0 48 48" className="w-5 h-5" aria-hidden="true">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.25 5.48-4.7 7.18l7.73 6C44.48 37.98 46.98 31.83 46.98 24.55z" />
            <path fill="#FBBC05" d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.13.76-4.59l-7.98-6.19A23.8 23.8 0 0 0 0 24c0 3.87.93 7.52 2.56 10.78l7.97-6.19z" />
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.91-5.8l-7.73-6c-2.14 1.45-4.89 2.3-8.18 2.3-6.26 0-11.57-4.22-13.46-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
          </svg>
          Continue with Google
        </button>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-8">
          Don't have an account?{" "}
          <Link href="/sign-up" className="font-bold text-black hover:underline">
            Create an account
          </Link>
        </p>

        <p className="text-center text-xs text-gray-400 mt-10">
          © 2026 StudioSpace. All rights reserved.
        </p>
      </div>
    </main>
  );
}

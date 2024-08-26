import { FaGoogle } from "react-icons/fa";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components"; 
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from 'next/navigation';
import Link from "next/link";

export default async function page() {
  const { isAuthenticated } = getKindeServerSession();
  
  if (await isAuthenticated()) {
    redirect('/dashboard');
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-4 py-8 mx-auto min-h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an account
            </h1>
            <div>
              <div className="relative py-3">
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div className="w-full border-t border-gray-300 dark:border-gray-700" />
                </div>
              </div>
              <LoginLink
                authUrlParams={{
                  connection_id: process.env.NEXT_PUBLIC_KINDE_CONNECTION_GOOGLE_ID as string,
                }}
              >
                <button
                  className="inline-flex items-center justify-center w-full gap-3 bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  dark:bg-gray-100 dark:hover:bg-gray-400 dark:focus:ring-blue-800"
                  type="button"
                  aria-label="Sign in with Google"
                >
                  <FaGoogle aria-label="logo google" />
                  <span>Continue with Google</span>
                </button>
              </LoginLink>
            </div>
            <p className="text-xs font-light text-gray-500 dark:text-gray-400">
                Have an account?{" "}
                <Link
                  href="/login"
                  className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                >
                  Sign in
                </Link>
              </p>
          </div>
        </div>
      </div>
    </section>
  );
}

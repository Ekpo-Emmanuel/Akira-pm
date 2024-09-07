import Link from "next/link";

export default function Home() {
  return (
    <section className="h-screen flex items-center justify-center bg-bgLight">
      <div className="px-8 py-24 mx-auto md:px-12 lg:px-32 max-w-7xl">
        <div className="text-center">
          <h1 className="text-4xl font-semibold tracking-tighter text-gray-900 lg:text-5xl text-balance">
            Akira
            <span className="text-gray-600"> Project Manager</span>
          </h1>
          <p className="mt-4 text-base font-medium text-gray-500 max-w-sm">
            The fastest method for working together
            <span className="md:block">
              {" "}
              on staging and temporary environments.
            </span>
          </p>
          <div className="flex items-center justify-center gap-2 mx-auto mt-8 md:flex-row">
            <Link href="/login">
              <button
                className="inline-flex items-center justify-center w-full h-12 gap-3 px-5 py-3 font-medium duration-200 bg-gray-100 text-black md:w-auto rounded-xl hover:bg-gray-200 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                aria-label="Download on Google Play"
              >
                Login
              </button>
            </Link>
            <Link href="/register">
              <button
                className="inline-flex items-center justify-center w-full h-12 gap-3 px-5 py-3 font-medium duration-200 bg-gray-100 text-black md:w-auto rounded-xl hover:bg-gray-200 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                aria-label="Download on App Store"
              >
                Sign up
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
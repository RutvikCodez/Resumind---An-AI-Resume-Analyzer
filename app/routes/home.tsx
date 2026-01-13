import Navbar from "~/components/Navbar";
import type { Route } from "./+types/home";
import { resumes } from "../../constants";
import ResumeCard from "~/components/ResumeCard";
import { usePuterStore } from "~/lib/puter";
import { useNavigate } from "react-router";
import { useEffect } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resumind" },
    { name: "description", content: "Smart feedback for your dream job!" },
  ];
}

export default function Home() {
   const { isLoading, auth } = usePuterStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (!auth.isAuthenticated) navigate("/auth?next=/");
  }, [auth.isAuthenticated]);

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover flex flex-col gap-16 pb-5">
      <Navbar />
      <section className="flex flex-col items-center gap-16">
        <div className="flex flex-col items-center gap-8 max-w-4xl text-center max-sm:gap-4">
          <h1>Track Your Applications & Resume Ratings</h1>
          <h2>Review your submissions and check AI-powered feedback.</h2>
        </div>
        {resumes.length > 0 && (
          <div className="grid grid-cols-3 gap-6 max-w-11/12 mx-auto max-xl:grid-cols-2 max-md:grid-cols-1 w-full">
            {resumes.map((resume, index) => (
              <ResumeCard key={index} {...resume} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

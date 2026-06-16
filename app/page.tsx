import Image from "next/image";
import { TerminologySearch } from "@/components/TerminologySearch";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-hero">
        <div className="mx-auto flex w-full max-w-2xl items-center px-6 py-3.5">
          <Image
            src="/logo.svg"
            alt="medscio"
            width={807}
            height={200}
            priority
            unoptimized
            className="h-6 w-auto"
          />
          <span className="ml-auto font-mono text-[0.7rem] uppercase tracking-[0.15em] text-white/55">
            Jeffrey van Ham
          </span>
        </div>
      </header>

      <main className="flex-1 px-6 py-8">
        <div className="mx-auto w-full max-w-2xl">
          <TerminologySearch />
        </div>
      </main>
    </div>
  );
}

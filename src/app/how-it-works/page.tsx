import Hero from "./Hero";
import Owner from "./Owner";
import Main from "./Main";


export default function HowItWorksPage() {
  return (
    <main className="min-h-screen bg-white text-black dark:bg-black dark:text-white">
      <Hero />
      <Main />
      <Owner />

    </main>
  );
}

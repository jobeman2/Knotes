import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-background text-foreground transition-colors">
      <main className="flex w-full max-w-5xl mx-auto flex-col items-center justify-center px-6 py-12 md:py-24 text-center sm:items-start sm:text-left">
        <div className="mb-12">
          <Image
            className="dark:invert mb-6"
            src="/next.svg"
            alt="Next.js logo"
            width={120}
            height={24}
            priority
          />
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            Smart Notes for{" "}
            <span className="text-primary italic">Modern Minds</span>
          </h1>
          <p className="max-w-2xl text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-10">
            Organize your thoughts, collaborate with ease, and never lose a
            brilliant idea again. All powered by a seamless, customizable theme.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              className="flex h-14 px-8 items-center justify-center gap-3 rounded-full bg-primary text-primary-foreground font-semibold text-lg transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-primary/20"
              href="/register"
            >
              Get Started Free
            </a>
            <a
              className="flex h-14 px-8 items-center justify-center rounded-full border border-gray-300 dark:border-gray-700 font-semibold text-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              href="https://nextjs.org/docs"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read Docs
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mt-16">
          <div className="p-6 rounded-2xl bg-secondary/50 border border-gray-100 dark:border-gray-800">
            <h3 className="text-xl font-bold mb-2">Fast & Simple</h3>
            <p className="text-gray-500">
              Edit your `page.tsx` and see changes instantly. Perfect for quick
              iterations.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-secondary/50 border border-gray-100 dark:border-gray-800">
            <h3 className="text-xl font-bold mb-2">Google Auth</h3>
            <p className="text-gray-500">
              Secure sign-up and login integrated with Firebase. Ready for
              production.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-secondary/50 border border-gray-100 dark:border-gray-800">
            <h3 className="text-xl font-bold mb-2">Custom Themes</h3>
            <p className="text-gray-500">
              Light, Dark, and several color presets to match your personal
              style.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

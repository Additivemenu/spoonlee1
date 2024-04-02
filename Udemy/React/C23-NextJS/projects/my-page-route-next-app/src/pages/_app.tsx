import "@/styles/globals.css";
import type { AppProps } from "next/app";

/**
 * defines global layout for the app, attach global wrappers for the app
 * @param param0
 * @returns
 */
export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="flex min-h-screen  flex-col items-center  justify-between p-2">
      <header className="bg-[yellow]">My App Header</header>
      {/* placeholder for a page  */}
      <Component {...pageProps} />
      <footer className="bg-[green]">My App Footer</footer>
    </div>
  );
}

import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html className="h-full bg-cool-gray antialiased" lang="en">
      <Head />
      <body className="flex h-full flex-col duration-300 dark:bg-cool-black">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

import type { NextPage } from "next";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { theme, setTheme } = useTheme();

  return (
    <div>
      <button
        type="button"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className="text-cooler-black dark:text-cool-gray"
      >
        SSIWTCH
      </button>
      <p className="text-6xl font-bold text-cooler-black dark:text-cool-gray">
        {mounted && theme}
      </p>
    </div>
  );
};

export default Home;

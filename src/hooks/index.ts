import { useEffect, useState } from "react";

export const useTheme = () => {
  const [theme, setTheme] = useState(
    JSON.parse(localStorage.getItem("theme") as string) || "light"
  );
  const darkTheme =
    "https://cdn.jsdelivr.net/npm/bootstrap-dark-5@1.1.3/dist/css/bootstrap-dark.min.css";
  const lightTheme =
    "https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha1/css/bootstrap.min.css";

  const setCurrentMode = (theme: string) => {
    const link = document.getElementById("theme-link") as HTMLLinkElement;
    link.href = theme === "dark" ? darkTheme : lightTheme;
  };

  const toggleTheme = () => {
    const inverseMode = theme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", JSON.stringify(inverseMode));

    setCurrentMode(theme);
    setTheme(inverseMode);
  };

  useEffect(() => {
    setCurrentMode(theme);
  }, [theme]);

  return { toggleTheme, theme };
};

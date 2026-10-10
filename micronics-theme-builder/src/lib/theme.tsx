import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type ThemeMode = "light" | "dark" | "system";
const THEME_KEY = "micronics-devlon-theme";

interface ThemeContextValue {
  mode: ThemeMode;
  resolvedTheme: "light" | "dark";
  setMode: (mode: ThemeMode) => void;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function getPreferredTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function storedMode(): ThemeMode {
  if (typeof window === "undefined") return "system";
  const stored = window.localStorage.getItem(THEME_KEY);
  return stored === "light" || stored === "dark" || stored === "system" ? stored : "system";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>("system");
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const nextMode = storedMode();
    const apply = () => {
      const next = nextMode === "system" ? getPreferredTheme() : nextMode;
      setResolvedTheme(next);
      document.documentElement.classList.toggle("dark", next === "dark");
      document.documentElement.dataset["theme"] = next;
    };
    setModeState(nextMode);
    apply();
    const query = window.matchMedia("(prefers-color-scheme: dark)");
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);

  const setMode = (nextMode: ThemeMode) => {
    window.localStorage.setItem(THEME_KEY, nextMode);
    const next = nextMode === "system" ? getPreferredTheme() : nextMode;
    setModeState(nextMode);
    setResolvedTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    document.documentElement.dataset["theme"] = next;
  };

  const value = useMemo(
    () => ({ mode, resolvedTheme, setMode, toggle: () => setMode(resolvedTheme === "dark" ? "light" : "dark") }),
    [mode, resolvedTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const value = useContext(ThemeContext);
  if (!value) throw new Error("useTheme must be used inside ThemeProvider");
  return value;
}

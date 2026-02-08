// pages/signup.tsx
"use client";

import { useTheme } from "next-themes";
import { colors, ThemeKey } from "@/theme";
import SignupForm from "@/components/SignupForm";

export default function SignupPage() {
  const { resolvedTheme } = useTheme();
  const themeKey: ThemeKey = resolvedTheme === "dark" ? "dark" : "light";
  const themeColors = colors.hero[themeKey];

  return (
    <section className={`min-h-screen flex items-center justify-center px-6 ${themeColors.bg} ${themeColors.text}`}>
      <SignupForm themeColors={themeColors} />
    </section>
  );
}

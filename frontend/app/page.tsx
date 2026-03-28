"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Безопасный переход на страницу квиза после загрузки
    router.push("/quiz");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center text-gray-500">
      Загрузка квиза...
    </div>
  );
}
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ResultsPage() {
  const [matches, setMatches] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Достаем результаты из памяти браузера при загрузке страницы
    const savedMatches = localStorage.getItem("quizMatches");
    if (savedMatches) {
      // Оставляем ТОЛЬКО эту строчку, она правильная:
      setMatches(JSON.parse(savedMatches));
    } else {
      // Если результатов нет, отправляем обратно на квиз
      router.push("/quiz");
    }
  }, [router]);

  if (matches.length === 0) {
    return <div className="min-h-screen flex justify-center items-center">Загрузка...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 text-center">
          Ваши идеальные консультанты
        </h1>
        <p className="text-gray-600 text-center mb-10">
          Мы проанализировали ваши ответы и подобрали топ-3 специалистов для вас.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {matches.map((match, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col">
              
              {/* Значок "Лучшее совпадение" для первого */}
              {index === 0 && (
                <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full w-max mb-4">
                  Лучшее совпадение ({match.score}%)
                </span>
              )}

              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900">{match.advisor.name}</h3>
                <p className="text-sm text-gray-500 mb-4">{match.advisor.city}</p>
                
                {/* Специализации */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {match.advisor.specializations.map((spec: string) => (
                    <span key={spec} className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-md">
                      {spec}
                    </span>
                  ))}
                </div>
                
                <p className="text-gray-700 text-sm mb-6 line-clamp-3">
                  {match.advisor.bio || "Опытный финансовый консультант, готовый помочь вам достичь ваших целей."}
                </p>
              </div>

              <button 
  onClick={() => router.push(`/advisor/${match.advisor.id}`)}
  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-xl transition-colors">
  Написать сообщение
  </button>

            </div>
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <button 
            onClick={() => router.push("/quiz")}
            className="text-blue-600 font-medium hover:underline"
          >
            Пройти квиз заново
          </button>
        </div>
      </div>
    </div>
  );
}
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Добавили роутер!

const questions = [
  {
    id: "goal",
    title: "Какая ваша главная финансовая цель?",
    options: ["Планирование пенсии", "Инвестиции", "Управление долгами"],
  },
  {
    id: "assets",
    title: "Какой у вас примерный капитал для инвестиций?",
    options: ["Менее $50,000", "$50,000 - $250,000", "Более $250,000"],
  },
  {
    id: "preference",
    title: "Как вы предпочитаете общаться с консультантом?",
    options: ["Лично", "Онлайн (Zoom)", "Не имеет значения"],
  },
];

export default function QuizPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const router = useRouter(); // Инициализируем роутер

  const handleAnswer = (option: string) => {
    const questionId = questions[currentStep].id;
    setAnswers({ ...answers, [questionId]: option });
  };

  const handleNext = async () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsSubmitting(true);
      try {
        const sessionId = "session-" + Math.random().toString(36).substring(7);
        const response = await fetch("http://localhost:3001/quiz", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId, answers }),
        });

        const data = await response.json();
        
        // СОХРАНЯЕМ В ПАМЯТЬ БРАУЗЕРА И ДЕЛАЕМ РЕДИРЕКТ
        localStorage.setItem("quizMatches", JSON.stringify(data.matches));
        router.push("/results"); 

      } catch (error) {
        console.error("Ошибка при отправке:", error);
        alert("Бэкенд не отвечает.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const currentQuestion = questions[currentStep];
  const isAnswerSelected = !!answers[currentQuestion.id];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <div className="mb-6 text-sm font-medium text-gray-500">
          Шаг {currentStep + 1} из {questions.length}
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {currentQuestion.title}
        </h2>
        <div className="space-y-3 mb-8">
          {currentQuestion.options.map((option) => (
            <button
              key={option}
              onClick={() => handleAnswer(option)}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                answers[currentQuestion.id] === option
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-blue-200"
              }`}
            >
              <span className="text-gray-800 font-medium">{option}</span>
            </button>
          ))}
        </div>
        <div className="flex justify-between">
          <button
            onClick={handleBack}
            disabled={currentStep === 0 || isSubmitting}
            className="px-4 py-2 text-gray-500 font-medium disabled:opacity-30"
          >
            Назад
          </button>
          <button
            onClick={handleNext}
            disabled={!isAnswerSelected || isSubmitting}
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-xl disabled:bg-gray-300 transition-colors"
          >
            {isSubmitting ? "Отправка..." : currentStep === questions.length - 1 ? "Завершить" : "Далее"}
          </button>
        </div>
      </div>
    </div>
  );
}
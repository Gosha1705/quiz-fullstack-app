"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function AdvisorProfilePage() {
  const params = useParams();
  const router = useRouter();
  const [advisor, setAdvisor] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Состояние формы
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    body: "",
  });

  useEffect(() => {
    // Делаем GET запрос к бэкенду, чтобы получить профиль
    fetch(`http://localhost:3001/advisors/${params.id}`)
      .then((res) => res.json())
      .then((data) => setAdvisor(data))
      .catch((err) => console.error("Ошибка загрузки:", err));
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1. Отправляем письмо на наш бэкенд
      const response = await fetch("http://localhost:3001/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          advisorId: Number(params.id),
          senderName: formData.name,
          senderEmail: formData.email,
          body: formData.body,
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
        setFormData({ name: "", email: "", body: "" });

        // 2. БИЗНЕС-ТРЕКИНГ (То, что просили в ТЗ выделить красным!)
        // В реальном проекте здесь был бы Google Analytics или Mixpanel
        console.log("TRACKING EVENT: message_sent", {
          advisorId: Number(params.id),
          timestamp: new Date().toISOString(),
        });
      }
    } catch (error) {
      console.error("Ошибка отправки:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!advisor) return <div className="min-h-screen flex items-center justify-center">Загрузка профиля...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm overflow-hidden">
        
        {/* Шапка профиля */}
        <div className="bg-blue-600 px-6 py-8 text-white">
          <button onClick={() => router.back()} className="text-blue-100 hover:text-white mb-4 text-sm font-medium">
            ← Назад к результатам
          </button>
          <h1 className="text-3xl font-bold">{advisor.name}</h1>
          <p className="text-blue-100 mt-2 text-lg">{advisor.city}</p>
        </div>

        <div className="p-6 md:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Связаться с консультантом</h2>
          
          {isSuccess ? (
            <div className="bg-green-50 border border-green-200 text-green-700 p-6 rounded-xl text-center">
              <h3 className="font-bold text-lg mb-2">Сообщение успешно отправлено!</h3>
              <p>Консультант свяжется с вами в ближайшее время на указанный email.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ваше имя</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ваш Email</label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Сообщение</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Опишите вкратце вашу финансовую цель..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  value={formData.body}
                  onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-xl hover:bg-blue-700 disabled:opacity-50 transition"
              >
                {isSubmitting ? "Отправка..." : "Отправить сообщение"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
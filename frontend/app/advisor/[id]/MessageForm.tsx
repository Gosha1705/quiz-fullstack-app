"use client";
import { useState } from "react";

export default function MessageForm({ advisorId }: { advisorId: number }) {
  const [formData, setFormData] = useState({ name: "", email: "", body: "" });
  
  // Новые состояния для чата
  const [chatHistory, setChatHistory] = useState<{sender: 'user' | 'advisor', text: string}[]>([]);
  const [isChatActive, setIsChatActive] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 1. Показываем сообщение юзера в чате
    setChatHistory([{ sender: 'user', text: formData.body }]);
    setIsChatActive(true);
    setIsTyping(true);

    try {
      // 2. Отправляем в реальную базу данных (чтобы выполнить ТЗ)
      const res = await fetch("https://quiz-fullstack-app-u4q2.onrender.com/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          advisorId, 
          senderName: formData.name, 
          senderEmail: formData.email, 
          body: formData.body 
        }),
      });

      if (res.ok) {
        console.log("TRACKING EVENT: message_sent", { advisorId, timestamp: new Date().toISOString() });
        
        // 3. Имитируем ответ от адвайзера через 2 секунды
        setTimeout(() => {
          setIsTyping(false);
          setChatHistory(prev => [...prev, { 
            sender: 'advisor', 
            text: `Здравствуйте, ${formData.name}! Спасибо за обращение. Я получил вашу заявку и свяжусь с вами по адресу ${formData.email} в ближайшее время, чтобы обсудить детали.` 
          }]);
        }, 2000);
      }
    } catch (error) {
      console.error(error);
      setIsTyping(false);
    }
  };

  // Если чат активировался, рендерим диалог вместо формы
  if (isChatActive) {
    return (
      <div className="mt-6 border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <h3 className="font-semibold text-gray-700">Чат с консультантом</h3>
        </div>
        
        <div className="p-4 space-y-4 bg-white min-h-[200px]">
          {chatHistory.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-3 rounded-2xl ${msg.sender === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-gray-100 text-gray-800 rounded-tl-none'}`}>
                {msg.text}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 text-gray-500 py-2 px-4 rounded-2xl rounded-tl-none italic text-sm animate-pulse">
                печатает...
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Стандартная форма отправки
  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-6">
      <input type="text" placeholder="Ваше имя" required className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" onChange={e => setFormData({...formData, name: e.target.value})} />
      <input type="email" placeholder="Ваш Email" required className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" onChange={e => setFormData({...formData, email: e.target.value})} />
      <textarea placeholder="Ваше сообщение..." required className="w-full border p-3 rounded-lg h-32 focus:ring-2 focus:ring-blue-500 focus:outline-none" onChange={e => setFormData({...formData, body: e.target.value})}></textarea>
      <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors">Отправить сообщение</button>
    </form>
  );
}
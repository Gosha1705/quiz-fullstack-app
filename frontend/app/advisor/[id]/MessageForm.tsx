"use client";
import { useState } from "react";

export default function MessageForm({ advisorId }: { advisorId: number }) {
  const [formData, setFormData] = useState({ name: "", email: "", body: "" });
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("https://quiz-fullstack-app-u4q2.onrender.com/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ advisorId, senderName: formData.name, senderEmail: formData.email, body: formData.body }),
      });
      if (res.ok) {
        setIsSuccess(true);
        console.log("TRACKING EVENT: message_sent", { advisorId, timestamp: new Date().toISOString() });
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (isSuccess) return <div className="p-4 bg-green-50 text-green-700 rounded-lg">Сообщение успешно отправлено!</div>;

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-6">
      <input type="text" placeholder="Ваше имя" required className="w-full border p-2 rounded" onChange={e => setFormData({...formData, name: e.target.value})} />
      <input type="email" placeholder="Ваш Email" required className="w-full border p-2 rounded" onChange={e => setFormData({...formData, email: e.target.value})} />
      <textarea placeholder="Сообщение" required className="w-full border p-2 rounded" onChange={e => setFormData({...formData, body: e.target.value})}></textarea>
      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Отправить</button>
    </form>
  );
}
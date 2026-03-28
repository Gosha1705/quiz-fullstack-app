import MessageForm from "./MessageForm";

// Эта функция выполняется НА СЕРВЕРЕ (SSR)
async function getAdvisor(id: string) {
  const res = await fetch(`https://quiz-fullstack-app-u4q2.onrender.com/advisors/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
}

export default async function AdvisorProfilePage({ params }: { params: { id: string } }) {
  const advisor = await getAdvisor(params.id);

  return (
    <div className="max-w-2xl mx-auto p-6 mt-10 bg-white shadow-lg rounded-xl">
      <h1 className="text-3xl font-bold">{advisor.name}</h1>
      <p className="text-gray-600 mb-4">{advisor.city}</p>
      
      <h2 className="text-xl font-semibold mt-6">Оставить сообщение</h2>
      <MessageForm advisorId={Number(params.id)} />
    </div>
  );
}
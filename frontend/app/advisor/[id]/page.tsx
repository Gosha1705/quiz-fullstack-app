import MessageForm from "./MessageForm";

async function getAdvisor(id: string) {
  // Прямая ссылка на твой рабочий бэкенд
  const res = await fetch(`https://quiz-fullstack-app-u4q2.onrender.com/advisors/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
}

// В Next.js 15 params обязательно нужно "ждать" (await)
export default async function AdvisorProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params; // Распаковываем ID
  const advisor = await getAdvisor(resolvedParams.id);

  return (
    <div className="max-w-2xl mx-auto p-6 mt-10 bg-white shadow-lg rounded-xl">
      <h1 className="text-3xl font-bold text-gray-900">{advisor.name}</h1>
      <p className="text-gray-600 mb-4">{advisor.city} • Минимальный порог: ${advisor.minAssetThreshold}</p>
      
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <p className="text-gray-700 italic">"{advisor.bio}"</p>
      </div>
      
      <h2 className="text-xl font-semibold mt-6 mb-4">Оставить сообщение</h2>
      <MessageForm advisorId={Number(resolvedParams.id)} />
    </div>
  );
}
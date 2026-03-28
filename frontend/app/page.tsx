import { redirect } from "next/navigation";

export default function HomePage() {
  // Автоматически перенаправляем пользователя с главной страницы на страницу квиза
  redirect("/quiz");
}
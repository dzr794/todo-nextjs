import { redirect } from "next/navigation";
import LoginForm from "@/components/LoginForm";

export default async function Page() {

  // Render the page
  return (
    <section>
      <LoginForm />
    </section>
  );
}

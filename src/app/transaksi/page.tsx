import AuthPage from "./(authenticated)/auth-page";
import PublicPage from "./(public)/public-page";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

async function Page() {
  const session = await getServerSession(options);

  if (session) return <AuthPage />;
  return <PublicPage />;
}

export default Page;

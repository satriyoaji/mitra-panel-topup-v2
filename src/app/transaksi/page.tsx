import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import AuthPage from "./(authenticated)/auth-page";
import PublicPage from "./(public)/public-page";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {} from "next-auth/react";

async function Page() {
  const session = await getServerSession(options);

  return (
    <div className="pt-4 px-2 flex w-full justify-center">
      <div className="max-w-7xl w-full flex flex-col justify-center items-center">
        <Breadcrumb className="mb-4 inline-flex justify-start w-full">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Transaksi</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="max-w-5xl w-full">
          {session ? <AuthPage /> : <PublicPage />}
        </div>
      </div>
    </div>
  );
}

export default Page;

import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Profile from "./profile";
import Password from "./password";

function Page() {
  return (
    <div className="flex justify-center w-full px-2">
      <div className="max-w-6xl w-full my-4 flex flex-col justify-center items-center">
        <Breadcrumb className="mb-4 inline-flex justify-start w-full">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Edit Profile</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="max-w-4xl w-full space-y-4">
          <Tabs defaultValue="profile" className="w-full">
            <div className="bg-background rounded-lg pt-4 px-6 pb-8 w-full sticky top-12">
              <div className="justify-between flex items-center">
                <div>
                  <h3 className="font-semibold text-primary p-0">
                    Edit Profile
                  </h3>
                  <TabsContent value="profile" className="p-0 m-0 mt-1">
                    <h6 className="text-primary">Informasi Akun</h6>
                  </TabsContent>
                  <TabsContent value="reset" className="p-0 m-0 mt-1">
                    <h6 className="text-primary">Ubah Keamanan Akun</h6>
                  </TabsContent>
                </div>
                <div>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="reset">Keamanan</TabsTrigger>
                  </TabsList>
                </div>
              </div>
              <TabsContent value="profile">
                <Profile />
              </TabsContent>
              <TabsContent value="reset">
                <Password />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default Page;

import React from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { GetCredHeader } from "../api/api-utils";
import { ISiteProfile } from "@/types/utils";

const getData = async () => {
    const credentialHeader = GetCredHeader();

    const res = await fetch(`${process.env.API}/site-profile`, {
        headers: {
            "Content-Type": "application/json",
            "X-Sign": credentialHeader.sign,
            "X-User-Id": credentialHeader.mitraid,
            "X-Timestamp": credentialHeader.timestamp.toString(),
        },
        next: {
            revalidate: 30,
        },
    });

    if (res.ok) {
        var data = await res.json();
        return data.data;
    }

    return undefined;
};

async function Page() {
    var data: ISiteProfile | undefined = await getData();
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
                            <BreadcrumbPage>
                                Syarat dan Ketentuan
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <div className="max-w-5xl w-full space-y-4">
                    <div className="bg-background rounded-lg p-4 w-full">
                        <h3 className="font-semibold text-red-800">
                            Syarat dan Ketentuan
                        </h3>
                    </div>
                    {data ? (
                        <div
                            className="px-4"
                            dangerouslySetInnerHTML={{
                                __html: data?.terms_condition,
                            }}
                        ></div>
                    ) : null}
                </div>
            </div>
        </div>
    );
}

export default Page;

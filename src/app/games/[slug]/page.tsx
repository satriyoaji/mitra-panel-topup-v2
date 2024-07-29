"use client";
import Loading from "@/app/loading";
import NotFound from "@/app/not-found";
import useCategory, { IUseCategoryData } from "./useCategory";
import DetailCategory from "./DetailCategory";

function Page({ params }: { params: { slug: string } }) {
  const data: IUseCategoryData = useCategory(params.slug);

  if (data.loading) return <Loading />;

  if (data.data.category === null) return <NotFound />;
  else if (data.data.category !== null && data.data.category !== undefined) {
    return (
      <div className="flex justify-center w-full">
        <div className="max-w-6xl w-full mb-12 sm:mb-0 mx-2 md:mx-0">
          <DetailCategory {...data} />
        </div>
      </div>
    );
  }
  return <NotFound />;
}

export default Page;

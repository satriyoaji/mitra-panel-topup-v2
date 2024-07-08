"use client";
import Loading from "@/app/loading";
import NotFound from "@/app/not-found";
import useCategory, { IUseCategoryData } from "./useCategory";
import V1DetailCategory from "./(v1)/V1DetailCategory";
import V2DetailCategory from "./(v2)/V2DetailCategory";
import { useContext } from "react";
import ThemeContext, {
    IThemeContext,
} from "@/infrastructures/context/theme/theme.context";

function Page({ params }: { params: { slug: string } }) {
    const data: IUseCategoryData = useCategory(params.slug);
    const { data: theme } = useContext(ThemeContext) as IThemeContext;

    console.log(theme);
    if (data.loading) return <Loading />;

    if (data.data.category === null) return <NotFound />;
    else if (data.data.category !== null && data.data.category !== undefined) {
        if (theme.version == "1") return <V1DetailCategory {...data} />;
        else return <V2DetailCategory {...data} />;
    }
    return <NotFound />;
}

export default Page;

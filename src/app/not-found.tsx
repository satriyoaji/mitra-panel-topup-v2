import { Button } from "@/components/ui/button";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { Fragment } from "react";

function NotFound() {
    return (
        <div className="h-[80vh] flex flex-col justify-center items-center">
            <h3 className="text-7xl font-black mt-4">404</h3>
            <h3 className="text-2xl mt-1">Page Not Found</h3>
            <Link className="my-3" href="/">
                <Button>Back to home</Button>
            </Link>
        </div>
    );
}

export default NotFound;

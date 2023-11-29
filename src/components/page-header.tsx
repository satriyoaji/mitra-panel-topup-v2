import Link from "next/link";
import React from "react";

function Header() {
    return (
        <header className="w-full z-50 flex justify-center max-w-xl sticky top-0 bg-red-500 items-center rounded-b-2xl">
            <Link href="/">
                <div className="font-extrabold text-xl p-2">Topmur.com</div>
            </Link>
        </header>
    );
}

export default Header;

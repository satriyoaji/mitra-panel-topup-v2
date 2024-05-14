import { nFormatter } from "@/Helpers";
import { Card } from "@/components/ui/card";
import React from "react";

function Stats() {
    return (
        <Card className="py-4 px-8 md:w-full bg-theme-secondary space-y-2 flex items-center justify-center">
            <div className="md:mx-4 md:grid md:grid-cols-2 gap-8">
                <div className="md:mb-4">
                    <p className="text-white text-sm font-semibold mt-4">
                        Dipercaya oleh gamers Indonesia
                    </p>
                    <p className="text-theme-primary-500 text-2xl mt-2 font-bold bg-theme-secondary-100 w-fit">
                        Termurah dan Terpercaya
                    </p>
                    <p className="text-slate-100 text-sm mt-1">
                        Menyediakan layanan Top up berbagai puluhan game dengan
                        ribuan produk dan Pulsa termurah dan terpercaya di
                        Indonesia.
                    </p>
                </div>
                <div>
                    <div className="grid grid-cols-3 mt-8 px-6 mb-4 rounded">
                        {/* <div className="flex flex-col items-center"> */}
                        <div>
                            <p className="font-semibold md:text-4xl text-2xl text-white">
                                {nFormatter(1000)}
                            </p>
                            <p className="font-semibold md:text-lg text-slate-100">
                                Pengguna
                            </p>
                        </div>
                        {/* <div className="flex flex-col items-center"> */}
                        <div>
                            <p className="font-semibold md:text-4xl text-2xl text-white">
                                {nFormatter(9230)}
                            </p>
                            <p className="font-semibold md:text-lg text-slate-100">
                                Produk
                            </p>
                        </div>
                        {/* <div className="flex flex-col items-center"> */}
                        <div>
                            <p className="font-semibold md:text-4xl text-2xl text-white">
                                {nFormatter(238000)}
                            </p>
                            <p className="font-semibold md:text-lg text-slate-100">
                                Transaksi
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
}

export default Stats;

"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { Cross1Icon, DownloadIcon } from "@radix-ui/react-icons";

function PWAAlert() {
    const [open, setOpen] = useState(true);
    if (open)
        return (
            <div className="bg-slate-50">
                <div className="flex flex-row items-start justify-center w-full">
                    <div className="w-full flex justify-between max-w-6xl items-center p-1 space-x-2">
                        <div className="flex items-center p-1 space-x-4">
                            <Button className="flex space-x-1" size="sm">
                                <DownloadIcon className="w-3 h-3" />
                                <p className="text-xs">Install</p>
                            </Button>
                            <p className="text-xs">
                                Akses cepat dari home screen
                            </p>
                        </div>
                        <div>
                            <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => setOpen(false)}
                            >
                                <Cross1Icon />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
}

export default PWAAlert;

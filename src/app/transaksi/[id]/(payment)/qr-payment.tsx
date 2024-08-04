"use client";
import { useCountdown } from "@/Hooks";
import { IQRPayment } from "@/types/transaction";
import React from "react";
import QRCode from "react-qr-code";

function QRPayment({ payment }: { payment: IQRPayment }) {
    if (payment.qr_code)
        return (
            <>
                <div className="flex justify-between w-full">
                    <p className="text-muted-foreground">QR Link</p>
                    <div className="flex flex-col items-end justify-end">
                        <p>{payment.payment_channel}</p>
                        <div
                            className="pt-2"
                            style={{
                                height: "auto",
                                margin: "0 auto",
                                maxWidth: 120,
                                width: "100%",
                            }}
                        >
                            <QRCode
                                size={256}
                                style={{
                                    height: "auto",
                                    maxWidth: "100%",
                                    width: "100%",
                                }}
                                value={payment.qr_code}
                                viewBox={`0 0 256 256`}
                            />
                        </div>
                    </div>
                </div>
            </>
        );
}

export default QRPayment;

import { useEffect, useState } from "react";

const useCountdown = (targetDate: string | number | Date) => {
    const countDownDate = new Date(targetDate).getTime();

    const [countDown, setCountDown] = useState(
        countDownDate - new Date().getTime()
    );

    useEffect(() => {
        const interval = setInterval(() => {
            setCountDown(countDownDate - new Date().getTime());
        }, 1000);

        return () => clearInterval(interval);
    }, [countDownDate]);

    return getReturnValues(countDown);
};

const getReturnValues = (countDown: number) => {
    // calculate time left
    const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
        (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60))
        .toString()
        .padStart(2, "0");
    const seconds = Math.floor((countDown % (1000 * 60)) / 1000)
        .toString()
        .padStart(2, "0");

    return [hours + days * 24, minutes, seconds];
};

const priceMask = (val: number | undefined, prefix: string | undefined) => {
    if (!val) return "";
    var number_string = val
            .toString()
            .replace(/[^,\d]/g, "")
            .toString(),
        split = number_string.split(","),
        sisa = split[0].length % 3,
        rupiah = split[0].substr(0, sisa),
        ribuan = split[0].substr(sisa).match(/\d{3}/gi);

    // tambahkan titik jika yang di input sudah menjadi angka ribuan
    if (ribuan) {
        const separator = sisa ? "." : "";
        rupiah += separator + ribuan.join(".");
    }

    rupiah = split[1] != undefined ? rupiah + "," + split[1] : rupiah;
    return prefix == undefined
        ? "Rp. " + rupiah
        : rupiah
        ? "Rp. " + rupiah
        : "";
};

export { useCountdown, priceMask };

import { useEffect, useState } from "react";
import { IProductCategory, TProduct } from "./Type";

const useCountdown = (targetDate: string | number | Date) => {
    const [countDownDate, _] = useState(new Date(targetDate).getTime());

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
    const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

    let isExpired = false;
    if (days == 0 && hours == 0 && minutes == 0 && seconds == 0)
        isExpired = true;

    return [
        hours + days * 24,
        minutes.toString().padStart(2, "0"),
        seconds.toString().padStart(2, "0"),
        isExpired,
    ];
};

const priceMask = (val: number | undefined, prefix: string | undefined) => {
    if (!val) val = 0;
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

const uniqeProduct = (arr: TProduct[], track = new Set()) =>
    arr.filter(({ uuid }) => (track.has(uuid) ? false : track.add(uuid)));

const uniqeCategory = (arr: IProductCategory[], track = new Set()) =>
    arr.filter(({ uuid }) => (track.has(uuid) ? false : track.add(uuid)));

function debounce<Params extends any[]>(
    func: (...args: Params) => any,
    timeout: number
): (...args: Params) => void {
    let timer: NodeJS.Timeout;
    return (...args: Params) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func(...args);
        }, timeout);
    };
}

export { useCountdown, priceMask, uniqeProduct, uniqeCategory, debounce };

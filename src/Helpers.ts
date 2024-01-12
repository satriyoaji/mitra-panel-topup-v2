import { IProductCategory, TProduct } from "./Type";

const priceMask = (val: number | undefined) => {
    if (!val) return "Rp 0";
    val = Math.round(val);
    return (
        "Rp " + val.toString().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1.")
    );
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

export { priceMask, uniqeProduct, uniqeCategory, debounce };

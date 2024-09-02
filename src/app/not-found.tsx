import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

function NotFound() {
  return (
    <div className="h-[80vh] flex flex-col justify-center items-center">
      <Image
        src={
          "/assets/illustration/DrawKit Larry Character Illustration (1).svg"
        }
        alt="dw"
        width={500}
        height={500}
      />
      <h3 className="text-4xl -mt-14 font-bold">Halaman Tidak Ditemukan</h3>
      <Link className="mb-3 mt-12" href="/">
        <Button>Kembali Ke Beranda</Button>
      </Link>
    </div>
  );
}

export default NotFound;

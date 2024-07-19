import { memo } from "react";
import Image from 'next/image';
import Link from "next/link";

const Header = () => (
    <div className="global-padding w-5/6 p-3 text-lg flex justify-center bg-white/80 rounded-xl items-center">
        <Link href="/home" className="flex justify-start items-center gap-2 cursor-pointer">
            <Image
                src="/logo.jpeg"
                alt="Dummy Image"
                width={50}
                height={20}
                className="rounded-3xl shadow-lg"
            />
            <p>Click Sale</p>
        </Link>
        {/* <h1>Server Dev test nenenene</h1> */}
    </div>
)

export default memo(Header)
import { memo } from "react";
import Image from 'next/image';
import Link from "next/link";

const Header = () => (
    <div className="global-padding w-full py-5 bg-blue-800 text-white text-lg flex justify-between items-center">
        <Link href="/home" className="flex justify-start items-center gap-2 w-1/6 cursor-pointer">
            <Image
                src="/logo.jpeg"
                alt="Dummy Image"
                width={50}
                height={20}
                className="rounded-3xl shadow-lg"
            />
            <p className="">Click Sale</p>
        </Link>
        <h1>Server Dev test nenenene</h1>
        <div className="w-1/6 flex justify-end items-center">
            icons
        </div>
    </div>
)

export default memo(Header)
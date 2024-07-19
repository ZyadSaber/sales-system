import { memo, useState } from "react";
import Link from 'next/link';
import { useFetch } from "@/hooks";
import { RecordWithAnyData } from "@/types"

const MenuItems = () => {
    const [openMenu, setOpenMenu] = useState<number | null>(null);

    const toggleMenu = (parentIndex: number) => () => {
        setOpenMenu(openMenu === parentIndex ? null : parentIndex);
    };

    const { data } = useFetch({
        apiId: "QUERY_SIDE_BAR_MENU_ITEMS",
        fetchOnFirstRun: true
    })

    return (
        <nav className="mt-4 w-full h-screen text-gray-800">
            <ul>
                {data && data.map(({ page_parent_name, page_parent_id, app_pages }: RecordWithAnyData) => (
                    <li className="relative" key={page_parent_id}>
                        <button
                            onClick={toggleMenu(page_parent_id)}
                            className="w-full text-left p-4 hover:bg-gray-100 rounded-md focus:outline-none"
                        >
                            {page_parent_name}
                        </button>
                        {openMenu === page_parent_id && (
                            <ul className="pl-4">
                                {app_pages.map(({ page_name, page_id, page_link }: RecordWithAnyData) => (
                                    <li key={page_id}>
                                        <Link href={`/${page_link}`}>
                                            <div className="block p-2.5 hover:bg-gray-100 rounded-sm">{page_name}</div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default memo(MenuItems)
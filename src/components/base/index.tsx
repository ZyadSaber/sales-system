'use client'
import { usePathname } from "next/navigation"
import Header from "./partials/header";
import Footer from "./partials/footer";
import MenuItems from "./partials/menuItems"

const BasePage = ({ children }: any) => {
    const pathName = usePathname();
    const hideHeaderFooter = pathName === "/"

    return (
        !hideHeaderFooter ? (
            <div className="flex h-screen">
                <div className="w-1/6 bg-blue-400 p-4">
                    <div className="w-full h-full overflow-auto  justify-between flex flex-col p-3 bg-gray-200 rounded-2xl items-center">
                        <Header />
                        <MenuItems />
                        <Footer />
                    </div>
                </div>
                <div className="h-full w-5/6">
                    {children}
                </div>
            </div>
        ) : children
    )
}

export default BasePage
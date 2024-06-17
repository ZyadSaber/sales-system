'use client'
import { usePathname } from "next/navigation"
import Header from "./partials/header";
import Footer from "./partials/footer";

const BasePage = ({ children }: any) => {
    const pathName = usePathname();
    const hideHeaderFooter = pathName === "/"

    return (
        !hideHeaderFooter ? (
            <div className="flex h-screen justify-between flex-col">
                <Header />
                <div className="h-full">
                    {children}
                </div>
                <Footer />
            </div>
        ) : children
    )
}

export default BasePage
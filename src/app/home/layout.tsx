import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Home Page",
    description: "Click Sales Home Page",
};

const LayOut = ({
    children,
    notification,
    shortcuts
}: {
    children: React.ReactNode;
    notification: React.ReactNode;
    shortcuts: React.ReactNode;
}) => (
    <div className="p-3 h-full">
        {children}
        <div className="flex gap-2 w-full">
            <div className="w-4/6 bg-red-300">
                {shortcuts}
            </div>
            <div className="w-2/6">
                {notification}
            </div>
        </div>
    </div>
)

export default LayOut
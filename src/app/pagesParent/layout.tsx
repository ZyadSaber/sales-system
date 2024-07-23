import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Pages Parent",
    description: "Click Sales Pages Parent Page",
};

const LayOut = ({
    children,
}: {
    children: React.ReactNode;
}) => (
    <div className="p-3">
        {children}
    </div>
)

export default LayOut
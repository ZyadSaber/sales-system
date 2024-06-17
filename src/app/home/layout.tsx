import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Home Page",
    description: "Click Sales Home Page",
};

const LayOut = ({ children }: {
    children: React.ReactNode;
}) => (
    children
)

export default LayOut
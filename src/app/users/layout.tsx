import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Users Page",
    description: "Click Sales Users Page",
};

const LayOut = ({ children }: {
    children: React.ReactNode;
}) => (
    children
)

export default LayOut
'use client'

import { memo } from "react";
import createNotification from "@/components/notification";

const UsersPage = () => {



    const handle = () => {
        createNotification()
    }

    return (
        <>
            <h1>users page</h1>
            <button onClick={handle}>click me</button>
        </>
    )
}

export default memo(UsersPage)
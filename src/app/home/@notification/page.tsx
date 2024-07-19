import { memo } from "react";

const Notification = () => {
    return (
        <div className="rounded-xl border bg-card text-card-foreground shadow col-span-3">
            <div className="flex flex-col space-y-1.5 p-6">
                <h3 className="font-semibold leading-none tracking-tight">Notifications</h3>
                <p className="text-sm text-muted-foreground">You have 265 unread notifications.</p>
            </div>
            <div className="p-6 pt-0">
                <div className="space-y-8">
                    <div className="flex items-center">
                        <span className="relative flex shrink-0 overflow-hidden rounded-full h-9 w-9">
                            {/* <img className="aspect-square h-full w-full" alt="Avatar" src="/avatars/01.png"> */}
                        </span>
                        <div className="ml-4 space-y-1">
                            <p className="text-sm font-medium leading-none">Olivia Martin</p>
                            <p className="text-sm text-muted-foreground">olivia.martin@email.com</p>
                        </div>
                        <div className="ml-auto font-medium">+$1,999.00</div>
                    </div>
                    <div className="flex items-center">
                        <span className="relative shrink-0 overflow-hidden rounded-full flex h-9 w-9 items-center justify-center space-y-0 border">
                            {/* <img className="aspect-square h-full w-full" alt="Avatar" src="/avatars/02.png"> */}
                        </span>
                        <div className="ml-4 space-y-1">
                            <p className="text-sm font-medium leading-none">Jackson Lee</p>
                            <p className="text-sm text-muted-foreground">jackson.lee@email.com</p>
                        </div>
                        <div className="ml-auto font-medium">+$39.00</div>
                    </div>
                    <div className="flex items-center">
                        <span className="relative flex shrink-0 overflow-hidden rounded-full h-9 w-9">
                            {/* <img className="aspect-square h-full w-full" alt="Avatar" src="/avatars/03.png"> */}
                        </span>
                        <div className="ml-4 space-y-1">
                            <p className="text-sm font-medium leading-none">Isabella Nguyen</p>
                            <p className="text-sm text-muted-foreground">isabella.nguyen@email.com</p>
                        </div>
                        <div className="ml-auto font-medium">+$299.00</div>
                    </div>
                    <div className="flex items-center">
                        <span className="relative flex shrink-0 overflow-hidden rounded-full h-9 w-9">
                            {/* <img className="aspect-square h-full w-full" alt="Avatar" src="/avatars/04.png"> */}
                        </span>
                        <div className="ml-4 space-y-1">
                            <p className="text-sm font-medium leading-none">William Kim</p>
                            <p className="text-sm text-muted-foreground">will@email.com</p>
                        </div>
                        <div className="ml-auto font-medium">+$99.00</div>
                    </div>
                    <div className="flex items-center">
                        <span className="relative flex shrink-0 overflow-hidden rounded-full h-9 w-9">
                            {/* <img className="aspect-square h-full w-full" alt="Avatar" src="/avatars/05.png"> */}
                        </span>
                        <div className="ml-4 space-y-1">
                            <p className="text-sm font-medium leading-none">Sofia Davis</p>
                            <p className="text-sm text-muted-foreground">sofia.davis@email.com</p>
                        </div>
                        <div className="ml-auto font-medium">+$39.00</div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default memo(Notification)
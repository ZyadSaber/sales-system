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
        <Drawer variant="permanent" open={open}>
            <Toolbar
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    px: [1],
                }}
            >
                <div className='w-full'>
                    <Link href="/home" className="flex justify-start items-center gap-2 cursor-pointer">
                        <Image
                            src="/logo.jpeg"
                            alt="Dummy Image"
                            width={50}
                            height={20}
                            className="rounded-3xl shadow-lg"
                        />
                        <p>Click Sale</p>
                    </Link>
                </div>
                <IconButton onClick={toggleDrawer}>
                    <ChevronLeftIcon />
                </IconButton>
            </Toolbar>
            <Divider />
            <List component="nav">
                <React.Fragment>
                    <ListItemButton>
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItemButton>
                    <ListItemButton>
                        <ListItemIcon>
                            <ShoppingCartIcon />
                        </ListItemIcon>
                        <ListItemText primary="Orders" />
                    </ListItemButton>
                    <ListItemButton>
                        <ListItemIcon>
                            <PeopleIcon />
                        </ListItemIcon>
                        <ListItemText primary="Customers" />
                    </ListItemButton>
                    <ListItemButton>
                        <ListItemIcon>
                            <BarChartIcon />
                        </ListItemIcon>
                        <ListItemText primary="Reports" />
                    </ListItemButton>
                    <ListItemButton>
                        <ListItemIcon>
                            <LayersIcon />
                        </ListItemIcon>
                        <ListItemText primary="Integrations" />
                    </ListItemButton>
                </React.Fragment>
                <Divider sx={{ my: 1 }} />
                <React.Fragment>
                    <ListSubheader component="div" inset>
                        Saved reports
                    </ListSubheader>
                    <ListItemButton>
                        <ListItemIcon>
                            <AssignmentIcon />
                        </ListItemIcon>
                        <ListItemText primary="Current month" />
                    </ListItemButton>
                    <ListItemButton>
                        <ListItemIcon>
                            <AssignmentIcon />
                        </ListItemIcon>
                        <ListItemText primary="Last quarter" />
                    </ListItemButton>
                    <ListItemButton>
                        <ListItemIcon>
                            <AssignmentIcon />
                        </ListItemIcon>
                        <ListItemText primary="Year-end sale" />
                    </ListItemButton>
                </React.Fragment>
            </List>
        </Drawer>
    )
}

export default memo(MenuItems)
// <nav className="mt-4 w-full h-screen text-gray-800">
//     <ul>
//         {data && data.map(({ page_parent_name, page_parent_id, app_pages }: RecordWithAnyData) => (
//             <li className="relative" key={page_parent_id}>
//                 <button
//                     onClick={toggleMenu(page_parent_id)}
//                     className="w-full text-left p-4 hover:bg-gray-100 rounded-md focus:outline-none"
//                 >
//                     {page_parent_name}
//                 </button>
//                 {openMenu === page_parent_id && (
//                     <ul className="pl-4">
//                         {app_pages.map(({ page_name, page_id, page_link }: RecordWithAnyData) => (
//                             <li key={page_id}>
//                                 <Link href={`/${page_link}`}>
//                                     <div className="block p-2.5 hover:bg-gray-100 rounded-sm">{page_name}</div>
//                                 </Link>
//                             </li>
//                         ))}
//                     </ul>
//                 )}
//             </li>
//         ))}
//     </ul>
// </nav>
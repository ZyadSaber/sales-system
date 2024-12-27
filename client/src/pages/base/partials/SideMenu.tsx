import { Link } from "react-router-dom"
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LoadingOverlay from "../../../components/loading-overlay"
import { useAppConfig } from "../../../context/auth"
import { useFetch, useFormManager } from './../../../hooks';
import { initialState } from "../constants"
import { RecordWithAnyValue } from "../../../types";

const SideMenu = () => {
    const {
        values: {
            menuTree,
            expandedRow
        },
        handleChange
    } = useFormManager({
        initialValues: initialState
    })

    const { state } = useAppConfig()
    const {
        site_name,
        default_page,
        branch_name
    } = state || {}

    const { loading } = useFetch({
        apiId: "GET_MENU_TREE",
        callOnFirstRender: true,
        onResponse: ({ apiValues, error }) => {
            !error && handleChange({ name: "menuTree", value: apiValues })
        }
    })

    const handleExpand = (key: number) => () => {
        if (expandedRow === key)
            handleChange({ name: "expandedRow", value: undefined })
        else
            handleChange({ name: "expandedRow", value: key })
    }

    return (
        <div className="w-1/6 h-screen px-2 py-4 bg-slate-800 text-slate-100 ">
            <LoadingOverlay loading={loading}>
                <div className="flex items-center justify-center flex-col gap-1.5 mb-5">
                    <Link to={`/${default_page}`} >
                        <img src="/logo.png" alt="" width={90} className="border-4 rounded-full " />
                    </Link>
                    <h1 className="font-bold text-3xl ">{site_name}</h1>
                    <p>Branch: {branch_name}</p>
                </div>
                <div className="overflow-x-auto h-3/5">
                    {
                        menuTree.map(({ parent_id, parent_name, linked_page }: RecordWithAnyValue, index: number) => (
                            <Accordion onChange={handleExpand(index)} expanded={expandedRow === index} className="p-0" key={parent_id} >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                    className="bg-slate-700 text-white font-semibold"
                                >
                                    <Typography>{parent_name}</Typography>
                                </AccordionSummary>
                                <AccordionDetails className="bg-gray-800 text-white font-semibold flex flex-col gap-2 px-2">
                                    {linked_page.map((item: RecordWithAnyValue) =>
                                        <Link to={`${item.page_path}`} className="w-full bg-slate-700 px-3 py-1 rounded hover:bg-slate-500 transition" key={item.page_id}>{item.page_name}</Link>
                                    )}
                                </AccordionDetails>
                            </Accordion>
                        ))
                    }
                </div>

            </LoadingOverlay>
        </div>
    )
}

export default SideMenu
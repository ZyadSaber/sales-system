import { memo } from "react";
import { useAppConfig } from "../../context/auth";

const DashBoardPage = () => {
    const dd = useAppConfig()

    return (
        <div>
            <h1>Dashboard</h1>
            <button onClick={() => console.log(dd)}>dd</button>
        </div>
    );
};
export default memo(DashBoardPage);
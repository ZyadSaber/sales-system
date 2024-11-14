import { Outlet, useLocation } from "react-router-dom";
import { AppConfigProvider } from "../../context/auth";
import SideMenu from "./partials/SideMenu";

const BasePage = () => {
  const path = useLocation().pathname;

  return (
    <AppConfigProvider>
      {
        path === "/" ?
          <Outlet /> :
          <div className="flex">
            <SideMenu />
            <div className="w-5/6 p-1.5 max-h-screen overflow-y-auto bg-slate-100">
              <Outlet />
            </div>
          </div>
      }

    </AppConfigProvider>
  )
};

export default BasePage;

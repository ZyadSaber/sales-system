import { Outlet } from "react-router-dom";
import { AppConfigProvider } from "../../context/auth";

const BasePage = () => (
  <AppConfigProvider>
    <Outlet />
  </AppConfigProvider>
);

export default BasePage;

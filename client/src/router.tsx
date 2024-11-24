import { createBrowserRouter } from "react-router-dom";
import BasePage from "./pages/base";
import SignInPage from "./pages/sign-in";
import NotFoundPage from "./pages/not-found";
import DashBoardPage from "./pages/dash-board";
import CustomersPage from "./pages/customers";
import PageParentSetup from "./pages/page-parent-setup";
import PagesSetupPage from "./pages/pages-setup";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <BasePage />,
    children: [
      {
        index: true,
        element: <SignInPage />,
      },
      {
        path: "dashBoard",
        element: <DashBoardPage />,
      },
      {
        path: "customers",
        element: <CustomersPage />,
      },
      {
        path: "pageParentSetup",
        element: <PageParentSetup />,
      },
      {
        path: "pagesSetup",
        element: <PagesSetupPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />
  }
]);

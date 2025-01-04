import { createBrowserRouter } from "react-router-dom";
import BasePage from "./pages/base";
import SignInPage from "./pages/sign-in";
import NotFoundPage from "./pages/not-found";
import DashBoardPage from "./pages/dash-board";
import CustomersPage from "./pages/customers";
import PageParentSetup from "./pages/page-parent-setup";
import PagesSetupPage from "./pages/pages-setup";
import SuppliersPage from "./pages/suppliers";
import ItemsSetupPage from "./pages/items"
import BeginningBalancePage from "./pages/beginning-balance";
import InvoiceMaster from "./pages/invoice-master"
import InvoiceSearch from "./pages/invoice-search"
import ItemReport from "./pages/item-report"

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
      {
        path: "suppliers",
        element: <SuppliersPage />,
      },
      {
        path: "itemsSetup",
        element: <ItemsSetupPage />,
      },
      {
        path: "itemsBeginningBalance",
        element: <BeginningBalancePage />,
      },
      {
        path: "invoices/:type",
        element: <InvoiceMaster />,
      },
      {
        path: "invoiceSearch/:search_type",
        element: <InvoiceSearch />,
      },
      {
        path: "itemReport",
        element: <ItemReport />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />
  }
]);

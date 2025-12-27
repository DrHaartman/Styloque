import Header from "./Header";
import { Outlet } from "react-router-dom";

function Layout() {
    return (
          <main className="p-2.5 max-w-x1 mx-4 bg-grey-100 rounded-lg ">
            <Header />
            <Outlet />
        </main>
    );
}

export default Layout;
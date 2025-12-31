import Header from "./Header";
import { Outlet } from "react-router-dom";

function Layout() {
    return (
    <div className="min-h-screen bg-blue-100">
        <Header /> 

        <main className="p-4 max-w-5xl mx-auto">
            <Outlet />
        </main>
    </div>
);
}
export default Layout;
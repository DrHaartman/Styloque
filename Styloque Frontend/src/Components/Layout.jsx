import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer"

function Layout() {
    return (
    <div className="min-h-screen bg-blue-100">
        <Header /> 
        <main className="p-4 mx-auto">
            <Outlet />
        </main>
        <Footer />
    </div>
);
}
export default Layout;
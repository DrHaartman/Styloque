import { Link } from "react-router-dom";

function Header() {
    return (
        <header className="flex justify-between mx-2">
            <Link to="/" className="text-black text-lg font-bold">My Blog</Link>
            <nav className="flex justify between gap-4 text-grey-100 text-sm font-medium">
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
            </nav>
        </header>
    );
}

export default Header;


function Login() {
    return (
        <form className="max-w-md shadow mx-auto my-6 bg-gray-200 p-4 rounded-lg">
            <h1 className="text-center text-xl font-bold mb-4">Log In</h1>
            <input type="text" placeholder="Username" className="w-full p-2 mb-2 border border-gray-300 rounded" />
            <input type="password" placeholder="Password" className="w-full p-2 mb-2 border border-gray-300 rounded" />
            <button type="submit" className="cursor-pointer hover:bg-gray-600 w-full bg-gray-900 text-white p-2 rounded">Log In</button>
        </form>
    );
}

export default Login;
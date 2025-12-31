import Post from "../post";
import { useEffect, useState } from "react";

function HomePage() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    const fetchPosts = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:5000/api/posts/post');

            // Check if the network request was successful
            if (response.ok) {
                const posts = await response.json(); // 2. Parse the JSON
                setPosts(posts);                     // 3. Update state
                setLoading(false);
                console.log("Posts fetched successfully");
            } else {
                console.log("Failed to fetch posts: Server error");
            }
        } catch (error) {
            console.log("Failed to fetch posts: Network error/Server offline");
            setLoading(false);
            alert("Failed to load, server might be offline!");
        }
    };

    fetchPosts();
}, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="bg-slate-500 text-white px-6 py-3 rounded-lg animate-pulse">
                    Loading posts...
                </div>
            </div>
        );
    }

    if (!posts) return <div>Post not found.</div>;

    return (
        <div>
            {posts.length > 0 && posts.map(post => (
            <Post key={post._id}{...post}/>
            ))}
        </div>
    );
}

export default HomePage;   
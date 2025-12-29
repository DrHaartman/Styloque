import Post from "../post";
import { useEffect, useState } from "react";

function HomePage() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
    const fetchPosts = async () => {
        try {
            const response = await fetch('http://localhost:5000/post');

            // Check if the network request was successful
            if (response.ok) {
                const posts = await response.json(); // 2. Parse the JSON
                setPosts(posts);                     // 3. Update state
                console.log("Posts fetched successfully");
            } else {
                console.log("Failed to fetch posts: Server error");
            }
        } catch (error) {
            console.log("Failed to fetch posts: Network error/Server offline");
        }
    };

    fetchPosts();
}, []);

    return (
        <div>
            {posts.length > 0 && posts.map(post => (
            <Post key={post._id}{...post}/>
            ))}
        </div>
    );
}

export default HomePage;   
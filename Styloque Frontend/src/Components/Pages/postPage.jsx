import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


function PostPage({}) {

    const [postInfo, setPostInfo] = useState(null);

    const { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:5000/post/${id}`)
        .then(response => response.json())
        .then(postInfo => {
            setPostInfo(postInfo);
        });
        
    }, []);



    return (
        <div>
            <h1>PostPage</h1>
        </div>
    );
}   

export default PostPage;
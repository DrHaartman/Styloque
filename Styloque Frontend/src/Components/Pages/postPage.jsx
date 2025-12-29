import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { userContext } from "./userContext"; 
import { Link } from "react-router-dom";


function PostPage({}) {

    const [postInfo, setPostInfo] = useState(null);
    const {userInfo} = useContext(userContext);

    const { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:5000/post/${id}`)
        .then(response => response.json())
        .then(postInfo => {
            setPostInfo(postInfo);
        });
        
    }, []);


    if(!postInfo) return '';


    return (
        <div>
            <h1 className="text-3xl font-bold my-4 items-center">{postInfo.title}</h1>
            <div>
                <div>By: {postInfo.author.username}</div>
                <time> {format(new Date(postInfo.createdAt), "MMM d, yyyy  HH:mm")}</time>
            </div>
            {userInfo && userInfo.id === postInfo.author._id && (
                <div className="mt-4">
                    <Link to={`/edit/${postInfo._id}`} className="bg-blue-500 text-white px-4 py-2 rounded">Edit Post</Link>
                </div>
            )}
            <div className="max-h-96 cover-image overflow-hidden">
                <img src={`http://localhost:5000/${postInfo.coverImagePath}`} alt={postInfo.title} />
            </div>
            <div className="my-4 leading-relaxed text-lg">
                <div dangerouslySetInnerHTML={{__html: postInfo.content}} />
            </div>
        </div>
    );
}   

export default PostPage;
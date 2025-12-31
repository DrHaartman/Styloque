import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import { userContext } from "./userContext"; 
import { Link } from "react-router-dom";


function PostPage({}) {
    const Navigate = useNavigate();
    const [postInfo, setPostInfo] = useState(null);
    const {userInfo} = useContext(userContext);

    function goBack(){
        Navigate(-1);
    }

    const { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:5000/api/posts/post/${id}`)
        .then(response => response.json())
        .then(postInfo => {
            setPostInfo(postInfo);
        });
        
    }, []);


    if(!postInfo) return '';


    return (
        <div className=" w-full mx-auto p-4">
            <div className="text-3xl font-bold flex justify-center my-4 items-center" >
                <h1>{postInfo.title}</h1>
            </div>
            <div className="text-gray-600 gap-2 text-center">
                <div>By: {postInfo.author.username}</div>
                <time> {format(new Date(postInfo.createdAt), "MMM d, yyyy  HH:mm")}</time>
            </div>
            {userInfo && userInfo.id === postInfo.author._id && (
                <div className="text-white bg-gray-900 px-4 inline-text-center w-full flex justify-center py-2 rounded hover:bg-gray-700">
                    <Link to={`/edit/${postInfo._id}`}>Edit Post</Link>
                </div>
            )}
            <div className="max-h-90 cover-image overflow-hidden my-4 flex justify-center">
                <img src={`http://localhost:5000/${postInfo.coverImagePath}`} alt={postInfo.title} />
            </div>
            <div className=" mx-2 my-4 leading-relaxed text-lg break-words">
                <div dangerouslySetInnerHTML={{__html: postInfo.content}} />
            </div>
            <button className="cursor-pointer hover:bg-gray-300 w-full bg-gray-200 text-black p-2 rounded py-2" onClick={goBack}>Back</button>
        </div>
    );
}   

export default PostPage;
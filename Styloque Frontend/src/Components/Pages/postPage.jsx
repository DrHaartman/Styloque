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
        Navigate('/');
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
                <div className="text-center w-full">
                    <Link to={`/edit/${postInfo._id}`} className="hover:bg-blue-400 inline-block bg-blue-300 text-white px-6 py-2 rounded">Edit Post</Link>
                </div>
            )}
            <div className="max-h-90 cover-image overflow-hidden my-4 flex justify-center">
                <img src={`http://localhost:5000/${postInfo.coverImagePath}`} alt={postInfo.title} />
            </div>
            <div className=" mx-2 my-4 text-centre leading-relaxed text-lg break-words">
                <div dangerouslySetInnerHTML={{__html: postInfo.content}} />
            </div>
            <div className="text-center w-full" >
                <button className="inline-block hover:bg-gray-700 bg-gray-600 text-white px-6 py-2 rounded" onClick={goBack}>Back</button>
            </div>
        </div>
    );
}   

export default PostPage;
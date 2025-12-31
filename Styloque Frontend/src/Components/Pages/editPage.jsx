import ReactQuill from "react-quill-new";
import 'react-quill-new/dist/quill.snow.css';
import {useState, useEffect} from 'react';
import { Navigate, useParams } from "react-router-dom";


function EditPage() {
    const {id} = useParams();
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');
    const [redirect, setRedirect] = useState(false);

    function goBack(){
        navigate(-1);
    }


    const modules ={
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline','strike', 'blockquote'],
            [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
            ['link', 'image'],
            ['clean']
        ]
    };

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'indent',
        'link', 'image'
    ];
    useEffect(() => {
        fetch(`http://localhost:5000/api/posts/post/${id}`)
        .then(response => response.json())
        .then(postInfo => {
            setTitle(postInfo.title);
            setSummary(postInfo.summary);
            setContent(postInfo.content);
        });
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('summary', summary);
        formData.append('content', content);
        if (files && files.length > 0) {
            formData.append('file', files[0]);
        }

        const response = await fetch(`http://localhost:5000/api/posts/post/${id}`, {
            method: 'PUT',
            body: formData,
            credentials: 'include'
        });

        if (response.ok) {
            setRedirect(true);
        }
    };

    if(redirect){
        return <Navigate to={`/post/${id}`} />;
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="text" 
                        placeholder="Title" 
                        value={title} 
                        onChange={e => setTitle(e.target.value)} 
                        className="w-full border border-gray-300 rounded-md my-2 p-2"/>
                <input type="text"  
                        placeholder="Enter post summary" 
                        value={summary} 
                        onChange={e => setSummary(e.target.value)} 
                        className="w-full border border-gray-300 rounded-md my-2 p-2"/>
                <input type="file" 
                        onChange={e => setFiles(e.target.files)}
                        className="w-full border border-gray-300 rounded-md my-2 p-2 cursor-pointer" />
                <ReactQuill value={content} 
                        onChange={newContent => setContent(newContent)} 
                        modules={modules} 
                        formats={formats}
                        className="w-full  rounded-md my-2 p-2"/>
                <div className="mt-4 flex justify-between gap-2 text-center w-full">
                        <button className="inline-block cursor-pointer hover:bg-green-600 w-full bg-green-300 text-white p-2 rounded">Update post</button>
                        <button className="inline-block cursor-pointer hover:bg-gray-300 w-full bg-gray-200 text-black p-2 rounded py-2" onClick={goBack}>Back</button>
                </div>
            </form>
        </>
    );
}

export default EditPage;
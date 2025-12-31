import ReactQuill from "react-quill-new";
import 'react-quill-new/dist/quill.snow.css';
import {useState} from 'react';
import { Navigate } from "react-router-dom";


function CreatePost() {
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');
    const [redirect, setRedirect] = useState(false);

    function goBack(){
        setRedirect(true);
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

    const handleSubmit = async (e) => {

        const formData = new FormData();
        formData.append('title', title);
        formData.append('summary', summary);
        formData.append('content', content);
        formData.append('files', files[0]);


        e.preventDefault();
        console.log(files);
        const response = await fetch('http://localhost:5000/api/posts/post', {
            method: 'POST',
            body: formData,
            credentials: 'include'
        }); 
        if(response.ok){
            alert("Post created successfully!");
            setTitle('');
            setSummary('');
            setContent('');
            setFiles(null);
            setRedirect(true);
        } else {
            alert("Failed to create post. Fill all the fields");
        }}



        if(redirect){
            return <Navigate to={'/'} />
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
                        className="w-full border border-gray-300 rounded-md my-2 p-2 cursor-pointer"/>
                <ReactQuill value={content} 
                        onChange={newContent => setContent(newContent)} 
                        modules={modules} 
                        formats={formats}
                        className="w-full  rounded-md my-2 p-2"/>
                <button className="cursor-pointer hover:bg-green-600 w-full bg-green-300 text-white p-2 rounded">Create post</button>
                <button className="cursor-pointer hover:bg-gray-300 w-full bg-gray-200 text-black p-2 rounded py-2" onClick={goBack}>Back</button>
            </form>
        </>
    );
}

export default CreatePost;
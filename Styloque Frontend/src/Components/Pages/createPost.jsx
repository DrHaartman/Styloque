import ReactQuill from "react-quill-new";
import 'react-quill-new/dist/quill.snow.css';
import {useState} from 'react';
import { Navigate } from "react-router-dom";
import { set } from "mongoose";


function CreatePost() {
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');
    const [redirect, setRedirect] = useState(false);


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
        const response = await fetch('http://localhost:5000/post', {
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
                        onChange={e => setTitle(e.target.value)} />
                <input type="text"  
                        placeholder="Enter post summary" 
                        value={summary} 
                        onChange={e => setSummary(e.target.value)} />
                <input type="file" 
                        onChange={e => setFiles(e.target.files)} />
                <ReactQuill value={content} 
                        onChange={newContent => setContent(newContent)} 
                        modules={modules} 
                        formats={formats}/>
                <button>Create post</button>
            </form>
        </>
    );
}

export default CreatePost;
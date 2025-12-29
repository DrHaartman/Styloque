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
        fetch(`http://localhost:5000/post/${id}`)
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

        const response = await fetch(`http://localhost:5000/post/${id}`, {
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
                <button>Update post</button>
            </form>
        </>
    );
}

export default EditPage;
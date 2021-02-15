import React, {useState} from 'react';

const BlogForm = ({addBlog}) => {

    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [url, setUrl] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        const newBlog = {
            title,
            author,
            url,
        }
        addBlog(newBlog)
    }

    return (
        <div onSubmit={(e) => handleSubmit(e)}>
            <form>
                <div>
                    <input type="text" placeholder={"Title"} value={title} onChange={(e) => setTitle(e.target.value)}/>
                </div>
                <div>
                    <input type="text" placeholder={"Author"} value={author} onChange={(e) => setAuthor(e.target.value)}/>
                </div>
                <div>
                    <input type="text" placeholder={"URL"} value={url} onChange={(e) => setUrl(e.target.value)}/>
                </div>
                <button type={"submit"}>Submit</button>
            </form>
        </div>
    );
};

export default BlogForm;

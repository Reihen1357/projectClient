import React, {ChangeEvent, FC, useState} from 'react';
import {create} from "../Api/PostApi";

interface PostFormProps {
    createdPost: () => void
}

const PostForm:FC<PostFormProps>= ({createdPost}) => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }
    const handleContentChange = (e: ChangeEvent<HTMLInputElement>) => {
        setContent(e.target.value)
    }
    const addPost = () => {
        create({title, content}).then(createdPost)
    }


    return (
        <form>
            <input
                value={title}
                onChange={handleTitleChange}
            />
            <input
                value={content}
                onChange={handleContentChange}
            />
            <button
                onClick={addPost}
                type='button'
            >
                Добавить пост
            </button>
        </form>
    );
};

export default PostForm;
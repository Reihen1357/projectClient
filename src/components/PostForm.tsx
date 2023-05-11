import React, { ChangeEvent, FC, useState } from "react";
import { create } from "../Api/PostApi";
import { IPost } from "../types/types";

interface PostFormProps {
  createdPost: () => void;
}

const PostForm: FC<PostFormProps> = ({ createdPost }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleContentChange = (e: ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };
  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      const file = e.target.files[0];
      setImage(file);
    }
  };
  const addPost = () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (image !== null) {
      formData.append("image", image);
    }
    create(formData as unknown as Partial<IPost>).then(createdPost);
  };

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
      <input
        type="file"
        onChange={handleFile}
      />
      <button
        onClick={addPost}
        type="button"
      >
        Добавить пост
      </button>
    </form>
  );
};

export default PostForm;

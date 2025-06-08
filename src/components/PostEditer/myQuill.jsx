import React, { useRef, useEffect } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const MyQuill = ({ content, setContent, placeholder }) => {
    const quillRef = useRef(null);

    useEffect(() => {
        const quill = quillRef.current.getEditor();

        const handleBlur = () => {
            const html = quill.root.innerHTML;
            setContent(html);
        };

        quill.root.addEventListener("blur", handleBlur);

        return () => {
            quill.root.removeEventListener("blur", handleBlur);
        };
    }, [setContent]);

    return (
        <ReactQuill
            ref={quillRef}
            theme="snow"
            defaultValue={content}
            placeholder={placeholder}
            style={{ width: "100%" }}
        />
    );
};

export default MyQuill;
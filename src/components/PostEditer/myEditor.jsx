import React, { useRef, useEffect } from 'react';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import { uploadImageToS3 } from '../../utils/imageUpload';

const MyEditor = ({ content, setContent, placeholder }) => {
    const editorRef = useRef();

    const handleChange = () => {
        const markdown = editorRef.current?.getInstance()?.getMarkdown();
        setContent(markdown);
    };

    const handleImageUpload = async (blob, callback) => {
        try {
            const imageUrl = await uploadImageToS3(blob);
            callback(imageUrl, 'image');
        } catch (error) {
            console.error('이미지 업로드 실패:', error);
            alert('이미지 업로드에 실패했습니다.');
        }
    };

    useEffect(() => {
        const editorInstance = editorRef.current?.getInstance();

        // 마운트 후 강제로 빈 마크다운 설정
        if (editorInstance && !content) {
            editorInstance.setMarkdown('');
        }
    }, []);

    return (
        <Editor
            ref={editorRef}
            initialValue={content || ''}
            previewStyle="vertical"
            height="20rem"
            initialEditType="wysiwyg"
            useCommandShortcut={true}
            placeholder={placeholder}
            onChange={handleChange}
            hooks={{
                addImageBlobHook: handleImageUpload,
            }}
        />
    );
};

export default MyEditor;
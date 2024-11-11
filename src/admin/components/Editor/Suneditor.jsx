import { useRef } from "react";
import SunEditor from "suneditor-react";


const Editor = ({ onChange,placeholder,name, }) => {
  const editorRef = useRef();

  const handleEditorChange = (content) => {
    if (onChange) onChange(content);
  };

  return (
    <SunEditor
      ref={editorRef}
      onChange={handleEditorChange}
      setOptions={{
        height: 400,
		defaultStyle:"font-family: 'Rethink Sans'; font-size: 16px;",
        buttonList: [
          ["undo", "redo"],
          ["font", "fontSize", "formatBlock"],
          ["bold", "underline", "italic", "strike", "subscript", "superscript"],
          ["fontColor", "hiliteColor", "textStyle"],
          ["removeFormat"],
          ["outdent", "indent"],
          ["align", "horizontalRule", "list", "lineHeight"],
          ["table", "link", "image", "video", "audio"],
          ["fullScreen", "showBlocks", "codeView"],
          ["preview", "print"],
          ["template"],
        ],
        // Additional custom options
        font: ["Rethink Sans", "Arial", "Comic Sans MS", "Courier New", "Impact", "Georgia", "Verdana"],
        formats: ["p", "blockquote", "h1", "h2", "h3", "h4", "h5", "h6"],
        imageFileInput: true,
        videoFileInput: true,
        audioFileInput: true,
      }}
    />
  );
};

export default Editor;

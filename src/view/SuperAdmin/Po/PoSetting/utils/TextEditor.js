import React, { useState, useRef } from "react";
import JoditEditor from "jodit-react";

const TextEditor = ({ setContent, content, placeholder = "" }) => {
  const editor = useRef(null);

  const config = {
    readonly: false,
    height: 100,
    toolbar: false,
    toolbarSticky: false,
    placeholder: placeholder,
    buttons: [],
    showCharsCounter: false,
    showWordsCounter: false,
    showXPathInStatusbar: false,
    minHeight: "150px",
  };

  return (
    <div>
      <JoditEditor
        ref={editor}
        value={content}
        config={config}
        onBlur={(newContent) => setContent(newContent)}
      />
    </div>
  );
};

export default TextEditor;

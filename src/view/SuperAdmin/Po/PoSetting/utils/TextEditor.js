import React, { useState, useRef } from 'react';
import JoditEditor from 'jodit-react';

const TextEditor = ({setContent,content}) => {
  const editor = useRef(null);

  const config = {
    readonly: false,
    height: 200,
    toolbar: false,
    toolbarSticky: false,
    placeholder: 'Start typing here...',
    buttons: [],
    showCharsCounter: false,
    showWordsCounter: false,
    showXPathInStatusbar: false
  };

  return (
    <div>
      <JoditEditor
        ref={editor}
        value={content}
        config={config}
        onBlur={newContent => setContent(newContent)}
      />
    </div>
  );
};

export default TextEditor;

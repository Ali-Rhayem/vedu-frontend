import { CODE_SNIPPETS } from "./constants";
import { useRef, useState } from "react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import Output from "./Output";
import "./compiler.css";

const Compiler = () => {
  const editorRef = useRef();
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("javascript");

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (language) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]);
  };

  return (
    <div className="compiler-container">
      <div className="language-editor-container">
        <div className="language-selector">
          <LanguageSelector language={language} onSelect={onSelect} />
        </div>
        <div className="editor-div">
          <Editor
            options={{
              minimap: {
                enabled: false,
              },
            }}
            theme="vs-dark"
            language={language}
            defaultValue={CODE_SNIPPETS[language]}
            onMount={onMount}
            value={value}
            onChange={(value) => setValue(value)}
            className="editor"
          />
        </div>
      </div>
      <div className="output">
        <Output editorRef={editorRef} language={language} />
      </div>
    </div>
  );
};

export default Compiler;

import { CODE_SNIPPETS } from "./constants";
import { useRef, useState, useEffect } from "react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import Output from "./Output";
import "./compiler.css";

const Compiler = ({ isInstructor, HasEditAccess, socket }) => {
  const editorRef = useRef();
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [isEditorReady, setIsEditorReady] = useState(false);
  const [output, setOutput] = useState(null);

  useEffect(() => {
    if (socket) {
      socket.on("editor-content", (content) => {
        setValue(content);
      });

      socket.on("editor-update", (data) => {
        setValue(data.content);
      });

      socket.on("output-update", (data) => {
        setOutput(data.output);
      });

      socket.on("language-change", (newLanguage) => {
        setLanguage(newLanguage);
        setValue(CODE_SNIPPETS[newLanguage]);
      });

      return () => {
        socket.off("editor-content");
        socket.off("editor-update");
        socket.off("output-update");
        socket.off("language-change");
      };
    }
  }, [socket]);

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
    setIsEditorReady(true);
  };

  const handleCodeChange = (newCode) => {
    setValue(newCode);

    if (isInstructor || HasEditAccess) {
      socket.emit("editor-update", { content: newCode });
    }
  };

  const handleOutputUpdate = (newOutput) => {
    setOutput(newOutput);
    socket.emit("output-update", { output: newOutput });
  };

  const onSelect = (newLanguage) => {
    setLanguage(newLanguage);
    setValue(CODE_SNIPPETS[newLanguage]);
    socket.emit("language-change", newLanguage);
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
              readOnly: !isInstructor && !HasEditAccess,
              minimap: { enabled: false },
            }}
            theme="vs-dark"
            language={language}
            value={value}
            defaultValue={CODE_SNIPPETS[language]}
            onChange={handleCodeChange}
            onMount={onMount}
            className="editor"
          />
        </div>
      </div>
      <div className="output">
        {isEditorReady ? (
          <Output
            editorRef={editorRef}
            language={language}
            output={output}
            onOutputUpdate={handleOutputUpdate}
          />
        ) : (
          <p>Editor is loading...</p>
        )}
      </div>
    </div>
  );
};

export default Compiler;

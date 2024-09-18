import { useState } from "react";
import { executeCode } from "../../../api";

const Output = ({ editorRef, language, output, onOutputUpdate,HasEditAccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const runCode = async () => {
    if (!editorRef.current) {
      alert("Editor is not yet ready");
      return;
    }

    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;

    try {
      setIsLoading(true);
      const { run: result } = await executeCode(language, sourceCode);
      const outputResult = result.output.split("\n");
      onOutputUpdate(outputResult);
      result.stderr ? setIsError(true) : setIsError(false);
    } catch (error) {
      console.error(error);
      alert(`An error occurred: ${error.message || "Unable to run code"}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="output-container">
      <p className="output-header">Output</p>
      <button
        className={`run-button ${isLoading ? "loading" : ""}`}
        onClick={runCode}
        disabled={isLoading || !HasEditAccess}
      >
        {isLoading ? "Running..." : "Run Code"}
      </button>
      <div className={`output-box ${isError ? "error" : ""}`}>
        {output
          ? output.map((line, i) => <p key={i}>{line}</p>)
          : 'Click "Run Code" to see the output here'}
      </div>
    </div>
  );
};

export default Output;

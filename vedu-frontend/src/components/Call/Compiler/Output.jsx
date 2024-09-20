import { useState } from "react";
import { executeCode } from "../../../api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Output = ({
  editorRef,
  language,
  output,
  onOutputUpdate,
  HasEditAccess,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const runCode = async () => {
    if (!editorRef.current) {
      toast.error("Editor is not yet ready", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;

    try {
      setIsLoading(true);
      const { run: result } = await executeCode(language, sourceCode);
      const outputResult = result.output.split("\n");
      onOutputUpdate(outputResult);
      if (result.stderr) {
        setIsError(true);
        toast.error("There was an error while executing the code", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        setIsError(false);
      }
    } catch (error) {
      console.error(error);
      toast.error(
        `An error occurred: ${error.message || "Unable to run code"}`,
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );
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
      <ToastContainer />
    </div>
  );
};

export default Output;

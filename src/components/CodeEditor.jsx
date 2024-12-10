import { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { CiTextAlignLeft } from "react-icons/ci";
import { Tooltip } from "bootstrap";

// eslint-disable-next-line react/prop-types
const CodeEditor = ({ fileName }) => {
  const [code, setCode] = useState("");
  const lines = code.split("\n").length;

  const handleInputChange = (e) => {
    setCode(e.target.value);
  };

  useEffect(() => {
    const tooltipTriggerList = document.querySelectorAll(
      '[data-bs-toggle="tooltip"]'
    );
    tooltipTriggerList.forEach((tooltipTriggerEl) => {
      new Tooltip(tooltipTriggerEl);
    });
  }, []);

  return (
    <div
      className="d-flex flex-column bg-dark text-light"
      style={{ height: "100vh" }}
    >
      <div
        className="bg-secondary text-light d-flex align-items-center"
        style={{ height: "30px", fontSize: "14px" }}
      >
        <div
          className="bg-dark ps-2 pe-2"
          style={{ height: "95%", width: "auto" }}
        >
          <span>
            <CiTextAlignLeft className="me-1" />
            {fileName}
          </span>
          <IoMdClose
            className="ms-1 fs-5"
            style={{ cursor: "pointer" }}
            data-bs-toggle="tooltip"
            data-bs-placement="bottom"
            title="Close"
          />
        </div>
      </div>

      <div
        className="d-flex flex-grow-1"
        style={{
          overflow: "auto",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <div
          className="bg-dark text-secondary px-2 pt-2"
          style={{
            width: "50px",
            fontSize: "16px",
            lineHeight: "1.5",
          }}
        >
          {Array.from({ length: lines }, (_, i) => {
            i += 1;
            const lineNumber = i < 10 ? "0" + i : i;
            return <div key={i}>{lineNumber}</div>;
          })}
        </div>

        <textarea
          className="form-control border-0 flex-grow-1 text-light bg-transparent px-2 pt-2"
          style={{
            resize: "none",
            fontFamily: "monospace",
            fontSize: "16px",
            lineHeight: "1.5",
            outline: "none",
            boxShadow: "none",
            overflow: "hidden",
          }}
          value={code}
          onChange={handleInputChange}
        ></textarea>
      </div>
    </div>
  );
};

export default CodeEditor;

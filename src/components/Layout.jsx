import { useState } from "react";
import Sidebar from "./Sidebar";
import CodeEditor from "./CodeEditor";

const Layout = () => {
  const [fileName, setfileName] = useState("example.txt");

  return (
    <div className="d-flex vh-100 overflow-hidden">
      <div
        className="bg-light border-end flex-shrink-0"
        style={{ width: "250px" }}
      >
        <Sidebar setfileName={setfileName} />
      </div>

      <div className="flex-grow-1">
        <CodeEditor fileName={fileName} setfileName={setfileName} />
      </div>
    </div>
  );
};

export default Layout;

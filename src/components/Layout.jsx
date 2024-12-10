import Sidebar from "./Sidebar";
import CodeEditor from "./CodeEditor";

const Layout = () => {
  return (
    <div className="d-flex vh-100 overflow-hidden">
      <div
        className="bg-light border-end flex-shrink-0"
        style={{ width: "250px" }}
      >
        <Sidebar />
      </div>

      <div className="flex-grow-1">
        <CodeEditor />
      </div>
    </div>
  );
};

export default Layout;

import { useState } from "react";
import { useEffect } from "react";
import { BsChevronDown, BsChevronRight } from "react-icons/bs";
import { AiOutlineFileAdd } from "react-icons/ai";
import { FiFolderPlus } from "react-icons/fi";
import { Tooltip } from "bootstrap";
import treeData from "";

const Sidebar = () => {
  const projectName = "EVALVATION:";

  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const addFolder = () => {};

  useEffect(() => {
    const tooltipTriggerList = document.querySelectorAll(
      '[data-bs-toggle="tooltip"]'
    );
    tooltipTriggerList.forEach((tooltipTriggerEl) => {
      new Tooltip(tooltipTriggerEl);
    });
  }, []);

  

  const toggleFolder = (path) => {
    const updateTree = (nodes, pathIndex = 0) => {
      return nodes.map((node, idx) => {
        if (idx === path[pathIndex]) {
          if (pathIndex === path.length - 1) {
            // This is the target node
            return { ...node, isOpen: !node.isOpen };
          }
          if (node.children) {
            // Recursively update children
            return {
              ...node,
              children: updateTree(node.children, pathIndex + 1),
            };
          }
        }
        return node; // No changes for other nodes
      });
    };

    const updatedTree = updateTree(tree);
    setTree(updatedTree);
  };

  const renderTree = (nodes, path = []) =>
    nodes.map((node, idx) => {
      const currentPath = [...path, idx];
      const isDirectRootLevel = path.length === 0; // Check if the file/folder is at the root level

      return (
        <div
          key={currentPath.join("-")}
          style={{
            marginLeft:
              node.type === "folder" || isDirectRootLevel ? "15px" : "30px",
          }}
        >
          {node.type === "folder" ? (
            <div
              onClick={() => toggleFolder(currentPath)}
              style={{ cursor: "pointer" }}
            >
              {node.isOpen ? <BsChevronDown /> : <BsChevronRight />} {node.name}
            </div>
          ) : (
            <div>📄 {node.name}</div>
          )}
          {node.isOpen &&
            node.children &&
            renderTree(node.children, currentPath)}
        </div>
      );
    });

  return (
    <div className="bg-dark" style={{ height: "100vh", overflowY: "auto" }}>
      <div
        className="d-flex bg-secondary text-light justify-content-between mb-3"
        style={{ height: "30px" }}
      >
        <div
          className="cursor-pointer ms-2 d-flex align-items-center"
          onClick={handleToggle}
          style={{ cursor: "pointer" }}
        >
          {isExpanded ? <BsChevronDown /> : <BsChevronRight />}
          <span className="ms-2 fs-6">{projectName}</span>
        </div>
        <div className=" me-2">
          <AiOutlineFileAdd
            className="mx-2 cursor-pointer"
            style={{ cursor: "pointer" }}
            data-bs-toggle="tooltip"
            data-bs-placement="bottom"
            title="Create new file"
          />
          <FiFolderPlus
            className=" cursor-pointer"
            style={{ cursor: "pointer" }}
            data-bs-toggle="tooltip"
            data-bs-placement="bottom"
            title="Create new folder"
            onClick={addFolder}
          />
        </div>
      </div>

      <div className=" text-light h-auto flex-grow-1">{renderTree(tree)}</div>
    </div>
  );
};

export default Sidebar;

import { useState, useEffect } from "react";
import { BsChevronDown, BsChevronRight } from "react-icons/bs";
import { AiOutlineFileAdd } from "react-icons/ai";
import { FiFolderPlus } from "react-icons/fi";
import { CiTextAlignLeft } from "react-icons/ci";
import { MdOutlineSlowMotionVideo } from "react-icons/md";
import { IoImagesSharp } from "react-icons/io5";
import { Tooltip } from "bootstrap";
import { initialTreeData } from "./treeData";

// eslint-disable-next-line react/prop-types
const Sidebar = ({ setfileName }) => {
  const projectName = "EVALUATION";

  const [isExpanded, setIsExpanded] = useState(false);
  const [tree, setTree] = useState(initialTreeData);
  const [selectedFolderId, setSelectedFolderId] = useState(null);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const readFile = (val) => {
    setfileName(val);
    setSelectedFolderId(null);
  };

  const extensionToIconMap = {
    ".mp4": <MdOutlineSlowMotionVideo />,
    ".jpg": <IoImagesSharp />,
  };

  const getFileIcon = (fileName) => {
    const fileExtension = fileName.substring(fileName.lastIndexOf("."));
    return extensionToIconMap[fileExtension] || <CiTextAlignLeft />;
  };

  const addFolder = () => {
    const newFolder = {
      name: "Untitled Folder",
      type: "folder",
      isOpen: false,
      children: [],
    };

    if (selectedFolderId === null) {
      setTree((prevTree) => [newFolder, ...prevTree]);
    } else {
      const updateTree = (nodes, pathIndex = 0) => {
        return nodes.map((node, idx) => {
          if (idx === parseInt(selectedFolderId.split("-")[pathIndex])) {
            if (pathIndex === selectedFolderId.split("-").length - 1) {
              return {
                ...node,
                children: node.children
                  ? [newFolder, ...node.children]
                  : [newFolder],
              };
            }
            if (node.children) {
              return {
                ...node,
                children: updateTree(node.children, pathIndex + 1),
              };
            }
          }
          return node;
        });
      };

      setTree((prevTree) => updateTree(prevTree));
    }
  };

  const addFile = () => {
    const newFile = {
      name: "Untitled.txt",
      type: "file",
    };

    if (selectedFolderId === null) {
      setTree((prevTree) => [...prevTree, newFile]);
    } else {
      const updateTree = (nodes, pathIndex = 0) => {
        return nodes.map((node, idx) => {
          if (idx === parseInt(selectedFolderId.split("-")[pathIndex])) {
            if (pathIndex === selectedFolderId.split("-").length - 1) {
              return {
                ...node,
                children: node.children
                  ? [...node.children, newFile]
                  : [newFile],
              };
            }
            if (node.children) {
              return {
                ...node,
                children: updateTree(node.children, pathIndex + 1),
              };
            }
          }
          return node;
        });
      };

      setTree((prevTree) => updateTree(prevTree));
    }
  };

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
            return { ...node, isOpen: !node.isOpen };
          }
          if (node.children) {
            return {
              ...node,
              children: updateTree(node.children, pathIndex + 1),
            };
          }
        }
        return node;
      });
    };

    const updatedTree = updateTree(tree);
    setTree(updatedTree);
    setSelectedFolderId(path.join("-"));
  };

  const renderTree = (nodes, path = []) =>
    nodes.map((node, idx) => {
      const currentPath = [...path, idx];
      const folderId = currentPath.join("-");
      const isDirectRootLevel = path.length === 0;

      return (
        <div
          key={folderId}
          style={{
            marginLeft:
              node.type === "folder" || isDirectRootLevel ? "15px" : "30px",
          }}
        >
          {node.type === "folder" ? (
            <div
              onClick={() => toggleFolder(currentPath)}
              style={{
                cursor: "pointer",
                border:
                  folderId === selectedFolderId ? "2px solid #bbb" : "none",
                padding: "2px",
                margin: "3px",
              }}
              className="outlineEffect hover-bg-transparent"
            >
              {node.isOpen ? <BsChevronDown /> : <BsChevronRight />} {node.name}
            </div>
          ) : (
            <div
              onClick={() => readFile(node.name)}
              style={{ cursor: "pointer" }}
              className="hover-bg-transparent"
            >
              {getFileIcon(node.name)} {node.name}
            </div>
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
        <div className="me-2">
          <AiOutlineFileAdd
            className="mx-2 cursor-pointer fs-5"
            style={{ cursor: "pointer" }}
            data-bs-toggle="tooltip"
            data-bs-placement="bottom"
            title="Create new file"
            onClick={addFile}
          />
          <FiFolderPlus
            className="cursor-pointer fs-5"
            style={{ cursor: "pointer" }}
            data-bs-toggle="tooltip"
            data-bs-placement="bottom"
            title="Create new folder"
            onClick={addFolder}
          />
        </div>
      </div>

      <div className="text-light h-auto flex-grow-1">{renderTree(tree)}</div>
    </div>
  );
};

export default Sidebar;

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileAlt,
  faEdit,
  faTrashAlt,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

// ul 标签
let GroupUl = styled.ul.attrs({
  className: "list-group list-group-flush",
})`
  li {
    color: #fff;
    background: none;
  }
`;

const FileList = ({ files, editFile, saveFile, deleteFile }) => {
  const [editItem, setEditItem] = useState(false);
  const [value, setValue] = useState("");

  // 定义关闭行为
  const closeFn = () => {
    setEditItem(false);
    setValue("");
  };

  // 键盘事件操作
  useEffect(() => {
    const keyboardHandle = (ev) => {
      let { keyCode } = ev;
      if (keyCode === 13 && editItem) {
        saveFile(editItem, value);
        closeFn();
      }
      if (keyCode === 27 && editItem) {
        closeFn();
      }
    };
    document.addEventListener("keyup", keyboardHandle);
    return () => {
      document.removeEventListener("keyup", keyboardHandle);
    };
  });

  return (
    <GroupUl>
      {files.map((file) => {
        return (
          <li
            className="list-group-item d-flex align-items-center"
            key={file.id}
          >
            {file.id !== editItem && (
              <>
                <span className="mr-2">
                  <FontAwesomeIcon icon={faFileAlt}></FontAwesomeIcon>
                </span>
                <span
                  className="col-8"
                  onClick={() => {
                    editFile(file.id);
                  }}
                >
                  {file.title}
                </span>
                <span
                  className="col-1"
                  onClick={() => {
                    setEditItem(file.id);
                  }}
                >
                  <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
                </span>
                <span
                  className="col-1"
                  onClick={() => {
                    deleteFile(file.id);
                  }}
                >
                  <FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon>
                </span>
              </>
            )}
            {file.id === editItem && (
              <>
                <input
                  className="col-9"
                  value={value}
                  onClick={() => {
                    editFile(file.id);
                  }}
                  onChange={(e) => {
                    setValue(e.target.value);
                  }}
                />
                <span className="col-3" onClick={closeFn}>
                  <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
                </span>
              </>
            )}
          </li>
        );
      })}
    </GroupUl>
  );
};

FileList.propTypes = {
  files: PropTypes.array,
  editFile: PropTypes.func,
  saveFile: PropTypes.func,
  deleteFile: PropTypes.func,
};

export default FileList;

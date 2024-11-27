import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileAlt,
  faEdit,
  faTrashAlt,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import useKeyHandler from "../hooks/useKeyHandler";

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
  const enterPressed = useKeyHandler(13);
  const escPressed = useKeyHandler(27);
  // 定义关闭行为
  const closeFn = () => {
    setEditItem(false);
    setValue("");
  };

  useEffect(() => {
    const newFile = files.find((file) => file.isNew);
    if (newFile && editItem !== newFile.id) {
      // 此时就说明我们本意是想新建一个文件，但是没有将新建文件操作完成就又去点击了其它的文件项
      deleteFile(newFile.id);
    }
  }, [editItem]);

  useEffect(() => {
    const newFile = files.find((file) => file.isNew);
    if (newFile) {
      setEditItem(newFile.id);
      setValue(newFile.title);
    }
  }, [files]);

  useEffect(() => {
    if (enterPressed && editItem && value.trim() !== "") {
      const file = files.find((file) => file.id == editItem);
      saveFile(editItem, value, file.isNew);
      closeFn();
    }

    if (escPressed && editItem) {
      closeFn();
    }
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
                <span className="me-2">
                  <FontAwesomeIcon icon={faFileAlt}></FontAwesomeIcon>
                </span>
                <span
                  className="col-8"
                  onClick={() => {
                    editFile(file.id);
                    closeFn();
                  }}
                >
                  {file.title}
                </span>
                <span
                  className="col-2"
                  onClick={() => {
                    setEditItem(file.id);
                  }}
                >
                  <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
                </span>
                <span
                  className="col-2"
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
                  className="col-9 me-2"
                  value={value}
                  onChange={(e) => {
                    setValue(e.target.value);
                  }}
                />
                <span className="col-2" onClick={closeFn}>
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

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
    setEditItem(false)
    setValue('')

    const currentFile = files.find(file => file.id == editItem)
    if (currentFile.isNew) {
      deleteFile(currentFile.id)
    }
  }

  useEffect(() => {
    const newFile = files.find(file => file.isNew)
    if (newFile) {

      setEditItem(newFile.id)
      setValue(newFile.title)
    }
  }, [files])

  useEffect(() => {
    if (enterPressed && editItem && value.trim() !== '') {
      saveFile(editItem, value)
      closeFn()
    }

    if (escPressed && editItem) {
      closeFn()
    }
  })

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

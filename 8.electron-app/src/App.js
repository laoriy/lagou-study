import React from "react";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchFile from "./components/SearchFile";
import FileList from "./components/FileList";
import initFiles from "./utils/initFiles";
import ButtonItem from "./components/ButtonItem";
import { faFileImport, faPlus } from "@fortawesome/free-solid-svg-icons";

// 自定义左侧容器
let LeftDiv = styled.div.attrs({
  className: "col-3 left-panel",
})`
  position: relative;
  background-color: #7b8c7c;
  min-height: 100vh;
  .btn_list {
    left: 0;
    bottom: 0;
    width: 100%;
    position: absolute;
    p {
      border: 0;
      width: 50%;
      color: #fff;
      border-radius: 0;
      margin-bottom: 0 !important;
    }
    p:nth-of-type(1) {
      background-color: #8ba39e;
    }
    p:nth-of-type(2) {
      background-color: #98b4b3;
    }
  }
`;
// 自定义右侧容器
let RightDiv = styled.div.attrs({
  className: "col-9 right-panel",
})`
  background-color: #c9d8cd;
`;

function App() {
  return (
    <div className="App container-fluid px-0">
      <div className="row g-0">
        <LeftDiv>
          <SearchFile
            title={"我的文档"}
            onSearch={(value) => {
              console.log(value);
            }}
          ></SearchFile>
          <FileList
            files={initFiles}
            editFile={(id) => {
              console.log(id);
            }}
            deleteFile={(id) => {
              console.log("删除", id);
            }}
            saveFile={(id, value) => {
              console.log(id, value);
            }}
          />
          <div className="btn_list">
            <ButtonItem title={"新建"} icon={faPlus} />
            <ButtonItem title={"导入"} icon={faFileImport} />
          </div>
        </LeftDiv>
        <RightDiv>右侧</RightDiv>
      </div>
    </div>
  );
}

export default App;

import React, { useCallback, useState } from "react";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchFile from "./components/SearchFile";
import FileList from "./components/FileList";
import initFiles from "./utils/initFiles";
import ButtonItem from "./components/ButtonItem";
import { faFileImport, faPlus } from "@fortawesome/free-solid-svg-icons";
import TabList from "./components/TabList";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { v4 } from "uuid";

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
  .init-page {
    color: #888;
    text-align: center;
    font: normal 28px/300px "微软雅黑";
  }
`;

function App() {
  const [files, setFiles] = useState(initFiles); // 代表所有的文件信息
  const [activeId, setActiveId] = useState(""); // 当前正在编辑的文件id
  const [openIds, setOpenIds] = useState([]); // 当前已打开的所有文件信息 ids
  const [unSaveIds, setUnSaveIds] = useState([]); // 当前未被保存的所有文件信息 ids

  const [searchFiles, setSearchFiles] = useState([]); // 将左侧展示的搜索列表与默认列表信息进行区分

  // 计算已打开的所有文件信息
  const openFiles = openIds.map((openId) => {
    return files.find((file) => file.id === openId);
  });

  // 计算正在编辑的文件信息
  const activeFile = files.find((file) => file.id === activeId);

  // 计算当前左侧列表需要展示什么样的信息
  const fileList = searchFiles.length > 0 ? searchFiles : files;
  // 01 点击左侧文件显示编辑页
  const openItem = (id) => {
    // 将当前 id 设置为 active id
    setActiveId(id);

    // 将id添加至 open ids
    if (!openIds.includes(id)) {
      setOpenIds([...openIds, id]);
    }
  };
  // 02 点击某个选项时切换当前状态
  const changeActive = (id) => {
    setActiveId(id);
  };

  // 03 点击关闭按钮
  const closeFile = (id) => {
    // 将当前的 id 从已经 open 的数组中去除
    const retOpen = openIds.filter((openId) => openId !== id);
    setOpenIds(retOpen);
    // 当某一个选项被关闭之后还需要给所有已打开文件设置一个当前状态
    if (retOpen.length > 0) {
      setActiveId(retOpen[0]);
    } else {
      setActiveId("");
    }
  };

  // 04 当文件内容更新时
  const changeFile = (id, newValue) => {
    if (!unSaveIds.includes(id)) {
      setUnSaveIds([...unSaveIds, id]);
    }

    // 某个内容更新之后我们需要生成新的 files
    const newFiles = files.map((file) => {
      if (file.id === id) {
        file.body = newValue;
      }
      return file;
    });
    setFiles(newFiles);
  };

  // 05 删除某个文件项
  const deleteItem = (id) => {
    const newFiles = files.filter((file) => file.id !== id);
    setFiles(newFiles);

    // 如果当前想要关闭的项正在被打开那么删除之后应该将其关闭
    closeFile(id);
  };

  // 06 依据关键字搜索文件
  const searchFile = useCallback(
    (keyWord) => {
      const newFiles = files.filter((file) => file.title.includes(keyWord));
      setSearchFiles(newFiles);
    },
    [files]
  );

  // 07 重命名
  const reName = (id, newTitle) => {
    const newFiles = files.map((file) => {
      if (file.id == id) {
        file.title = newTitle;
        file.isNew = false;
      }
      return file;
    });

    setFiles(newFiles);
  };

  // 08 新建操作
  const createFile = () => {
    const newId = v4();
    const newFile = {
      id: newId,
      title: "",
      isNew: true,
      body: "## 初始化内容",
      createTime: new Date().getTime(),
    };
    setFiles([...files, newFile]);
  };

  return (
    <div className="App container-fluid px-0">
      <div className="row g-0">
        <LeftDiv>
          <SearchFile title={"我的文档"} onSearch={searchFile}></SearchFile>
          <FileList
            files={fileList}
            editFile={openItem}
            deleteFile={deleteItem}
            saveFile={reName}
          />
          <div className="btn_list">
            <ButtonItem title={"新建"} icon={faPlus} btnClick={createFile} />
            <ButtonItem title={"导入"} icon={faFileImport} />
          </div>
        </LeftDiv>
        <RightDiv>
          {activeFile && (
            <>
              <TabList
                files={openFiles}
                activeItem={activeId}
                unSaveItems={unSaveIds}
                clickItem={changeActive}
                closeItem={closeFile}
              />
              <SimpleMDE
                id="your-custom-id"
                onChange={(value) => {
                  changeFile(activeFile.id, value);
                }}
                value={activeFile.body}
                options={{
                  autofocus: true,
                  spellChecker: false,
                  minHeight: "445px",
                }}
              />
            </>
          )}
          {!activeFile && (
            <div className="init-page">新建或者导入具体的文档</div>
          )}
        </RightDiv>
      </div>
    </div>
  );
}

export default App;

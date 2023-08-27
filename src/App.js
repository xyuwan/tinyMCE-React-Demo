import React, { useRef } from "react";
import _ from "lodash";
import BundledEditor from "./BundledEditor";
import "./App.css";

/**
 *
 * @returns
 *
 *  需要支持如下功能点
 *  1. 选中弹窗工具栏
 *  2. 选中文本改变前景色 & 背景色
 *
 *
 *
 *
 *
 *
 */

const dialogConfig = {
  title: "Pet Name Machine",
  body: {
    type: "panel",
    items: [
      {
        type: "input",
        name: "catdata",
        label: "enter the name of a cat",
      },
      {
        type: "checkbox",
        name: "isdog",
        label: "tick if cat is actually a dog",
      },
    ],
  },
  buttons: [
    {
      type: "cancel",
      name: "closeButton",
      text: "Cancel",
    },
    {
      type: "submit",
      name: "submitButton",
      text: "Do Cat Thing",
      buttonType: "primary",
    },
  ],
  initialData: {
    catdata: "initial Cat",
    isdog: false,
  },
  onSubmit: (api) => {
    const data = api.getData();
    const pet = data.isdog ? "dog" : "cat";

    api.close();
  },
};

export default function App() {
  const editorRef = useRef(null);

  const openToolModal = () => {
    console.log("我被触发了");
    editorRef?.current.windowManager.open(dialogConfig);
  };

  const handleSelectionChange = (e, editor) => {
    if (editor.selection.isCollapsed()) {
      return; // Do nothing if no text is selected
    }
    // const selectedContent = editorRef?.current.selection.getContent();

    // _.debounce(() => {
    //   console.log(222);
    // }, 300);

    // do something with the selected content
  };

  return (
    <>
      <BundledEditor
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue="<p>This is the initial content of the editor.</p>"
        onSelectionChange={handleSelectionChange}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            "advlist",
            "anchor",
            "autolink",
            "image",
            "link",
            "lists",
            "searchreplace",
            "table",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | myButton",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px };.my-selected-text { background-color: yellow; color: black; }",
          setup: function (editor) {
            var isShowingButtons = false; // 用于追踪按钮是否已经显示
            var originalFontColor = ''; // 用于存储选中文本前的颜色

            editor.on("NodeChange", function () {
              // 获取选中的文本
              var selectedText = editor.selection.getContent({
                format: "text",
              });

              // 获取选中文本的节点
              var selectedNode = editor.selection.getNode();

              console.log(selectedNode);


              // 获取选中文本的坐标
              var range = editor.selection.getRng();
              var rect = range.getBoundingClientRect();

              // 获取按钮集合的容器
              var customButtonsContainer =
                document.getElementById("tool-options");
              customButtonsContainer.innerHTML = ""; // 清空之前的按钮
              customButtonsContainer.style.display = "none";

              if (selectedText.trim() !== "") {
                if (!isShowingButtons) {
                  // editor.execCommand('ForeColor', false, '#ff0000'); // 这里使用红色作为示例颜色
                  // selectedNode.style.backgroundColor = 'yellow';
                  // 创建加粗按钮
                  var boldButton = document.createElement("button");
                  boldButton.textContent = "加粗";
                  boldButton.onclick = function () {
                    editor.execCommand("Bold", false, null);
                  };

                  // 创建斜体按钮
                  var italicButton = document.createElement("button");
                  italicButton.textContent = "斜体";
                  italicButton.onclick = function () {
                    editor.execCommand("Italic", false, null);
                  };

                  // 创建下划线按钮
                  var underlineButton = document.createElement("button");
                  underlineButton.textContent = "下划线";
                  underlineButton.onclick = function () {
                    editor.execCommand("Underline", false, null);
                  };

                  var a = document.createElement("button");
                  underlineButton.textContent = "下划线";
                  underlineButton.onclick = function () {
                    editor.execCommand("Underline", false, null);
                  };

                  var b = document.createElement("button");
                  underlineButton.textContent = "下划线";
                  underlineButton.onclick = function () {
                    editor.execCommand("Underline", false, null);
                  };

                  // 设置按钮的位置
                  customButtonsContainer.style.position = "absolute";
                  customButtonsContainer.style.left = rect.left + "px";
                  customButtonsContainer.style.top = rect.bottom + 60 + "px";

                  // 将按钮添加到容器中
                  customButtonsContainer.appendChild(boldButton);
                  customButtonsContainer.appendChild(italicButton);
                  customButtonsContainer.appendChild(underlineButton);
                  customButtonsContainer.appendChild(a);
                  customButtonsContainer.appendChild(b);
                  isShowingButtons = true; // 标记按钮已显示
                  customButtonsContainer.style.display = "flex";
                 
                  // 记录选中文本前的颜色
                  originalFontColor = editor.selection.getNode().style.color;
                }
                
              } else {
                // 清空按钮集合
                customButtonsContainer.innerHTML = "";
                isShowingButtons = false; // 标记按钮未显示
                // selectedNode.style.backgroundColor = '';
              }
            });
          },
        }}
      />
      <div id="tool-options"></div>
    </>
  );
}

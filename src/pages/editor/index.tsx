import { Editor } from "@/components";
import { useRef } from "react";

const Index = () => {
  const titleRef = useRef<HTMLInputElement>(null);
  const editorRef = useRef(null);

  const handleSave = (type: "drafts" | "save") => {
    const title = titleRef.current.value;
    const editor = editorRef.current.getValue();

    console.log(type, title, editor);
  };

  const handleReturn = () => {
    window.history.back();
  };

  return (
    <div className="h-screen">
      <header className="p-2 h-16 flex justify-between items-center">
        <input
          type="text"
          ref={titleRef}
          className="input-border-none ml-4 w-3/5 text-2xl"
          placeholder="输入文章标题..."
        />
        <div>
          <button
            className="text-sm"
            onClick={() => {
              handleSave("drafts");
            }}
          >
            存草稿
          </button>
          <button
            className="mx-4 text-sm bg-black text-white"
            onClick={() => {
              handleSave("save");
            }}
          >
            发布
          </button>
          <button className="text-sm" onClick={handleReturn}>
            返回
          </button>
        </div>
      </header>
      <Editor type="edit" ref={editorRef} />
    </div>
  );
};

export default Index;

Index.hiddenLayout = true;

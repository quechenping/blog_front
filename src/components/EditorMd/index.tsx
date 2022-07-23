import { forwardRef, useImperativeHandle, useState, Ref } from "react";
import { Viewer, Editor } from "@bytemd/react";
import footnotes from "@bytemd/plugin-footnotes";
import frontmatter from "@bytemd/plugin-frontmatter";
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight-ssr";
import math from "@bytemd/plugin-math";
import mediumZoom from "@bytemd/plugin-medium-zoom";
import mermaid from "@bytemd/plugin-mermaid";
import gemoji from "@bytemd/plugin-gemoji";

import { Edit } from "@/types/editor";

import "katex/dist/katex.css";
import "bytemd/dist/index.css";
import "highlight.js/styles/atom-one-dark.css";

const plugins = [
  footnotes(),
  frontmatter(),
  gemoji(),
  highlight(),
  math({
    katexOptions: { output: "html" },
  }),
  mediumZoom(),
  mermaid(),
];

const Index = ({ type, value: defaultValue = "" }: Edit, ref: Ref<unknown>) => {
  const [value, setValue] = useState(() => defaultValue);

  const onChange = (e: string) => {
    setValue(e);
  };

  useImperativeHandle(ref, () => ({
    getValue: () => value,
  }));

  return (
    <div className="custom-markdown-body">
      {type === "edit" ? (
        <div className="custom-markdown-body-edit">
          <Editor plugins={plugins} value={value} onChange={onChange} />
        </div>
      ) : (
        <div className="custom-markdown-body-view">
          <Viewer plugins={plugins} value={value} />
        </div>
      )}
    </div>
  );
};

export default forwardRef(Index);

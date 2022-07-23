import { useState } from "react";
import { Editor } from "@/components";

export default function Blog() {
  const [value, setValue] = useState("");

  return (
    <>
      <Editor type="preview" value={value} />
    </>
  );
}

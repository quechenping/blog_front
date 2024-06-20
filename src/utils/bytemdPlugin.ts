import type { BytemdPlugin } from "bytemd";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";

export function autolinkHeadingsPlugin(): BytemdPlugin {
  return {
    rehype: (processor) =>
      processor
        .use(rehypeSlug)
        // @ts-ignore
        .use(rehypeAutolinkHeadings, { behavior: "append" }),
  };
}

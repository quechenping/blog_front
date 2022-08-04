import { useState } from "react";
import { Section, BlogDesc } from "@/feature";
import { Item } from "@/types/blogItem";

const initList = [
  {
    title: "Hexo、github搭建博客学习",
    id: "1123123te",
    createTime: "2021-07-21",
    tag: ["react"],
    description: `Hexo是一款基于Node.js的静态博客框架Hexo是一款基于Node.js的静态博客框架Hexo是一款基于Node.js的静态博客框架Hexo是一款基于Node.js的静态博客框架Hexo是一款基于Node.js的静态博客框架Hexo是一款基于Nodejs的静态博客框架Hexo是一款基于Nodejs的静态博客框架Hexo是一款基于Nodejs的静态博客框架Hexo是一款基于Node.js的静态博客框架Hexo是一款基于Node.js的静态博客框架Hexo是一款基于Node.js的静态博客框架Hexo是一款基于Node.js的静态博客框架Hexo是一款基于Node.js的静态博客框架
      Hexo是一款基于Node.js的静态博客框架Hexo是一款基于Node.js的静态博客框架Hexo是一款基于Node.js的静态博客框架Hexo是一款基于Node.js的静态博客框架Hexo是一款基于Node.js的静态博客框架Hexo是一款基于Nodejs的静态博客框架Hexo是一款基于Nodejs的静态博客框架Hexo是一款基于Nodejs的静态博客框架Hexo是一款基于Node.js的静态博客框架Hexo是一款基于Node.js的静态博客框架Hexo是一款基于Node.js的静态博客框架Hexo是一款基于Node.js的静态博客框架Hexo是一款基于Node.js的静态博客框架
      Hexo是一款基于Node.js的静态博客框架Hexo是一款基于Node.js的静态博客框架Hexo是一款基于Node.js的静态博客框架Hexo是一款基于Node.js的静态博客框架Hexo是一款基于Node.js的静态博客框架Hexo是一款基于Nodejs的静态博客框架Hexo是一款基于Nodejs的静态博客框架Hexo是一款基于Nodejs的静态博客框架Hexo是一款基于Node.js的静态博客框架Hexo是一款基于Node.js的静态博客框架Hexo是一款基于Node.js的静态博客框架Hexo是一款基于Node.js的静态博客框架Hexo是一款基于Node.js的静态博客框架`,
  },
  {
    title: "Create Next App",
    id: "2",
    createTime: "2021-07-21",
    tag: ["react"],
    description: "测试",
  },
  {
    title: "Hexo是一款基于Node.js的静态博客框架",
    id: "3",
    createTime: "2021-07-21",
    tag: ["react"],
    description: "测试",
  },
  {
    title: "Hexo是一款基于Node.js的静态博客框架",
    id: "4",
    createTime: "2021-07-21",
    tag: ["react"],
    description: "测试",
  },
];

export default function Blog() {
  const [list, setList] = useState<Array<Item>>(initList);

  return (
    <>
      <Section id="blog" title="所有文章">
        <ul className="flex flex-col gap-10">
          {list.map((itm) => (
            <li key={itm.id}>
              <BlogDesc item={itm} />
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}

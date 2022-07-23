import React from "react";
import Link from "next/link";
import { Tag } from "@/components";

import { Item } from "@/types/blogItem";

interface Props {
  item: Item;
}

const BlogDesc = ({ item }: Props) => {
  return (
    <Link href="/blog/[id]" as={`/blog/${item.id}`}>
      <a>
        <div className="blog-desc-content">
          <div className="blog-desc-content-title">
            <h3 className="text-xl font-bold tracking-wider">{item.title}</h3>
            <span>{item.createTime}</span>
          </div>
          <div className="text-xs truncate">{item.description}</div>
          <div>
            {item.tag?.map((itm) => (
              <Tag key={itm}>{itm}</Tag>
            ))}
          </div>
        </div>
      </a>
    </Link>
  );
};

export default BlogDesc;

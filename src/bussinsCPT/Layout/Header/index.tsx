import React from "react";
import Link from "next/link";
import { title } from "@/config";

const Header = () => {
  return (
    <header className="fixed top-0 right-0 left-0 z-50 shadow bg-gray-100">
      <div className="mx-auto lg:max-w-4xl md:max-w-3xl h-16 flex justify-between items-center">
        <Link href="/">
          <a className="flex items-center">
            <span className="text-3xl font-extrabold mr-2">Q</span>
            <span>{title}</span>
          </a>
        </Link>
        <nav className="flex items-center justify-end">
          <div className="space-x-8 flex-shrink-0">
            <a className="cursor-pointer" href={"/editor"}>
              写文章
            </a>
            <a className="cursor-pointer" href={"/blog"}>
              博客
            </a>
            <a className="cursor-pointer" href={"/login"}>
              登录
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;

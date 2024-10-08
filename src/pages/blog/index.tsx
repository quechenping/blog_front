import { GetStaticProps, InferGetStaticPropsType } from "next";
import Link from "next/link";
import { FC, useState } from "react";

import { SEO } from "@/components";
import BlogList from "@/feature/BlogList";
import type { BlogItem, TagItem } from "@/types";
import sHttp from "@/utils/getStaticData";

export const getStaticProps: GetStaticProps<{
	blogList: BlogItem[];
	tagList: TagItem[];
}> = () => {
	const blogList = sHttp.getBlogList();
	const tagList = sHttp.getTagList();
	return { props: { blogList, tagList } };
};

const Blog: FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
	blogList = [],
	tagList = [],
}) => {
	const [curList, setCurList] = useState(() => blogList || []);

	const getBlogList = ({ title }) => {
		if (!title) {
			setCurList(blogList);
			return;
		}
		const res = blogList.filter((it) =>
			it.title.toLowerCase().includes(title.toLowerCase()),
		);
		setCurList(res);
	};

	const onSearch = (s: string) => {
		getBlogList({ title: s });
	};

	return (
		<div className="flex justify-center gap-10">
			<SEO title="所有文章" />
			<div className="w-full lg:w-3/5">
				<BlogList title="Post" list={curList} onSearch={onSearch} />
			</div>
			<div className="sticky top-6 hidden h-fit w-80 shrink-0 lg:block">
				<div className="mt-3 text-xl font-bold">Tags</div>
				<div className="q-card mt-8" style={{ padding: "1.5rem" }}>
					<div className="max-h-64 overflow-y-auto">
						{tagList.map((tag, idx) => (
							<Link key={idx} href={`/tags/${tag.name}`} passHref>
								<a className="q-color-primary-hover mx-1 my-2 flex justify-between font-bold hover:underline">
									<span>- {tag.name}</span>
									<span className="text-sm font-light">
										Created {tag.count} Posts
									</span>
								</a>
							</Link>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Blog;

import Link from "next/link";

interface Props {
  children: string;
}

const Tag = ({ children }: Props) => {
  return (
    <Link href={`/tags/${children}`} passHref>
      <span className="border px-2 py-1 rounded-sm text-xs mb-2 mr-2 cursor-pointer whitespace-nowrap inline-block">
        {children}
      </span>
    </Link>
  );
};
export default Tag;

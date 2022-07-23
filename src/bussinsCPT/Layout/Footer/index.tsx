import { title, copyright, github, name } from "@/config";

const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-center leading-8 text-sm w-full py-2 border-t text-skin-muted">
      <p>
        Designed & developed by
        <a className="ml-1" target="_blank" href={github} rel="noreferrer">
          {name}
        </a>
      </p>
      <p>
        {copyright} {title}
      </p>
    </footer>
  );
};

export default Footer;

import Document, { Html, Head, Main, NextScript } from "next/document";
import { description, keywords } from "@/config";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="zh-CN" className="antialiased text-black select-none">
        <Head>
          <meta name="description" content={description} />
          <meta name="keywords" content={keywords} />
          <link rel="icon" href="/favicon.ico" />
          <script type="text/javascript" src="/theme.js" defer></script>
        </Head>
        <body className="bg-gray-100 min-h-screen">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head >
          <link rel="icon" href="https://cdn.echooo.xyz/front-end/source/images/logo/jeton.svg" type="image/x-icon" />
      </Head>
      <body className="light text-foreground">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

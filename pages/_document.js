// pages/_document.js

import Document, {Html, Head, Main, NextScript} from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="stylesheet"
            href="https://fonts.googleapis.com/css?display=optional&family=DM+Serif+Display" />
          <link rel="stylesheet"
            href="https://fonts.googleapis.com/css?display=optional&family=DM+Sans" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

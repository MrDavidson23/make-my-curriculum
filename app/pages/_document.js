import {
  Document,
  Html,
  DocumentHead,
  Main,
  BlitzScript,
  /*DocumentContext*/
} from "blitz"

class MyDocument extends Document {
  // Only uncomment if you need to customize this behaviour
  // static async getInitialProps(ctx: DocumentContext) {
  //   const initialProps = await Document.getInitialProps(ctx)
  //   return {...initialProps}
  // }
  render() {
    return (
      <Html lang="en">
        <DocumentHead />
        <body>
          <Main />
          <BlitzScript />
        </body>
        <style jsx global>{`
          @import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@500&display=swap");

          html,
          body {
            padding: 0;
            margin: 0;
            font-family: "Open Sans", sans-serif;
          }

          * {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            box-sizing: border-box;
          }
        `}</style>
      </Html>
    )
  }
}

export default MyDocument

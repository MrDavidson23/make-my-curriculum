import db from "./index"

/*
 * This seed function is executed when you run `blitz db seed`.
 *
 * Probably you want to use a library like https://chancejs.com
 * or https://github.com/Marak/Faker.js to easily generate
 * realistic data.
 */
const seed = async () => {
  // for (let i = 0; i < 5; i++) {
  //   await db.project.create({ data: { language: "Project " + i } })
  // }
  await db.language.createMany({
    data: [
      {
        language: "English",
        code: "en",
        direction: "ltr",
      },
      {
        language: "Spanish",
        code: "es",
        direction: "ltr",
      },
      {
        language: "French",
        code: "fr",
        direction: "ltr",
      },
      {
        language: "Portuguese",
        code: "pt",
        direction: "ltr",
      },
      {
        language: "German",
        code: "de",
        direction: "ltr",
      },
      {
        language: "Russian",
        code: "ru",
        direction: "ltr",
      },
      {
        language: "Chinese",
        code: "zh",
        direction: "ltr",
      },
      {
        language: "Japanese",
        code: "ja",
        direction: "ltr",
      },
      {
        language: "Arabic",
        code: "ar",
        direction: "rtl",
      },
      {
        language: "Hebrew",
        code: "he",
        direction: "rtl",
      },
      {
        language: "Turkish",
        code: "tr",
        direction: "ltr",
      },
      {
        language: "Italian",
        code: "it",
        direction: "ltr",
      },
      {
        language: "Polish",
        code: "pl",
        direction: "ltr",
      },
      {
        language: "Korean",
        code: "ko",
        direction: "ltr",
      },
      {
        language: "Finnish",
        code: "fi",
        direction: "ltr",
      },
      {
        language: "Indonesian",
        code: "id",
        direction: "ltr",
      },
      {
        language: "Greek",
        code: "el",
        direction: "ltr",
      },
      {
        language: "Danish",
        code: "da",
        direction: "ltr",
      },
      {
        language: "Norwegian",
        code: "no",
        direction: "ltr",
      },
      {
        language: "Swedish",
        code: "sv",
        direction: "ltr",
      },
      {
        language: "Hungarian",
        code: "hu",
        direction: "ltr",
      },
      {
        language: "Czech",
        code: "cs",
        direction: "ltr",
      },
    ],
  })

  await db.template.createMany({
    data: [
      {
        design: {
          left: {
            text: {
              color: "#e1dddd",
              fontSize: "14pt",
              fontFamily: "Lato",
              fontWeight: "bold",
            },
            title: {
              color: "#fffafa",
              fontSize: "12pt",
              fontFamily: "Open Sans",
              fontWeight: "bold",
            },
            container: {
              width: 180,
              paddingTop: 30,
              paddingLeft: 15,
              paddingRight: 15,
              flexDirection: "column",
              backgroundColor: "#8f294a",
              "@media max-width: 400": {
                width: "100%",
                paddingRight: 0,
              },
              "@media orientation: landscape": {
                width: 300,
              },
            },
          },
          right: {
            text: {
              color: "#444343",
              fontSize: "14pt",
              fontFamily: "Lato",
              fontWeight: "bold",
            },
            title: {
              color: "#920917",
              fontSize: "12pt",
              fontFamily: "Open Sans",
              fontWeight: "normal",
            },
            container: {
              paddingTop: 30,
              paddingLeft: 10,
              paddingRight: 15,
              backgroundColor: "#ebdede",
              "@media max-width: 400": {
                width: "100%",
                paddingRight: 0,
              },
            },
          },
          container: {
            flex: 1,
            margin: "2px",
            flexDirection: "row",
            "@media max-width: 400": {
              flexDirection: "column",
            },
          },
        },
        name: "Plantilla",
        userId: null,
        isPremium: false,
      },
      {
        design: {
          left: {
            text: {
              color: "#ebdfd0",
              fontSize: "12pt",
              fontFamily: "Lato",
              fontWeight: "bold",
            },
            title: {
              color: "#FAF6F6",
              fontSize: "16pt",
              fontFamily: "Lato",
              fontWeight: "bold",
            },
            container: {
              width: 420,
              paddingTop: 30,
              paddingLeft: 15,
              paddingRight: 15,
              flexDirection: "column",
              backgroundColor: "#160761",
              "@media max-width: 400": {
                width: "100%",
                paddingRight: 0,
              },
              "@media orientation: landscape": {
                width: 300,
              },
            },
          },
          right: {
            text: {
              color: "#340f0f",
              fontSize: "12pt",
              fontFamily: "Lato",
              fontWeight: "normal",
            },
            title: {
              color: "#0c0c0c",
              fontSize: "16pt",
              fontFamily: "Lato",
              fontWeight: "normal",
            },
            container: {
              paddingTop: 30,
              paddingLeft: 10,
              paddingRight: 15,
              backgroundColor: "#cdebeb",
              "@media max-width: 400": {
                width: "100%",
                paddingRight: 0,
              },
            },
          },
          container: {
            flex: 1,
            margin: "2px",
            flexDirection: "row",
            "@media max-width: 400": {
              flexDirection: "column",
            },
          },
        },
        name: "Plantilla",
        userId: null,
        isPremium: false,
      },
      {
        design: {
          left: {
            text: {
              color: "#FAF6F6",
              fontSize: "12pt",
              fontFamily: "Open Sans",
              fontWeight: "normal",
            },
            title: {
              color: "#FAF6F6",
              fontSize: "18pt",
              fontFamily: "Open Sans",
              fontWeight: "normal",
            },
            container: {
              width: 240,
              paddingTop: 30,
              paddingLeft: 15,
              paddingRight: 15,
              flexDirection: "column",
              backgroundColor: "#2079c7",
            },
          },
          right: {
            text: {
              color: "#272425",
              fontSize: "12pt",
              fontFamily: "Open Sans",
              fontWeight: "normal",
            },
            title: {
              color: "#272425",
              fontSize: "18pt",
              fontFamily: "Open Sans",
              fontWeight: "bold",
            },
            container: {
              paddingTop: 30,
              paddingLeft: 10,
              paddingRight: 15,
              backgroundColor: "#fbfbfb",
            },
          },
          container: {
            flex: 1,
            margin: "2px",
            flexDirection: "row",
          },
        },
        name: "Plantilla",
        userId: null,
        isPremium: false,
      },
    ],
  })
}

export default seed

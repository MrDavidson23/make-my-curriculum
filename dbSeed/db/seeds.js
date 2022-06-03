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
        name: "Default",
        isPremium: false,
        design: {
          left: {
            text: { margin: "10px", fontSize: "12pt", lineHeight: 1.6 },
            title: { fontSize: "16pt", fontWeight: "bold" },
            container: {
              color: "#FAF6F6",
              width: 170,
              paddingTop: 30,
              paddingLeft: 15,
              paddingRight: 15,
              flexDirection: "column",
              backgroundColor: "#3A298F",
              "@media max-width: 400": { width: "100%", paddingRight: 0 },
              "@media orientation: landscape": { width: 200 },
            },
          },
          right: {
            text: { margin: "10px", fontSize: "12pt", lineHeight: 1.6 },
            title: { color: "#DB5461", fontSize: "14pt", fontWeight: "bold" },
            container: {
              paddingTop: 30,
              paddingLeft: 10,
              paddingRight: 15,
              backgroundColor: "#FAF6F6",
              "@media max-width: 400": { width: "100%", paddingRight: 0 },
            },
          },
          container: {
            flex: 1,
            margin: "2px",
            flexDirection: "row",
            "@media max-width: 400": { flexDirection: "column" },
          },
        },
      },
      {
        name: "DefaultPremium",
        isPremium: true,
        design: {
          left: {
            text: { margin: "10px", fontSize: "12pt", lineHeight: 1.6 },
            title: { fontSize: "16pt", fontWeight: "bold" },
            container: {
              color: "#FAF6F6",
              width: 170,
              paddingTop: 30,
              paddingLeft: 15,
              paddingRight: 15,
              flexDirection: "column",
              backgroundColor: "#3A298F",
              "@media max-width: 400": { width: "100%", paddingRight: 0 },
              "@media orientation: landscape": { width: 200 },
            },
          },
          right: {
            text: { margin: "10px", fontSize: "12pt", lineHeight: 1.6 },
            title: { color: "#DB5461", fontSize: "14pt", fontWeight: "bold" },
            container: {
              paddingTop: 30,
              paddingLeft: 10,
              paddingRight: 15,
              backgroundColor: "#FAF6F6",
              "@media max-width: 400": { width: "100%", paddingRight: 0 },
            },
          },
          container: {
            flex: 1,
            margin: "2px",
            flexDirection: "row",
            "@media max-width: 400": { flexDirection: "column" },
          },
        },
      },
    ],
  })
}

export default seed

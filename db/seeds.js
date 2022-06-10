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
              flexDirection: "row",
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
              flexDirection: "row",
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
        name: "DefaultPremium1",
        isPremium: true,
        design: {
          right: {
            text: {
              color: "#000000",
              fontSize: "12pt",
              fontFamily: "Sans-serif",
              fontWeight: "normal",
              paddingLeft: 5,
            },
            title: {
              color: "#cf793c",
              fontSize: "16pt",
              fontFamily: "Sans-serif",
              fontWeight: "bold",
            },
            container: {
              width: 200,
              paddingTop: 30,
              paddingLeft: 15,
              paddingRight: 15,
              flexDirection: "column",
              backgroundColor: "#f9e0d9",
            },
          },
          order: [
            ["infos", "skills", "references"],
            ["laboralExperiences", "academicEducations", "technicalEducations", "publications"],
          ],
          left: {
            text: {
              color: "faf4f2",
              fontSize: "12pt",
              fontFamily: "Sans-serif",
              fontWeight: "normal",
              paddingLeft: 5,
            },
            title: {
              color: "#faf4f2",
              fontSize: "16pt",
              fontFamily: "Sans-Serif",
              fontWeight: "bold",
            },
            container: {
              width: 350,
              paddingTop: 30,
              paddingLeft: 10,
              paddingRight: 15,
              backgroundColor: "#c8553d",
            },
          },
          container: {
            flex: 1,
            margin: "2px",
            flexDirection: "row",
          },
          sections: {
            infos: {
              fontSize: "16pt",
            },
          },
        },
      },
      {
        name: "DefaultPremium2",
        isPremium: true,
        design: {
          left: {
            text: {
              margin: "10px",
              fontSize: "12pt",
              lineHeight: 1.6,
              paddingRight: 20,
            },
            title: {
              fontSize: "16pt",
              fontWeight: "bold",
              paddingRight: 20,
            },
            container: {
              color: "#FFF",
              width: "100%",
              paddingTop: 30,
              paddingLeft: 30,
              paddingRight: 15,
              flexDirection: "row",
              backgroundColor: "#92895a",
              "@media max-width: 400": {
                width: "100%",
                paddingRight: 0,
              },
              "@media orientation: landscape": {
                width: 200,
              },
            },
          },
          right: {
            text: {
              color: "#3a3a3a",
              margin: "10px",
              fontSize: "12pt",
              lineHeight: 1.6,
            },
            title: {
              color: "#92895a",
              fontSize: "18pt",
              fontWeight: "bold",
            },
            container: {
              display: "flex",
              paddingTop: 30,
              paddingLeft: 30,
              paddingRight: 15,
              flexDirection: "column",
              backgroundColor: "#FFF",
              "@media max-width: 400": {
                width: "100%",
                paddingRight: 0,
              },
            },
          },
          container: {
            flex: 1,
            margin: "2px",
            flexDirection: "column-reverse",
            "@media max-width: 400": {
              flexDirection: "column",
            },
          },
        },
      },
      {
        name: "DefaultPremium3",
        isPremium: true,
        design: {
          left: {
            text: {
              margin: "10px",
              fontSize: "12pt",
              lineHeight: 1.6,
            },
            title: {
              fontSize: "16pt",
              fontWeight: "bold",
            },
            container: {
              color: "#194480",
              width: "40%",
              paddingTop: 30,
              paddingRight: 30,
              flexDirection: "row",
              backgroundColor: "#ffb68f",
              "@media max-width: 400": {
                width: "100%",
                paddingRight: 0,
              },
              "@media orientation: landscape": {
                width: 200,
              },
            },
          },
          right: {
            text: {
              color: "#194480",
              margin: "10px",
              fontSize: "12pt",
              lineHeight: 1.6,
            },
            title: {
              color: "#194480",
              fontSize: "18pt",
              fontWeight: "bold",
            },
            container: {
              display: "flex",
              paddingTop: 30,
              marginRight: 100,
              paddingLeft: 30,
              flexDirection: "column",
              backgroundColor: "#FFF",
              "@media max-width: 400": {
                width: "100%",
                paddingRight: 0,
              },
            },
          },
          container: {
            flex: 1,
            margin: "2px",
            flexDirection: "row-reverse",
            "@media max-width: 400": {
              flexDirection: "column",
            },
          },
        },
      },

      {
        name: "DefaultPremium4",
        isPremium: true,
        design: {
          c1: {
            text: {},
            title: {},
            container: {
              width: 15,
              paddingTop: 30,
              flexDirection: "column",
              backgroundColor: "#8f2962",
            },
          },
          c2: {
            text: {},
            title: {},
            container: {
              width: 5,
              paddingTop: 30,
              flexDirection: "column",
              backgroundColor: "#ffffff",
            },
          },
          left: {
            text: {
              color: "#FAF6F6",
              fontSize: "12pt",
              fontFamily: "Oswald",
              fontWeight: "normal",
              paddingLeft: 5,
            },
            title: {
              color: "#FAF6F6",
              fontSize: "16pt",
              fontFamily: "Oswald",
              fontWeight: "bold",
            },
            container: {
              width: 250,
              paddingTop: 30,
              paddingLeft: 15,
              paddingRight: 15,
              flexDirection: "column",
              backgroundColor: "#8f2962",
            },
          },
          order: [
            [],
            [],
            ["infos", "skills", "references", "publications"],
            ["laboralExperiences", "academicEducations", "technicalEducations"],
            [],
          ],
          right: {
            text: {
              color: "#000000",
              fontSize: "12pt",
              fontFamily: "Oswald",
              fontWeight: "normal",
              paddingLeft: 5,
            },
            title: {
              color: "#DB5461",
              fontSize: "16pt",
              fontFamily: "Oswald",
              fontWeight: "bold",
            },
            container: {
              width: 300,
              paddingTop: 30,
              paddingLeft: 10,
              paddingRight: 15,
              backgroundColor: "#dfdde6",
            },
          },
          container: {
            flex: 1,
            margin: "2px",
            flexDirection: "row",
          },
          lastColumn: {
            text: {},
            title: {},
            container: {
              width: 5,
              paddingTop: 30,
              flexDirection: "column",
              backgroundColor: "#8f2962",
            },
          },
          sections: {
            infos: {
              fontSize: "16pt",
            },
          },
        },
      },
      {
        name: "DefaultPremium5",
        isPremium: true,
        design: {
          left: {
            text: {
              color: "#ffffff",
              fontSize: "12pt",
              fontFamily: "Oswald",
              fontWeight: "normal",
              textAlign: "justify",
              textJustify: "inter-word",
            },
            title: {
              color: "#ffffff",
              fontSize: "16pt",
              fontFamily: "Oswald",
              fontWeight: "bold",
            },
            container: {
              width: 200,
              paddingTop: 30,
              paddingLeft: 15,
              paddingRight: 15,
              flexDirection: "column",
              backgroundColor: "#0e96ae",
            },
          },
          order: [
            ["infos", "skills"],
            ["laboralExperiences", "academicEducations", "technicalEducations"],
            ["references", "publications"],
          ],
          right: {
            text: {
              color: "#000000",
              fontSize: "12pt",
              fontFamily: "Oswald",
              fontWeight: "normal",
              textAlign: "justify",
              textJustify: "inter-word",
            },
            title: {
              color: "#0e96ae",
              fontSize: "16pt",
              fontFamily: "Oswald",
              fontWeight: "bold",
            },
            container: {
              width: "60%",
              paddingTop: 30,
              paddingLeft: 10,
              paddingRight: 15,
              backgroundColor: "#ffffff",
            },
          },
          center: {
            text: {
              color: "#000000",
              fontSize: "12pt",
              fontFamily: "Oswald",
              fontWeight: "normal",
              textAlign: "justify",
              textJustify: "inter-word",
            },
            title: {
              color: "#ffffff",
              fontSize: "16pt",
              fontFamily: "Oswald",
              fontWeight: "bold",
            },
            container: {
              width: "40%",
              paddingTop: 30,
              paddingLeft: 10,
              paddingRight: 15,
              backgroundColor: "#c79df9",
            },
          },
          container: {
            flex: 1,
            margin: "2px",
            flexDirection: "row",
          },
        },
      },

      {
        name: "DefaultPremium6",
        isPremium: true,
        design: {
          left: {
            text: {
              color: "#FAF6F6",
              fontSize: "12pt",
              fontFamily: "Oswald",
              fontWeight: "normal",
            },
            title: {
              color: "#FAF6F6",
              fontSize: "16pt",
              fontFamily: "Oswald",
              fontWeight: "bold",
            },
            container: {
              width: 300,
              paddingTop: 30,
              paddingLeft: 15,
              paddingRight: 15,
              flexDirection: "column",
              backgroundColor: "#26798e",
            },
          },
          order: [
            ["infos", "skills", "references", "publications"],
            ["laboralExperiences", "academicEducations", "technicalEducations"],
          ],
          right: {
            text: {
              color: "#000000",
              fontSize: "12pt",
              fontFamily: "Oswald",
              fontWeight: "normal",
              paddingLeft: "50%",
            },
            title: {
              color: "#000000",
              fontSize: "16pt",
              textAlign: "center",
              fontFamily: "Oswald",
              fontWeight: "bold",
            },
            container: {
              width: "100%",
              paddingTop: 10,
              paddingLeft: 10,
              paddingRight: 15,
              backgroundColor: "#63caa7",
            },
          },
          sections: {
            infos: {
              paddingTop: 10,
            },
            academicEducations: {
              marginTop: "2px",
              paddingTop: 5,
              paddingLeft: 10,
              borderRadius: "15px",
              marginBottom: "2px",
              paddingBottom: 5,
              backgroundColor: "#ffe3b3",
            },
            laboralExperiences: {
              marginTop: "2px",
              paddingTop: 5,
              paddingLeft: 10,
              borderRadius: "15px",
              marginBottom: "2px",
              paddingBottom: 5,
              backgroundColor: "#ffe3b3",
            },
            technicalEducations: {
              marginTop: "2px",
              paddingTop: 5,
              paddingLeft: 10,
              borderRadius: "15px",
              marginBottom: "2px",
              paddingBottom: 5,
              backgroundColor: "#ffe3b3",
            },
          },
          container: {
            flex: 1,
            margin: "2px",
            flexDirection: "row",
          },
        },
      },
    ],
  })
}

export default seed

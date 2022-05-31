import { Font } from "@react-pdf/renderer"

const FontRegister = () => {
    if(Font.getRegisteredFontFamilies().length<=0){
        Font.register({
            family: 'Open Sans',
            src: `https://fonts.gstatic.com/s/opensans/v17/mem8YaGs126MiZpBA-UFVZ0e.ttf`,
          });
          
        Font.register({
        family: 'Lato',
        fonts: [
            {
            src: `https://fonts.gstatic.com/s/lato/v16/S6uyw4BMUTPHjx4wWw.ttf`,
            },
            {
            src: `https://fonts.gstatic.com/s/lato/v16/S6u9w4BMUTPHh6UVSwiPHA.ttf`,
            fontWeight: 'bold',
            },
        ],
        });
        
        Font.register({
        family: 'Oswald',
        src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf',
        });
    }
    return Font.getRegisteredFonts()
}

export default FontRegister
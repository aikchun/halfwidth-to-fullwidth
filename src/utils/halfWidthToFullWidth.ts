const halfWidthKatakana = [
  ..."｡｢｣､･ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝﾞﾟ",
];
const fullWidthKatakana = [
  ..."。「」、・ヲァィゥェォャュョッーアイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワン゛゜",
];
const hangul1 = { name: 'hangul1', halfRE: /[ﾡ-ﾾ]/, fullRE: /[ᆨ-ᇂ]/, delta: -0xedf9 };
const hangul2 = { name: 'hangul2', halfRE: /[ￂ-ￜ]/, fullRE: /[ᅡ-ᅵ]/, delta: -0xee61 };
const latin = { name: 'latin', halfRE: /[!-~]/, fullRE: /[！-～]/, delta: 0xfee0 };
const extras = {
  half: "¢£¬¯¦¥₩\u0020|←↑→↓■°",
  full: "￠￡￢￣￤￥￦\u3000￨￩￪￫￬￭￮",
};

const converters = [latin, hangul1, hangul2];

const convertLatinHangul = (c) => {
  for (let j = 0; j < converters.length; j += 1) {
    const converter = converters[j];
    const isHalfWidth = converter.halfRE.test(c);

    if (isHalfWidth) {
      return String.fromCharCode(c.charCodeAt(0) + converter.delta);
    }
  }
  return null;
};

export function halfWidthToFullWidth(str) {
  let result = "";
  for (let i = 0; i < str.length; i += 1) {    
    const c = str[i];
    const convertedChar = convertLatinHangul(c);
    if (convertedChar) {
      result += convertedChar;
      continue;
    }
    const indexOfHalfWidthKatakana = halfWidthKatakana.indexOf(c);
    if (indexOfHalfWidthKatakana >= 0) {
      const fullWidthKatakanaCharacter = fullWidthKatakana[indexOfHalfWidthKatakana];
      result += fullWidthKatakanaCharacter;
      continue;
    }
    const indexOfHalfWidthExtras = extras.half.indexOf(c);
    if (indexOfHalfWidthExtras >= 0) {
      result += extras.full[indexOfHalfWidthExtras];
      continue;
    }
    result += c;
  }
  return result;
}

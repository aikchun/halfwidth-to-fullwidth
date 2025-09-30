export const getErrorMessages = (value: string) => {
	switch (value) {
		case "errorKanji":
			return "Ensure valid Full Width Kanji/Katakana/Hiragana used only.";
		case "errorKatakana":
			return "Ensure valid Full Width Katakana used only.";
		case "errorName":
			return "Ensure only roman letters used only.";
	}
};

export const standardKatakanaValidator = (input?: string | null): boolean => {
  const regex = new RegExp(
    '^[\u30A1-\u30F6\u31F0-\u31FF\uFF21-\uFF3A\uFF41-\uFF5A\uFF10-\uFF19\u30FB\u30FC\u2010\uFF0D\u2212\u2019\uFF0C\uFF0E\uFF06\u3000\u2160-\u216A\uFF65-\uFF9FA-Za-z0-9 ,.& \u3078\u3079\u307A]+$',
  );
  return !!input && regex.test(input);
};
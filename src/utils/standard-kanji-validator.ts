export const standardKanjiValidator = (input?: string | null): boolean => {
  const regex = new RegExp(
    '^[\u4E00-\u9FFF\u3400-\u4DBF\uF900-\uFAFF\u3041-\u3096\u30A1-\u30FA\u30FC-\u30FF\uFF10-\uFF19\uFF21-\uFF3A\uFF41-\uFF5A\u30FB\u30FC\u2010\uFF0D\u2212\u2019\uFF0C\uFF0E\uFF06\u3000\u2160-\u216A\uFF65-\uFF9FA-Za-z0-9,.& ]+$',
  );
  return !!input && regex.test(input);
}

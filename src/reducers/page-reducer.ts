

export function pageReducer(state, action) {
  switch (action.type) {
    case "GO_TO":
      return { page: action.page };
  }
  return state;
}

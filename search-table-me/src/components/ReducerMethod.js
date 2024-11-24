export function reducerMethod(state, action) {
  switch (action.type) {
    case "searchTerm":
      return { ...state, searchTerm: action.payload };
    case "sortColumn":
      return { ...state, sortColumn: action.payload };
    default:
      throw new Error("Invalid action type");
  }
}

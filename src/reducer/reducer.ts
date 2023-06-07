export type ActionType = {
  type: string;
  payload: any;
};

export const DEFAULT_DATA = {
  data: {
    tabs: [],
    tabdata: {},
    plugins: {},
  },
  errors: null,
};

export const reducer = (state: any, { type, payload }: ActionType) => {
  switch (type) {
    case "SET_TABS":
      return { ...state, ...payload };
    case "SET_TABDATA":
      return { ...state, ...payload };
    case "SET_PLUGINS":
      return { ...state, ...payload };
    case "SET_UPDATED_DATA":
      return { ...state, tabdata: { ...payload } };
    default:
      return state;
  }
};

"use client";

import React, {
  useCallback,
  useContext,
  Dispatch,
  createContext,
  useReducer,
} from "react";

type ActionType = {
  type: string;
  payload: { tab: string; plugin: string };
};

type TabData = {
  title: string;
  icon: string;
  active: string[];
  disabled: string[];
  inactive: string[];
};

const DEFAULT_DATA = {
  data: {
    tabs: ["tab1", "tab2", "tab3"],
    tabdata: {
      tab1: {
        title: "Marketing",
        icon: "icon-marketing",
        active: ["plugin1", "plugin2", "plugin4"],
        disabled: ["plugin3"],
        inactive: ["plugin5", "plugin6"],
      },
      tab2: {
        title: "Finance",
        icon: "icon-finance",
        active: ["plugin7", "plugin8"],
        disabled: ["plugin9"],
        inactive: ["plugin10"],
      },
      tab3: {
        title: "Personnel",
        icon: "icon-people",
        active: ["plugin11"],
        disabled: ["plugin12"],
        inactive: ["plugin13"],
      },
    },
    plugins: {
      plugin1: {
        title: "Plugin 1",
        description:
          "Enim cillum tempor veniam do laboris excepteur laborum fugiat aute magna cillum.",
      },
      plugin2: {
        title: "Plugin 2",
        description:
          "Proident sunt consequat exercitation incididunt cupidatat quis ut ut eu ullamco nisi excepteur aliqua.",
      },
      plugin3: {
        title: "Plugin 3",
        description:
          "Amet ea quis qui reprehenderit laborum aute magna incididunt et dolore.",
      },
      plugin4: {
        title: "Plugin 4",
        description: "Sunt culpa labore consequat eu veniam laborum.",
      },
      plugin5: {
        title: "Plugin 5",
        description:
          "Proident laborum sint nisi enim non aliqua incididunt dolor voluptate tempor.",
      },
      plugin6: {
        title: "Plugin 6",
        description:
          "Qui cillum velit elit incididunt excepteur nostrud occaecat.",
      },
      plugin7: {
        title: "Plugin 7",
        description:
          "Culpa excepteur aliquip adipisicing sunt sunt proident aute eiusmod.",
      },
      plugin8: {
        title: "Plugin 8",
        description: "Eiusmod ex labore cillum elit.",
      },
      plugin9: {
        title: "Plugin 9",
        description: "Ut sit sit fugiat qui ullamco ea ea id qui esse magna.",
      },
      plugin10: {
        title: "Plugin 10",
        description:
          "Aliqua tempor nostrud occaecat enim nulla proident nostrud enim adipisicing pariatur velit.",
      },
      plugin11: {
        title: "Plugin 11",
        description: "Consectetur sit amet velit cillum sunt cillum sunt.",
      },
      plugin12: {
        title: "Plugin 12",
        description: "Exercitation in aute ut ex aliqua ea.",
      },
      plugin13: {
        title: "Plugin 13",
        description: "Dolor laboris culpa ipsum aliqua velit mollit.",
      },
    },
  },
  errors: null,
};

const reducer = (state: any, { type, payload }: ActionType) => {
  let tabDataCopy = { ...state.tabdata };
  switch (type) {
    case "DEACTIVATE":
      tabDataCopy[payload.tab].active = tabDataCopy[payload.tab].active.filter(
        (plugin: any) => plugin !== payload.plugin
      );
      tabDataCopy[payload.tab].inactive.push(payload.plugin);
      return { ...state, tabdata: tabDataCopy };
    case "ACTIVATE":
      tabDataCopy[payload.tab].inactive = tabDataCopy[
        payload.tab
      ].inactive.filter((plugin: any) => plugin !== payload.plugin);
      tabDataCopy[payload.tab].active.push(payload.plugin);
      return { ...state, tabdata: tabDataCopy };
    default:
      return state;
  }
};

const GlobalContext = createContext<{
  state: any;
  dispatch: Dispatch<ActionType>;
}>({ state: DEFAULT_DATA.data, dispatch: () => null });

export const GlobalContextProvider = ({ children }: { children: any }) => {
  const memoizedReducer = useCallback(reducer, []);
  const [state, dispatch] = useReducer(memoizedReducer, DEFAULT_DATA.data);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);

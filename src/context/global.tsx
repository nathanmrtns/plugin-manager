"use client";
import React, {
  useCallback,
  useContext,
  Dispatch,
  createContext,
  useReducer,
} from "react";
import { DEFAULT_DATA, reducer, ActionType } from "@/reducer/reducer";

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

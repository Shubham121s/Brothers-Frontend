import React from "react";
import NoteTable from "./components/NoteTable";
import { injectReducer } from "../../../../../store";
import poSettingReducer from "./store";
import NoteTableTools from "./components/NoteTableTools";

injectReducer("category", poSettingReducer);
const Notes = () => {
  return (
    <>
      <NoteTableTools />
      <NoteTable />
      {/* <CategoryNewFormDialog /> */}
    </>
  );
};

export default Notes;

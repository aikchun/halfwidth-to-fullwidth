import { useState, useReducer } from "react";
import "./App.css";
import { pageReducer } from "./reducers/page-reducer";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

import { BasicDetails } from "./components/BasicDetails";
import { Tasks } from "./components/Tasks";
import { halfWidthToFullWidth } from './utils/halfWidthToFullWidth';

const INITIAL_FORM_STATE = {
  fields: {
    lastNameKatakana: {
      value: "",
    },
    firstNameKatakana: {
      value: "",
    },
    lastNameKanji: {
      value: "",
    },
    firstNameKanji: {
      value: "",
    },
    lastName: {
      value: "",
    },
    firstName: {
      value: "",
    },
  },
};

const convertFieldsToFullWidth = fields => {
  let result = {};
  Object.keys(fields).forEach(key => {
    const value = /[Katakana|Kanji]$/.test(key) ? halfWidthToFullWidth(fields[key].value): fields[key].value;
    result = {...result, [key]: {value}}
    
  });
  return result;
}

function basicDetailsReducer(state, action) {
  switch (action.type) {
    case "ON_CHANGE":
      return {
        ...state,
        fields: {
          ...state.fields,
          [action.field]: { ...state[action.field], value: action.value },
        },
      };
    case "RESET":
      return { ...INITIAL_FORM_STATE };
    case "SUBMIT":
      return {...state, fields: convertFieldsToFullWidth(state.fields)};
  }
}

function App() {
  const INITIAL_PAGE_STATE = { page: "TASKS" };
  const [shouldConvertToFullWidth, setShouldConvertToFullWidth] =
    useState(false);
  const [pageState, dispatch] = useReducer(pageReducer, INITIAL_PAGE_STATE);
  const [basicDetailsFormProps, basicDetailsFormStateDispatch] = useReducer(
    basicDetailsReducer,
    INITIAL_FORM_STATE,
  );

  const onBack = () => {
    dispatch({ type: "GO_TO", page: "TASKS" });
  };
  const onSubmit = () => {
    dispatch({ type: "GO_TO", page: "TASKS" });
    basicDetailsFormStateDispatch({type: 'SUBMIT'});
    
  };

  const handleBasicDetailsFormFieldChange = (field, value) => {
    basicDetailsFormStateDispatch({ type: "ON_CHANGE", field, value });
  };
  const handleBasicDetailsFormReset = () => {
    basicDetailsFormStateDispatch({ type: "RESET" });
  };
  const handleShouldConvertToFullWidthChange = (e) => {
    setShouldConvertToFullWidth(e.target.value === "yes");
    handleBasicDetailsFormReset();
  };

  const tasks = [
    {
      name: "basicDetails",
      displayName: "Basic Details",
      onClick: () => {
        dispatch({ type: "GO_TO", page: "BASIC_DETAILS" });
      },
      sx: {
        textTransform: "none",
        borderColor: "#dbdee2",
        backgroundColor: "#ffffff",
        color: "#00112c",
      },
    },
  ];

  return (
    <Container maxWidth="sm">
      <Grid container sx={{ width: "448px" }}>
        {pageState.page === "TASKS" && <Tasks tasks={tasks} />}
        {pageState.page === "BASIC_DETAILS" && (
          <BasicDetails
            shouldConvertToFullWidth={shouldConvertToFullWidth}
            onShouldConvertToFullWidthChange={
              handleShouldConvertToFullWidthChange
            }
            onBack={onBack}
            onSubmit={onSubmit}
            formProps={basicDetailsFormProps}
            handleBasicDetailsFormFieldChange={
              handleBasicDetailsFormFieldChange
            }
            onFormReset={handleBasicDetailsFormReset}
          />
        )}
      </Grid>
    </Container>
  );
}

export default App;

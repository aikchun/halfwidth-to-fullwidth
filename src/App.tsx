import { useState, useReducer, useEffect, type SyntheticEvent } from "react";
import "./App.css";
import { pageReducer } from "./reducers/page-reducer";
import Grid from "@mui/material/Grid";

import { BasicDetails } from "./components/BasicDetails";
import { Address } from "./components/Address";
import type { AddressSchema } from "./components/Address";
import type { BasicDetailsSchema } from "./components/BasicDetails";
import { Tasks } from "./components/Tasks";
import { halfWidthToFullWidth } from "./utils/halfWidthToFullWidth";
import { useForm } from "./hooks/useForm";
import type {
  UseFormProps,
  ValidateResult,
  FormReducerState,
} from "./hooks/useForm";
import { standardKatakanaValidator } from "./utils/standard-katakana-validator";
import { standardKanjiValidator } from "./utils/standard-kanji-validator";
import { getErrorMessages } from "./utils/error-messages-localization";

const convertFieldsToFullWidth = (fields) => {
  let result = {};
  Object.keys(fields).forEach((key) => {
    const value = /[Katakana|Kanji]$/.test(key)
      ? halfWidthToFullWidth(fields[key].value)
      : fields[key].value;
    result = { ...result, [key]: { ...fields[key], value } };
  });
  return result;
};

function App() {
  const INITIAL_PAGE_STATE = { page: "TASKS" };
  const [shouldConvertToFullWidth, setShouldConvertToFullWidth] =
    useState(true);
  const [pageState, dispatch] = useReducer(pageReducer, INITIAL_PAGE_STATE);
  const basicDetailsFormProps = {
    validate: (state: FormReducerState<BasicDetailsSchema>) => {
      const fields = state.fields;
      const error = {} as ValidateResult<BasicDetailsSchema>;

      const {
        lastNameKanji = { value: "", touched: false, error: false },
        firstNameKanji = { value: "", touched: false, error: false },
        lastNameKatakana = { value: "", touched: false, error: false },
        firstNameKatakana = { value: "", touched: false, error: false },
        lastName = { value: "", touched: false, error: false },
        firstName = { value: "", touched: false, error: false },
      } = fields;

      if (
        lastNameKanji?.touched &&
        !standardKanjiValidator(lastNameKanji?.value)
      ) {
        error.lastNameKanji = getErrorMessages("errorKanji");
      }
      if (
        firstNameKanji?.touched &&
        !standardKanjiValidator(firstNameKanji?.value)
      ) {
        error.firstNameKanji = getErrorMessages("errorKanji");
      }
      if (
        lastNameKatakana?.touched &&
        !standardKatakanaValidator(lastNameKatakana?.value)
      ) {
        error.lastNameKatakana = getErrorMessages("errorKatakana");
      }
      if (
        firstNameKatakana?.touched &&
        !standardKatakanaValidator(firstNameKatakana?.value)
      ) {
        error.firstNameKatakana = getErrorMessages("errorKatakana");
      }

      if (
        lastName?.touched &&
        /^[A-Za-z]+$/.test(lastName?.value ?? "") === false
      ) {
        error.lastName = getErrorMessages("errorName");
      }
      if (
        firstName?.touched &&
        /^[A-Za-z]+$/.test(firstName?.value ?? "") === false
      ) {
        error.firstName = getErrorMessages("errorName");
      }
      return error;
    },
    fields: {
      lastNameKanji: {
        value: "",
        onBlur: (value: string) => {
          return shouldConvertToFullWidth ? halfWidthToFullWidth(value) : value;
        },
      },
      firstNameKanji: {
        value: "",
        onBlur: (value: string) => {
          return shouldConvertToFullWidth ? halfWidthToFullWidth(value) : value;
        },
      },
      lastNameKatakana: {
        value: "",
        onChange: (value: string) => {
          return shouldConvertToFullWidth ? halfWidthToFullWidth(value) : value;
        },
      },
      firstNameKatakana: {
        value: "",
        onChange: (value: string) => {
          return shouldConvertToFullWidth ? halfWidthToFullWidth(value) : value;
        },
      },
      lastName: {
        value: "",
      },
      firstName: {
        value: "",
      },
    },
  } as UseFormProps<BasicDetailsSchema>;

  const { dispatch: basicDetailsFormDispatch, ...basicDetailsFormState } =
    useForm<BasicDetailsSchema>(basicDetailsFormProps);

  const onBasicDetailsBack = () => {
    dispatch({ type: "GO_TO", page: "TASKS" });
  };
  const onAddressBack = () => {
    dispatch({ type: "GO_TO", page: "BASIC_DETAILS" });
  };
  const onBasicDetailsNext = () => {
    dispatch({ type: "GO_TO", page: "ADDRESS" });
  };

  useEffect(() => {
    const initateState = Object.keys(basicDetailsFormState.fields).reduce(
      (acc, key) => {
        return {
          ...acc,
          fields: {
            ...acc.fields,
            [key]: {
              value: "",
              touched: false,
              error: "",
            },
          },
        };
      },
      { fields: {} } as FormReducerState<BasicDetailsSchema>,
    );
    basicDetailsFormDispatch({ type: "RESET", state: initateState });
  }, [shouldConvertToFullWidth]);

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

  const onShouldConvertToFullWidthChange = (e: SyntheticEvent) => {
    setShouldConvertToFullWidth((e.target as HTMLInputElement).value === "yes");
  };

  const addressFields = {
    validate: (state: FormReducerState<AddressSchema>) => {
      const fields = state.fields;
      const error = {} as ValidateResult<AddressSchema>;

      const {
        postalCode = { value: "", touched: false, error: false },
        prefectureKanji = { value: "", touched: false, error: false },
        cityKanji = { value: "", touched: false, error: false },
        chomeKanji = { value: "", touched: false, error: false },
        buildingNameKanji = { value: "", touched: false, error: false },
        prefectureKatakana = { value: "", touched: false, error: false },
        cityKatakana = { value: "", touched: false, error: false },
        prefecture = { value: "", touched: false, error: false },
        city = { value: "", touched: false, error: false },
        buildingName = { value: "", touched: false, error: false },
        chome = { value: "", touched: false, error: false },
      } = fields;

      const japaneseFields = {
        prefectureKanji,
        cityKanji,
        chomeKanji,
        buildingNameKanji,
        prefectureKatakana,
        cityKatakana,
      };

      Object.keys(japaneseFields).forEach((key) => {
        if (/[Kanji]$/.test(key)) {
          if (
            japaneseFields[key]?.value !== "" &&
            !standardKanjiValidator(japaneseFields[key]?.value)
          ) {
            error[key] = getErrorMessages("errorKanji");
          }
        }
        if (/[Katakana]$/.test(key)) {
          if (
            japaneseFields[key]?.value !== "" &&
            !standardKatakanaValidator(japaneseFields[key]?.value)
          ) {
            error[key] = getErrorMessages("errorKatakana");
          }
        }
      });

      const romanFields = { prefecture, city, buildingName, chome };
      Object.keys(romanFields).forEach((key) => {
        if (
          !!romanFields[key]?.value &&
          !/[A-Za-z0-9, -]+/.test(romanFields[key]?.value)
        ) {
          error[key] = getErrorMessages("errorName");
        }
      });

      const chomeFields = { chome, chomeKanji, postalCode };
      Object.keys(chomeFields).forEach((key) => {
        if (
          !!chomeFields[key]?.value &&
          !/[\uFF10-\uFF19\uFF0D0-9 -]+/.test(chomeFields[key]?.value)
        ) {
          error[key] = getErrorMessages("errorName");
        }
      });

      return error;
    },
    fields: {
      postalCode: {
        label: "",
        value: "",
        onChange: (value: string) => {
          return shouldConvertToFullWidth ? halfWidthToFullWidth(value) : value;
        },
      },
      prefectureKanji: {
        label: "",
        value: "",
        onBlur: (value: string) => {
          return shouldConvertToFullWidth ? halfWidthToFullWidth(value) : value;
        },
      },
      cityKanji: {
        label: "",
        value: "",
        onBlur: (value: string) => {
          return shouldConvertToFullWidth ? halfWidthToFullWidth(value) : value;
        },
      },
      chomeKanji: {
        label: "",
        value: "",
        onBlur: (value: string) => {
          return shouldConvertToFullWidth ? halfWidthToFullWidth(value) : value;
        },
      },
      buildingNameKanji: {
        label: "",
        value: "",
        onBlur: (value: string) => {
          return shouldConvertToFullWidth ? halfWidthToFullWidth(value) : value;
        },
      },
      prefectureKatakana: {
        label: "",
        value: "",
        onChange: (value: string) => {
          return shouldConvertToFullWidth ? halfWidthToFullWidth(value) : value;
        },
      },

      cityKatakana: {
        label: "",
        value: "",
        onChange: (value: string) => {
          return shouldConvertToFullWidth ? halfWidthToFullWidth(value) : value;
        },
      },
      prefecture: {
        label: "",
        value: "",
      },
      city: {
        label: "",
        value: "",
      },
      chome: {
        label: "",
        value: "",
      },
      buildingName: {
        label: "",
        value: "",
      },
    },
  };

  const { fields: addressFieldsState, dispatch: addressFieldsDispatch } =
    useForm<AddressSchema>(addressFields);

  const onAddressChange = (state: FormReducerState<AddressSchema>) => {
    addressFieldsDispatch({ type: "ON_CHANGE", state });
  };

  const onSubmit = () => {
    dispatch({ type: "GO_TO", page: "TASKS" });

    basicDetailsFormDispatch({
      type: "RESET",
      state: {
        ...basicDetailsFormState,
        fields: convertFieldsToFullWidth(basicDetailsFormState.fields),
      },
    });

    addressFieldsDispatch({
      type: "RESET",
      state: {
        fields: convertFieldsToFullWidth(addressFieldsState),
      },
    });
  };

  return (
    <Grid
      container
      sx={{ width: "100%", justifyContent: "center", alignItems: "center" }}
    >
      {pageState.page === "TASKS" && <Tasks tasks={tasks} />}
      {pageState.page === "BASIC_DETAILS" && (
        <BasicDetails
          shouldConvertToFullWidth={shouldConvertToFullWidth}
          onShouldConvertToFullWidthChange={onShouldConvertToFullWidthChange}
          onBack={onBasicDetailsBack}
          onNext={onBasicDetailsNext}
          formProps={basicDetailsFormState}
        />
      )}
      {pageState.page === "ADDRESS" && (
        <Address
          shouldConvertToFullWidth={true}
          formProps={addressFieldsState}
          onAddressChange={onAddressChange}
          onBack={onAddressBack}
          onSubmit={onSubmit}
        />
      )}
    </Grid>
  );
}

export default App;

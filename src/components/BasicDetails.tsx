import { useEffect } from "react";

import Grid from "@mui/material/Grid";

import InputLabel from "@mui/material/InputLabel";
import FormControl, { type FormControlProps } from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { BoxedInput } from "./BoxedInput";
import { HalfSizedFormControl } from "./HalfSizedFormControl";
import { halfWidthToFullWidth } from "../utils/halfWidthToFullWidth";

import { useForm } from "../hooks/useForm";
import { standardKatakanaValidator } from "../utils/standard-katakana-validator";
import { standardKanjiValidator } from "../utils/standard-kanji-validator";

interface BasicDetails {
  lastNameKatakana: string;
}

export function BasicDetails(props) {
  const {
    onBack,
    onSubmit,
    formProps,
    // handleBasicDetailsFormFieldChange,
    shouldConvertToFullWidth,
    onShouldConvertToFullWidthChange,
  } = props;

  const useFormProps = {
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
  };

  const { fields, reset } = useForm(useFormProps);

  const katakanaFields = [
    {
      variant: "standard",
      label: {
        value: "セイ",
        htmlFor: "last-name-katakana-input",
        error:
          fields.lastNameKatakana.touched &&
          !standardKatakanaValidator(formProps.fields.lastNameKatakana.value),
      },
      input: {
        id: "last-name-katakana-input",
        name: "lastNameKatakana",
        ...fields.lastNameKatakana,
        error:
          fields.lastNameKatakana.touched &&
          !standardKatakanaValidator(formProps.fields.lastNameKatakana.value),
      },
    },
    {
      variant: "standard",
      label: {
        value: "メイ",
        htmlFor: "first-name-katakana-input",
        error:
          fields.firstNameKatakana.touched &&
          !standardKatakanaValidator(formProps.fields.firstNameKatakana.value),
      },
      input: {
        id: "first-name-katakana-input",
        name: "firstNameKatakana",
        ...fields.firstNameKatakana,
        error: !standardKatakanaValidator(
          formProps.fields.firstNameKatakana.value,
        ),
      },
    },
  ];

  const isLastNameKanjiValid = standardKanjiValidator(
    formProps.fields.lastNameKanji.value,
  );
  const kanjiFields = [
    {
      variant: "standard",
      label: {
        value: "姓",
        htmlFor: "last-name-kanji-input",
        error: !standardKanjiValidator(formProps.fields.lastNameKanji.value),
      },
      input: {
        id: "last-name-kanji-input",
        name: "lastNameKanji",
        ...fields.lastNameKanji,
        error: !isLastNameKanjiValid,
      },
    },
    {
      variant: "standard",
      label: {
        value: "名",
        htmlFor: "first-name-kanji-input",
        error: !standardKanjiValidator(formProps.fields.firstNameKanji.value),
      },
      input: {
        id: "first-name-kanji-input",
        name: "firstNameKanji",
        ...fields.firstNameKanji,
        error: !standardKanjiValidator(formProps.fields.firstNameKanji.value),
      },
    },
  ];
  const nameFields = [
    {
      variant: "standard",
      label: {
        value: "Last name (romaji)",
        htmlFor: "last-name-input",
      },
      input: {
        id: "last-name-input",
        name: "lastName",
        ...fields.lastName,
      },
    },
    {
      variant: "standard",
      label: {
        value: "first name (romaji)",
        htmlFor: "first-name",
      },
      input: {
        id: "first-name",
        name: "firstName",
        ...fields.firstName,
      },
    },
  ];

  useEffect(() => {
    reset();
  }, [shouldConvertToFullWidth]);
  return (
    <Box>
      <Grid
        container
        sx={{ alignItems: "center", justifyContent: "space-between" }}
        spacing="16px"
      >
        <Grid sx={{ marginBottom: "48px" }}>
          <h2>Basic Details</h2>
        </Grid>
        <Grid sx={{ width: "calc(50% - 8px)", marginBottom: "48px" }}>
          <FormControl fullWidth variant="standard">
            <InputLabel shrink id="select-small-label">
              Convert to full width immediately?
            </InputLabel>
            <Select
              labelId="select-small-label"
              id="select-small"
              value={shouldConvertToFullWidth ? "yes" : "no"}
              label="Convert to full width"
              onChange={(e) => {
                onShouldConvertToFullWidthChange(e);
              }}
            >
              <MenuItem value="yes">Yes</MenuItem>
              <MenuItem value="no">No</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Box component="form">
        <Grid container direction="column" spacing="24px">
          <Grid
            container
            sx={{ justifyContent: "space-between" }}
            spacing="16px"
            direction="row"
          >
            {kanjiFields.map(
              ({ input: inputProps, label: labelProps, ...rest }) => (
                <HalfSizedFormControl
                  variant={rest.variant}
                  key={inputProps.name}
                  error={labelProps.error}
                >
                  <InputLabel shrink htmlFor={labelProps.htmlFor}>
                    {labelProps.value}
                  </InputLabel>
                  <BoxedInput {...inputProps} />
                </HalfSizedFormControl>
              ),
            )}
          </Grid>
          <Grid
            container
            sx={{ justifyContent: "space-between" }}
            spacing="16px"
            direction="row"
          >
            {katakanaFields.map(
              ({ input: inputProps, label: labelProps, ...rest }) => (
                <HalfSizedFormControl
                  variant={rest.variant as FormControlProps["variant"]}
                  key={inputProps.name}
                >
                  <InputLabel shrink htmlFor={labelProps.htmlFor}>
                    {labelProps.value}
                  </InputLabel>
                  <BoxedInput {...inputProps} />
                </HalfSizedFormControl>
              ),
            )}
          </Grid>
          <Grid
            container
            sx={{ justifyContent: "space-between" }}
            spacing="16px"
            direction="row"
          >
            {nameFields.map(
              ({ input: inputProps, label: labelProps, ...rest }) => (
                <HalfSizedFormControl
                  variant={rest.variant as FormControlProps["variant"]}
                  key={inputProps.name}
                >
                  <InputLabel shrink htmlFor={labelProps.htmlFor}>
                    {labelProps.value}
                  </InputLabel>
                  <BoxedInput {...inputProps} />
                </HalfSizedFormControl>
              ),
            )}
          </Grid>
        </Grid>
      </Box>
      <Grid
        container
        sx={{ justifyContent: "space-between", marginTop: "48px" }}
      >
        <Grid>
          <Button
            variant="outlined"
            onClick={onBack}
            sx={{
              borderColor: "#dbdee2",
              backgroundColor: "#ffffff",
              color: "#00112c",
            }}
          >
            Back
          </Button>
        </Grid>
        <Grid>
          <Button
            variant="outlined"
            onClick={onSubmit}
            sx={{
              borderColor: "#dbdee2",
              backgroundColor: "#ffffff",
              color: "#00112c",
            }}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

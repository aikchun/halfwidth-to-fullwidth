import Grid from "@mui/material/Grid";

import InputLabel from "@mui/material/InputLabel";
import FormControl, { type FormControlProps } from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import { HalfSizedBoxedInput } from "./HalfSizedBoxedInput";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

export interface BasicDetailsSchema {
  lastNameKatakana: string;
  firstNameKatakana: string;
  lastNameKanji: string;
  firstNameKanji: string;
  lastName: string;
  firstName: string;
}

export function BasicDetails(props) {
  const {
    onBack,
    onNext,
    shouldConvertToFullWidth,
    formProps,
    onShouldConvertToFullWidthChange,
  } = props;
  const { fields } = formProps;
  const katakanaFields = [
    {
      variant: "standard" as FormControlProps["variant"],
      label: {
        value: "セイ",
        htmlFor: "last-name-katakana-input",
        error: !!fields.lastNameKatakana.error,
      },
      input: {
        id: "last-name-katakana-input",
        name: "lastNameKatakana",
        ...fields.lastNameKatakana,
      },
    },
    {
      variant: "standard" as FormControlProps["variant"],
      label: {
        value: "メイ",
        htmlFor: "first-name-katakana-input",
        error: !!fields.firstNameKatakana.error,
      },
      input: {
        id: "first-name-katakana-input",
        name: "firstNameKatakana",
        ...fields.firstNameKatakana,
      },
    },
  ];

  const kanjiFields = [
    {
      variant: "standard" as FormControlProps["variant"],
      label: {
        value: "姓",
        htmlFor: "last-name-kanji-input",
        error: !!fields.lastNameKanji.error,
      },
      input: {
        id: "last-name-kanji-input",
        name: "lastNameKanji",
        ...fields.lastNameKanji,
      },
    },
    {
      variant: "standard" as FormControlProps["variant"],
      label: {
        value: "名",
        htmlFor: "first-name-kanji-input",
        error: !!fields.firstNameKanji.error,
      },
      input: {
        id: "first-name-kanji-input",
        name: "firstNameKanji",
        ...fields.firstNameKanji,
      },
    },
  ];
  const nameFields = [
    {
      variant: "standard" as FormControlProps["variant"],
      label: {
        value: "Last name (romaji)",
        htmlFor: "last-name-input",
        error: !!fields.lastName.error,
      },
      input: {
        id: "last-name-input",
        name: "lastName",
        ...fields.lastName,
      },
    },
    {
      variant: "standard" as FormControlProps["variant"],
      label: {
        value: "first name (romaji)",
        htmlFor: "first-name",
        error: !!fields.firstName.error,
      },
      input: {
        id: "first-name",
        name: "firstName",
        ...fields.firstName,
      },
    },
  ];

  return (
    <Box maxWidth="800px" width="100%">
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
            height="80px"
          >
            {kanjiFields.map((fieldProps) => (
              <HalfSizedBoxedInput
                {...fieldProps}
                key={fieldProps.input.name}
              />
            ))}
          </Grid>
          <Grid
            container
            sx={{ justifyContent: "space-between" }}
            spacing="16px"
            direction="row"
            height="80px"
          >
            {katakanaFields.map((fieldProps) => (
              <HalfSizedBoxedInput
                {...fieldProps}
                key={fieldProps.input.name}
              />
            ))}
          </Grid>
          <Grid
            container
            sx={{ justifyContent: "space-between" }}
            spacing="16px"
            direction="row"
            height="80px"
          >
            {nameFields.map((fieldProps) => (
              <HalfSizedBoxedInput
                {...fieldProps}
                key={fieldProps.input.name}
              />
            ))}
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
            onClick={onNext}
            sx={{
              borderColor: "#dbdee2",
              backgroundColor: "#ffffff",
              color: "#00112c",
            }}
          >
            Next
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

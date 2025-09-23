import { useCallback } from "react";

import Grid from "@mui/material/Grid";

import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { BoxedInput } from "./BoxedInput";
import { HalfSizedFormControl } from "./HalfSizedFormControl";
import { halfWidthToFullWidth } from "../utils/halfWidthToFullWidth";

export function BasicDetails(props) {
  const {
    onBack,
    onSubmit,
    formProps,
    handleBasicDetailsFormFieldChange,
    shouldConvertToFullWidth,
    onShouldConvertToFullWidthChange,
  } = props;

  const fullWidthFieldOnchange = useCallback(
    (field) => (e) => {
      const value = shouldConvertToFullWidth
        ? halfWidthToFullWidth(e.target.value)
        : e.target.value;

      handleBasicDetailsFormFieldChange(field, value);
    },
    [shouldConvertToFullWidth],
  );

  const inputOnChange = (field) => (e) => {
    handleBasicDetailsFormFieldChange(field, e.target.value);
  };

  const katakanaFields = [
    {
      variant: "standard",
      label: {
        value: "セイ",
        htmlFor: "last-name-katakana-input",
      },
      input: {
        id: "last-name-katakana-input",
        name: "lastNameKatakana",
        value: formProps.fields.lastNameKatakana.value,
        onChange: fullWidthFieldOnchange("lastNameKatakana"),
      },
    },
    {
      variant: "standard",
      label: {
        value: "メイ",
        htmlFor: "first-name-katakana-input",
      },
      input: {
        id: "first-name-katakana-input",
        name: "firstNameKatakana",
        value: formProps.fields.firstNameKatakana.value,
        onChange: fullWidthFieldOnchange("firstNameKatakana"),
      },
    },
  ];
  const kanjiFields = [
    {
      variant: "standard",
      label: {
        value: "姓",
        htmlFor: "last-name-kanji-input",
      },
      input: {
        id: "last-name-kanji-input",
        name: "lastNameKanji",
        value: formProps.fields.lastNameKanji.value,
        onChange: fullWidthFieldOnchange("lastNameKanji"),
      },
    },
    {
      variant: "standard",
      label: {
        value: "名",
        htmlFor: "first-name-kanji-input",
      },
      input: {
        id: "first-name-kanji-input",
        name: "firstNameKanji",
        value: formProps.fields.firstNameKanji.value,
        onChange: fullWidthFieldOnchange("firstNameKanji"),
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
        value: formProps.fields.lastName.value,
        onChange: inputOnChange("lastName"),
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
        value: formProps.fields.firstName.value,
        onChange: inputOnChange("firstName"),
      },
    },
  ];
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
            {kanjiFields.map((f) => (
              <HalfSizedFormControl variant={f.variant} key={f.input.name}>
                <InputLabel shrink htmlFor={f.label.htmlFor}>
                  {f.label.value}
                </InputLabel>
                <BoxedInput
                  id={f.input.id}
                  name={f.input.name}
                  onChange={f.input.onChange}
                  value={f.input.value}
                />
              </HalfSizedFormControl>
            ))}
          </Grid>
          <Grid
            container
            sx={{ justifyContent: "space-between" }}
            spacing="16px"
            direction="row"
          >
            {katakanaFields.map((f) => (
              <HalfSizedFormControl variant={f.variant} key={f.input.name}>
                <InputLabel shrink htmlFor={f.label.htmlFor}>
                  {f.label.value}
                </InputLabel>
                <BoxedInput
                  id={f.input.id}
                  name={f.input.name}
                  onChange={f.input.onChange}
                  value={f.input.value}
                />
              </HalfSizedFormControl>
            ))}
          </Grid>
          <Grid
            container
            sx={{ justifyContent: "space-between" }}
            spacing="16px"
            direction="row"
          >
            {nameFields.map((f) => (
              <HalfSizedFormControl variant={f.variant} key={f.input.name}>
                <InputLabel shrink htmlFor={f.label.htmlFor}>
                  {f.label.value}
                </InputLabel>
                <BoxedInput
                  id={f.input.id}
                  name={f.input.name}
                  onChange={f.input.onChange}
                  value={f.input.value}
                />
              </HalfSizedFormControl>
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

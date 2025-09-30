import { useMemo, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { HalfSizedBoxedInput } from "./HalfSizedBoxedInput";
import type { FormControlProps } from "@mui/material/FormControl";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import type { FormReducerState } from "../hooks/useForm";
import { halfWidthToFullWidth } from "../utils/halfWidthToFullWidth";

// interface AutocompleteAddress {
//   label:string;
//       postalCode: string;
//       prefectureKanji: string;
//       districtKanji: string;
//       prefectureKatakana: string;
//       districtKatakana: string;
//       prefecture: string;
//       district: string;
// }
interface AutocompleteAddress {
  [key: string]: string;
}

export interface AddressSchema {
  postalCode: string;
  prefectureKanji: string;
  cityKanji: string;
  chomeKanji: string;
  buildingNameKanji: string;
  prefectureKatakana: string;
  cityKatakana: string;
  prefecture: string;
  city: string;
  buildingName: string;
  chome: string;
}
export function Address(props) {
  const {
    onBack,
    onSubmit,
    formProps,
    shouldConvertToFullWidth,
    onAddressChange,
  } = props;

  const [postalCodeInputValue, setPostalCodeInputValue] = useState("");

  const addresses: AutocompleteAddress[] = [
    {
      postalCode: "530-0001",
      prefectureKanji: "東京都",
      cityKanji: "千代田,千代田区",
      prefectureKatakana: "トウキョウト",
      cityKatakana: "チヨダ,チヨダク",
      prefecture: "Tokyo",
      city: "Chiyoda, Chiyoda-ku, Tokyo",
    },
    {
      postalCode: "249-0005",
      prefectureKanji: "神奈川県",
      cityKanji: "逗子市",
      prefectureKatakana: "カナガワケン",
      cityKatakana: "ズシシ",
      prefecture: "Kanagawa",
      city: "Zushi",
    },
  ];
  const autocompleteOptions = addresses.map((s) =>
    shouldConvertToFullWidth
      ? halfWidthToFullWidth(s.postalCode)
      : s.postalCode,
  );

  const selectedAddress = useMemo(() => {
    const convert = (value) =>
      shouldConvertToFullWidth ? halfWidthToFullWidth(value) : value;

    const formPostalCode = shouldConvertToFullWidth
      ? halfWidthToFullWidth(formProps.postalCode.value)
      : formProps.postalCode.value;
    return addresses.find((a) => convert(a.postalCode) === formPostalCode);
  }, [formProps.postalCode.value]) as AutocompleteAddress;

  useEffect(() => {
    if (!selectedAddress) {
      return;
    }
    const newState = {
      fields: {
        ...formProps,
        postalCode: {
          ...(formProps.postalCode ?? {
            value: "",
            touched: false,
            error: "",
          }),
        },
      },
    };

    Object.keys(selectedAddress).forEach(
      (key: keyof FormReducerState<AddressSchema>["fields"]) => {
        newState.fields[key] = {
          ...formProps[key],
          value: selectedAddress[key],
        };
      },
    );
    onAddressChange(newState);
  }, [selectedAddress]);

  const inputFields = {
    postalCode: {
      variant: "standard" as FormControlProps["variant"],
      label: {
        value: "Postal Code",
        htmlFor: "postal-code",
        error: !!formProps.postalCode.error,
      },
      input: {
        id: "postal-code",
        name: "postalCode",
        ...formProps.postalCode,
      },
    },
    prefectureKanji: {
      variant: "standard" as FormControlProps["variant"],
      label: {
        value: "Prefecture",
        htmlFor: "prefecture",
        error: !!formProps.prefectureKanji.error,
      },
      input: {
        id: "prefecture",
        name: "prefecture",
        ...formProps.prefectureKanji,
        disabled: !!selectedAddress && !!selectedAddress.prefectureKanji,
      },
    },
    cityKanji: {
      variant: "standard" as FormControlProps["variant"],
      label: {
        value: "City/ Ward",
        htmlFor: "city",
        error: !!formProps.cityKanji.error,
      },
      input: {
        id: "city",
        name: "city",
        disabled: !!selectedAddress && !!selectedAddress.cityKanji,
        ...formProps.cityKanji,
      },
    },

    chomeKanji: {
      variant: "standard" as FormControlProps["variant"],
      label: {
        value: "Chome and Banchi",
        htmlFor: "chomeKanji",
        error: !!formProps.chomeKanji.error,
      },
      input: {
        id: "chomeKanji",
        name: "chomeKanji",
        disabled: !!selectedAddress && !!selectedAddress.chomeKanji,
        ...formProps.chomeKanji,
      },
    },
    buildingNameKanji: {
      variant: "standard" as FormControlProps["variant"],
      label: {
        value: "Building name / Floor / Room number / etc. (optional)",
        htmlFor: "buildingNameKanji",
        error: !!formProps.buildingNameKanji.error,
      },
      input: {
        id: "buildingNameKanji",
        name: "buildingNameKanji",
        fullWidth: true,
        disabled: !!selectedAddress && !!selectedAddress.buildingNameKanji,
        ...formProps.buildingNameKanji,
      },
    },
    prefectureKatakana: {
      variant: "standard" as FormControlProps["variant"],
      label: {
        value: "Prefecture",
        htmlFor: "prefecture",
        error: !!formProps.prefectureKatakana.error,
      },
      input: {
        id: "prefecture",
        name: "prefecture",
        disabled: !!selectedAddress && !!selectedAddress.prefectureKatakana,
        ...formProps.prefectureKatakana,
      },
    },
    cityKatakana: {
      variant: "standard" as FormControlProps["variant"],
      label: {
        value: "City / Ward",
        htmlFor: "city",
        error: !!formProps.cityKatakana.error,
      },
      input: {
        id: "city",
        name: "city",
        disabled: !!selectedAddress && !!selectedAddress.cityKatakana,
        ...formProps.cityKatakana,
      },
    },
    prefecture: {
      variant: "standard" as FormControlProps["variant"],
      label: {
        value: "Prefecture",
        htmlFor: "prefecture",
        error: !!formProps.prefecture.error,
      },
      input: {
        id: "prefecture",
        name: "prefecture",
        disabled: !!selectedAddress && !!selectedAddress.prefecture,
        ...formProps.prefecture,
      },
    },
    city: {
      variant: "standard" as FormControlProps["variant"],
      label: {
        value: "District / Town area, / Ward",
        htmlFor: "city",
        error: !!formProps.city.error,
      },
      input: {
        id: "city",
        name: "city",
        disabled: !!selectedAddress && !!selectedAddress.city,
        ...formProps.city,
      },
    },
    chome: {
      variant: "standard" as FormControlProps["variant"],
      label: {
        value: "chome",
        htmlFor: "chome",
        error: !!formProps.chome.error,
      },
      input: {
        id: "chome",
        name: "chome",
        disabled: !!selectedAddress && !!selectedAddress.chome,
        ...formProps.chome,
      },
    },
    buildingName: {
      variant: "standard" as FormControlProps["variant"],
      label: {
        value: "Building name / Floor / Room number / etc. (optional)",
        htmlFor: "buildingName",
        error: !!formProps.buildingName.error,
      },
      input: {
        id: "buildingName",
        name: "buildingName",
        fullWidth: true,
        disabled: !!selectedAddress && !!selectedAddress.buildingName,
        ...formProps.buildingName,
      },
    },
  };

  return (
    <Box maxWidth="800px" width="100%">
      <Grid
        container
        sx={{ alignItems: "center", justifyContent: "space-between" }}
        spacing="16px"
        height="100px"
      >
        <Grid sx={{ marginBottom: "48px" }}>
          <h2>Address</h2>
        </Grid>
      </Grid>
      <Box component="form">
        <Grid container direction="column" spacing="24px">
          <Grid
            container
            sx={{ justifyContent: "space-between" }}
            spacing="16px"
            direction="row"
            height="100px"
          >
            {[inputFields.postalCode].map((fieldProps) => (
              <Autocomplete
                disablePortal
                options={autocompleteOptions}
                sx={{ width: 300 }}
                value={fieldProps.input.value as string}
                renderInput={(params) => (
                  <TextField {...params} label={fieldProps.label.value} />
                )}
                onChange={(_: any, newValue: string | null) => {
                  onAddressChange({
                    ...formProps,
                    fields: {
                      ...formProps,
                      postalCode: {
                        ...formProps.postalCode,
                        touched: true,
                        error: "",
                        value: shouldConvertToFullWidth
                          ? halfWidthToFullWidth(newValue ?? "")
                          : (newValue ?? ""),
                      },
                    },
                  });
                }}
                inputValue={postalCodeInputValue}
                onInputChange={(e, newValue) => {
                  const value = shouldConvertToFullWidth
                    ? halfWidthToFullWidth(newValue)
                    : newValue;
                  setPostalCodeInputValue(value);
                }}
              />
            ))}
          </Grid>
        </Grid>
        <Grid container sx={{ marginTop: "32px" }}>
          <h3>Kanji Address</h3>
        </Grid>
        <Grid
          container
          sx={{ justifyContent: "space-between" }}
          spacing="16px"
          direction="row"
          height="100px"
        >
          {[inputFields.prefectureKanji, inputFields.cityKanji].map(
            (fieldProps) => (
              <HalfSizedBoxedInput
                {...fieldProps}
                key={fieldProps.input.name}
              />
            ),
          )}
        </Grid>
        <Grid
          container
          sx={{ justifyContent: "space-between" }}
          spacing="16px"
          direction="row"
          height="100px"
        >
          {[inputFields.chomeKanji].map((fieldProps) => (
            <HalfSizedBoxedInput {...fieldProps} key={fieldProps.input.name} />
          ))}
        </Grid>
        <Grid
          container
          sx={{ justifyContent: "space-between" }}
          spacing="16px"
          direction="row"
          height="100px"
        >
          {[inputFields.buildingNameKanji].map((fieldProps) => (
            <HalfSizedBoxedInput {...fieldProps} key={fieldProps.input.name} />
          ))}
        </Grid>
        <Grid container sx={{ marginTop: "32px" }}>
          <h3>Katakana Address</h3>
        </Grid>
        <Grid
          container
          sx={{ justifyContent: "space-between" }}
          spacing="16px"
          direction="row"
          height="100px"
        >
          {[inputFields.prefectureKatakana, inputFields.cityKatakana].map(
            (fieldProps) => (
              <HalfSizedBoxedInput
                {...fieldProps}
                key={fieldProps.input.name}
              />
            ),
          )}
        </Grid>
        <Grid container sx={{ marginTop: "32px" }}>
          <h3>Romaji Address</h3>
        </Grid>
        <Grid
          container
          sx={{ justifyContent: "space-between" }}
          spacing="16px"
          direction="row"
          height="100px"
        >
          {[inputFields.prefecture, inputFields.city].map((fieldProps) => (
            <HalfSizedBoxedInput {...fieldProps} key={fieldProps.input.name} />
          ))}
        </Grid>
        <Grid
          container
          sx={{ justifyContent: "space-between" }}
          spacing="16px"
          direction="row"
          height="100px"
        >
          {[inputFields.chome].map((fieldProps) => (
            <HalfSizedBoxedInput {...fieldProps} key={fieldProps.input.name} />
          ))}
        </Grid>
        <Grid
          container
          sx={{ justifyContent: "space-between" }}
          spacing="16px"
          direction="row"
          height="100px"
        >
          {[inputFields.buildingName].map((fieldProps) => (
            <HalfSizedBoxedInput {...fieldProps} key={fieldProps.input.name} />
          ))}
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

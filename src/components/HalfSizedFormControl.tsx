import { styled } from "@mui/material/styles";

import FormControl from "@mui/material/FormControl";

export const HalfSizedFormControl = styled(FormControl)(() => ({
  "&": {
    width: "calc(50% - 8px)",
  },
}));
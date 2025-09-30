import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";
import { BoxedInput } from "./BoxedInput";
import { HalfSizedFormControl } from "./HalfSizedFormControl";
import FormControl from "@mui/material/FormControl";

export const HalfSizedBoxedInput = (props) => {
	const { input, label, ...rest } = props;
	const FormControlComponent = input.fullWidth
		? FormControl
		: HalfSizedFormControl;
	return (
		<FormControlComponent
			variant={rest.variant}
			error={label.error}
			fullWidth={input.fullWidth}
			disabled={input.disabled}
		>
			<InputLabel shrink htmlFor={label.htmlFor}>
				{label.value}
			</InputLabel>
			<BoxedInput {...input} error={!!input.error} />
			{!!input.error && <FormHelperText>{input.error}</FormHelperText>}
		</FormControlComponent>
	);
};

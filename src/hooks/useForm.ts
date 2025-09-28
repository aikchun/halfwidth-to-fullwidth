import { useMemo, useReducer } from "react";
import type { SyntheticEvent } from "react";

interface Field {
	onChange?: (value: string, field: string, e: SyntheticEvent) => string;
	onBlur?: (value: string, field: string, e: SyntheticEvent) => string;
	value: string;
}
interface UseFormProps {
	fields: {
		[key: string]: Field;
	};
}

interface UseFormResultField {
	value: string;
	touched: boolean;
	onChange: (e: SyntheticEvent) => void;
	onBlur: (e: SyntheticEvent) => void;
}

type FormReducerActionType = "ON_CHANGE" | "ON_BLUR" | "RESET";

interface FormReducerAction<T> {
	type: FormReducerActionType;
	field?: keyof T;
	value?: string;
	state?: FormReducerState<T>;
}

interface FormField {
	value: string;
	touched: boolean;
}

type FormReducerStateFields<T> = {
	[key in keyof T]?: FormField;
};

interface FormReducerState<T> {
	fields: FormReducerStateFields<T>;
}

function formReducer<T>(
	state: FormReducerState<T> = { fields: {} },
	action: FormReducerAction<T>,
) {
	if (!action.field && !action.state) {
		return state;
	}

	switch (action.type) {
		case "ON_CHANGE":
			return {
				...state,
				fields: {
					...state.fields,
					[action.field]: {
						...(state.fields[action.field] ?? {
							value: "",
							touched: false,
						}),
						value: action.value,
					},
				},
			};
		case "ON_BLUR":
			return {
				...state,
				fields: {
					...state.fields,
					[action.field]: {
						...(state.fields[action.field] ?? {
							value: "",
							touched: true,
						}),
						value: action.value,
						touched: true,
					},
				},
			};
		case "RESET":
			return action.state;
	}
	return state;
}

export function useForm(props: UseFormProps) {
	const { fields: formPropsFields } = props;

	const initialState = useMemo(() => {
		const initialStateResult = {
			fields: {} as Record<keyof UseFormProps["fields"], FormField>,
		};
		Object.keys(formPropsFields).forEach((key) => {
			initialStateResult.fields[key] = {
				value: formPropsFields[key].value,
				touched: false,
			};
		});
		return initialStateResult;
	}, [props]);

	const [state, dispatch] = useReducer(
		formReducer<UseFormProps["fields"]>,
		initialState ?? { fields: {} },
	);

	const createHandleOnChange =
		(onChange: Field["onChange"], field: string) => (e: SyntheticEvent) => {
			const targetValue = (e.target as HTMLInputElement).value;
			const value = onChange
				? onChange(targetValue, field, e)
				: targetValue;

			dispatch({ type: "ON_CHANGE", value, field });
		};

	const createHandleOnBlur =
		(onBlur: Field["onBlur"], field: string) => (e: SyntheticEvent) => {
			const targetValue = (e.target as HTMLInputElement).value;
			const value = onBlur ? onBlur(targetValue, field, e) : targetValue;

			dispatch({ type: "ON_BLUR", value, field });
		};

	const fields = useMemo(() => {
		const formResult = {} as Record<
			keyof UseFormProps["fields"],
			UseFormResultField
		>;

		if (!state) {
			return {};
		}

		Object.keys(state.fields).forEach((key) => {
			const value = state.fields[key]?.value;
			const touched = !!state.fields[key]?.touched as boolean;
			formResult[key] = {
				value,
				touched,
				onChange: createHandleOnChange(
					formPropsFields[key as string].onChange,
					key,
				),
				onBlur: createHandleOnBlur(formPropsFields[key].onBlur, key),
			} as UseFormResultField;
		});
		return formResult;
	}, [state]);

	const reset = () => {
		dispatch({ type: "RESET", state: initialState });
	};

	return { fields, reset };
}

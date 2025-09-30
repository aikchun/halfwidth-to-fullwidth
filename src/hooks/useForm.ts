import { useMemo, useReducer } from "react";
import type { SyntheticEvent } from "react";
import type { AddressSchema } from "../components/Address";

interface Field {
	onChange?: (value: string, field: string, e: SyntheticEvent) => string;
	onBlur?: (value: string, field: string, e: SyntheticEvent) => string;
	value: string;
}
export interface UseFormProps<T> {
	fields: {
		[key: string]: Field;
	};
	validate?: (state: FormReducerState<T>) => ValidateResult<T>;
}

export type ValidateResult<T> = {
	[key in keyof T]?: string;
};

export interface UseFormResultField {
	value: string | boolean;
	touched: boolean;
	onChange: (e: SyntheticEvent) => void;
	onBlur: (e: SyntheticEvent) => void;
	error: string;
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
	error: string;
}

export type FormReducerStateFields<T> = {
	[key in keyof T]?: FormField;
};

export interface FormReducerState<T> {
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
			return action.state;
		case "ON_BLUR":
			return action.state;
		case "RESET":
			return (
				action.state ??
				Object.keys(state.fields).reduce(
					(acc, key) => ({
						...acc,
						fields: {
							...acc.fields,
							[key]: { value: "", touched: false },
						},
					}),
					{ fields: {} },
				)
			);
	}
	return state;
}

export function useForm<T>(props: UseFormProps<T>) {
	const { fields: formPropsFields } = props;

	const initialState = useMemo(() => {
		const initialStateResult = {
			fields: {} as Record<keyof UseFormProps<T>["fields"], FormField>,
		};
		Object.keys(formPropsFields).forEach((key) => {
			initialStateResult.fields[key] = {
				value: formPropsFields[key].value,
				touched: false,
				error: false,
			};
		});
		return initialStateResult;
	}, [props]);

	const [state, dispatch] = useReducer(
		formReducer<UseFormProps<T>["fields"]>,
		initialState ?? { fields: {} },
	);

	const createHandleOnChange =
		(onChange: Field["onChange"], field: string) => (e: SyntheticEvent) => {
			const targetValue = (e.target as HTMLInputElement).value;
			const value = onChange
				? onChange(targetValue, field, e)
				: targetValue;

			const newState = {
				fields: {} as FormReducerState<T>["fields"],
				...state,
			} as FormReducerState<T>;

			newState.fields[field].value = value;

			const errors: ValidateResult<T> = props.validate
				? props.validate(newState)
				: ({} as ValidateResult<T>);

			Object.keys(newState.fields).forEach((key) => {
				newState.fields[key].error = errors[key] ?? false;
				if (key === field) {
					newState.fields[field].value = value;
				}
			});

			dispatch({ type: "ON_CHANGE", state: newState });
		};

	const createHandleOnBlur =
		(onBlur: Field["onBlur"], field: string) => (e: SyntheticEvent) => {
			const targetValue = (e.target as HTMLInputElement).value;
			const value = onBlur ? onBlur(targetValue, field, e) : targetValue;

			const newState = {
				fields: {} as FormReducerState<T>["fields"],
				...state,
			} as FormReducerState<T>;

			newState.fields[field].touched = true;

			const errors: ValidateResult<T> = props.validate
				? props.validate(newState)
				: ({} as ValidateResult<T>);

			Object.keys(newState.fields).forEach((key) => {
				newState.fields[key].error = errors[key] ?? false;
				if (key === field) {
					newState.fields[field].value = value;
				}
			});

			dispatch({ type: "ON_BLUR", state: newState });
		};

	const fields = useMemo(() => {
		const formResult = {} as Record<
			keyof AddressSchemaz,
			UseFormResultField
		>;

		if (!state) {
			return {};
		}

		Object.keys(state.fields).forEach((key) => {
			const field = state.fields[key] ?? ({} as UseFormResultField);
			const { value, touched, error } = field;
			formResult[key] = {
				value,
				touched,
				error,
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

	return { fields, reset, dispatch };
}

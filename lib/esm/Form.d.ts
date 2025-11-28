import React from "react";
import type { FieldValues, UseFormSetError, UseFormReturn } from "react-hook-form";
import type { FormProps } from "./form-types";
export interface FormRef<T extends FieldValues> extends Partial<UseFormReturn<T>> {
    submit: () => Promise<void>;
    validate: () => Promise<boolean>;
    setError?: UseFormSetError<T>;
}
export declare const Form: <T extends FieldValues>(props: FormProps<T> & {
    ref?: React.Ref<FormRef<T>>;
}) => React.ReactElement;

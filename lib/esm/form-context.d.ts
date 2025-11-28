import type { UseFormReturn, FieldValues } from "react-hook-form";
export declare const FormContext: import("react").Context<UseFormReturn<any> | null>;
export declare const useFormContext: <T extends FieldValues = FieldValues>() => UseFormReturn<T>;

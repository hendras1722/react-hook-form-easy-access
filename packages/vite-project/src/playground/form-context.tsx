
import { createContext, useContext } from "react";
import type { UseFormReturn, FieldValues } from "react-hook-form";

export const FormContext = createContext<UseFormReturn<any> | null>(null);

export const useFormContext = <
  T extends FieldValues = FieldValues
>(): UseFormReturn<T> => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a Form component");
  }
  return context as UseFormReturn<T>;
};
import type { ReactNode, ReactElement } from "react";
import type {
  FieldValues,
  UseFormReturn,
  SubmitHandler,
  DefaultValues,
  ArrayPath,
  UseFieldArrayReturn,
  UseFormProps,
} from "react-hook-form";
import type { SchemaConfig } from "./form-utils";

export interface FormProps<T extends FieldValues> {
  children:
  | ReactNode
  | ((
    methods: UseFormReturn<T> & {
      submit: () => void;
      isPending: boolean;
      useFieldArray: <K extends ArrayPath<T>>(
        name: K
      ) => UseFieldArrayReturn<T, K>;
    }
  ) => ReactNode);
  onSubmit: SubmitHandler<T>;
  schema?: SchemaConfig | any;
  defaultValues?: DefaultValues<T>;
  className?: string;
  config?: Omit<UseFormProps<T>, "defaultValues" | "resolver">;
}

export interface FormFieldProps {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
  children: ReactElement;
  rules?: object;
}
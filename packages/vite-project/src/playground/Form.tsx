"use client";

import React, {
  useCallback,
  useMemo,
  useImperativeHandle,
  forwardRef
} from "react";
import {
  useForm,
  FormProvider,
  useFieldArray,
} from "react-hook-form";
import type { FieldValues, ArrayPath, UseFormSetError, UseFormReturn } from "react-hook-form";

import { FormContext } from "./form-context";
import { getResolver } from "./form-utils";
import type { FormProps } from "./form-types";

export interface FormRef<T extends FieldValues>
  extends Partial<UseFormReturn<T>> {
  submit: () => Promise<void>;
  validate: () => Promise<boolean>;
  setError?: UseFormSetError<T>;
}

const FormComponent = <T extends FieldValues>(
  {
    children,
    onSubmit,
    schema,
    defaultValues,
    className = "",
    config = {},
  }: FormProps<T>,
  ref: React.Ref<FormRef<T>>
) => {
  const resolver = getResolver(schema);

  const methods = useForm<T>({
    resolver,
    defaultValues,
    mode: "onChange",
    ...config,
  });

  const submit = useCallback(async () => {
    await methods.handleSubmit(onSubmit)();
  }, [methods, onSubmit]);

  const validate = useCallback(async () => {
    return await methods.trigger();
  }, [methods]);

  useImperativeHandle(
    ref,
    () => ({
      ...methods,
      submit,
      validate,
      setError: methods.setError,
    }),
    [submit, validate]
  );

  function useFieldArrayFactory<K extends ArrayPath<T>>(name: K) {
    return useFieldArray({
      control: methods.control,
      name,
    });
  }

  const enhancedMethods = useMemo(
    () => ({
      ...methods,
      submit,
      validate,
      ...methods,
      isPending: methods.formState.isSubmitting,
      useFieldArray: useFieldArrayFactory,
      setError: methods.setError,
    }),
    [methods, submit, validate]
  );

  return (
    <FormProvider {...methods}>
      <FormContext.Provider value={methods}>
        <form
          className={className}
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          {typeof children === "function"
            ? children(enhancedMethods)
            : children}
        </form>
      </FormContext.Provider>
    </FormProvider>
  );
};

export const Form = forwardRef(FormComponent) as <T extends FieldValues>(
  props: FormProps<T> & { ref?: React.Ref<FormRef<T>> }
) => React.ReactElement;

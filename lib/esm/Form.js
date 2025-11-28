"use client";
import React, { useCallback, useMemo, useImperativeHandle, forwardRef } from "react";
import { useForm, FormProvider, useFieldArray, } from "react-hook-form";
import { FormContext } from "./form-context";
import { getResolver } from "./form-utils";
const FormComponent = ({ children, onSubmit, schema, defaultValues, className = "", config = {}, }, ref) => {
    const resolver = getResolver(schema);
    const methods = useForm({
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
    useImperativeHandle(ref, () => ({
        ...methods,
        submit,
        validate,
        setError: methods.setError,
    }), [submit, validate]);
    function useFieldArrayFactory(name) {
        return useFieldArray({
            control: methods.control,
            name,
        });
    }
    const enhancedMethods = useMemo(() => ({
        ...methods,
        submit,
        validate,
        ...methods,
        isPending: methods.formState.isSubmitting,
        useFieldArray: useFieldArrayFactory,
        setError: methods.setError,
    }), [methods, submit, validate]);
    return (React.createElement(FormProvider, { ...methods },
        React.createElement(FormContext.Provider, { value: methods },
            React.createElement("form", { className: className, onSubmit: methods.handleSubmit(onSubmit) }, typeof children === "function"
                ? children(enhancedMethods)
                : children))));
};
export const Form = forwardRef(FormComponent);

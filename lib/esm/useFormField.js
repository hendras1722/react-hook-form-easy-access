"use client";
import { useFormContext as useRHFContext, useFieldArray } from "react-hook-form";
export const useFormField = (name) => {
    const methods = useRHFContext();
    const { fields, append, remove, insert, update, prepend, swap, move } = useFieldArray({
        control: methods.control,
        name,
    });
    return {
        fields,
        append,
        remove,
        insert,
        update,
        prepend,
        swap,
        move,
    };
};

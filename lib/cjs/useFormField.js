"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFormField = void 0;
const react_hook_form_1 = require("react-hook-form");
const useFormField = (name) => {
    const methods = (0, react_hook_form_1.useFormContext)();
    const { fields, append, remove, insert, update, prepend, swap, move } = (0, react_hook_form_1.useFieldArray)({
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
exports.useFormField = useFormField;

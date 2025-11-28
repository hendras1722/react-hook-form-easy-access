"use client";
import React from "react";
import { Controller, useFormContext as useRHFContext } from "react-hook-form";
export const FormField = ({ name, label, required = false, className = "", children, rules = {}, }) => {
    const { formState: { errors }, } = useRHFContext();
    const error = name
        .split(".")
        .reduce((obj, key) => (obj && obj[key] ? obj[key] : undefined), errors);
    const fieldRules = {
        ...rules,
        ...(required && { required: `${label || name} wajib diisi` }),
    };
    if (!children) {
        throw new Error("FormField requires children. Use <FormField name='...'><input /></FormField>");
    }
    return (React.createElement(Controller, { name: name, rules: fieldRules, render: ({ field }) => (React.createElement("div", { className: `mb-4 ${className}` },
            label && (React.createElement("label", { htmlFor: name, className: "block text-sm font-medium mb-1 text-white" },
                label,
                required && React.createElement("span", { className: "text-red-500 ml-1" }, "*"))),
            React.cloneElement(children, {
                ...field,
                id: name,
                "aria-invalid": !!error,
                "aria-describedby": error ? `${name}-error` : undefined,
            }),
            error && (React.createElement("p", { id: `${name}-error`, className: "mt-1 text-sm text-red-400" }, (error.message || "Field tidak valid"))))) }));
};

"use client";

import React from "react";
import { Controller, useFormContext as useRHFContext } from "react-hook-form";
import type { FormFieldProps } from "./form-types";

export const FormField = ({
  name,
  label,
  required = false,
  className = "",
  children,
  rules = {},
}: FormFieldProps) => {
  const {
    formState: { errors },
  } = useRHFContext();

  const error = name
    .split(".")
    .reduce(
      (obj: any, key) => (obj && obj[key] ? obj[key] : undefined),
      errors
    );

  const fieldRules = {
    ...rules,
    ...(required && { required: `${label || name} wajib diisi` }),
  };

  if (!children) {
    throw new Error(
      "FormField requires children. Use <FormField name='...'><input /></FormField>"
    );
  }

  return (
    <Controller
      name={name}
      rules={fieldRules}
      render={({ field }) => (
        <div className={`mb-4 ${className}`}>
          {label && (
            <label
              htmlFor={name}
              className="block text-sm font-medium mb-1 text-white"
            >
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </label>
          )}
          {React.cloneElement(children as React.ReactElement<any>, {
            ...field,
            id: name,
            "aria-invalid": !!error,
            "aria-describedby": error ? `${name}-error` : undefined,
          })}
          {error && (
            <p id={`${name}-error`} className="mt-1 text-sm text-red-400">
              {(error.message || "Field tidak valid") as string}
            </p>
          )}
        </div>
      )}
    />
  );
};
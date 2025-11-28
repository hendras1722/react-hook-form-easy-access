"use client";
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormField = void 0;
const react_1 = __importDefault(require("react"));
const react_hook_form_1 = require("react-hook-form");
const FormField = ({ name, label, required = false, className = "", children, rules = {}, }) => {
    const { formState: { errors }, } = (0, react_hook_form_1.useFormContext)();
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
    return (react_1.default.createElement(react_hook_form_1.Controller, { name: name, rules: fieldRules, render: ({ field }) => (react_1.default.createElement("div", { className: `mb-4 ${className}` },
            label && (react_1.default.createElement("label", { htmlFor: name, className: "block text-sm font-medium mb-1 text-white" },
                label,
                required && react_1.default.createElement("span", { className: "text-red-500 ml-1" }, "*"))),
            react_1.default.cloneElement(children, {
                ...field,
                id: name,
                "aria-invalid": !!error,
                "aria-describedby": error ? `${name}-error` : undefined,
            }),
            error && (react_1.default.createElement("p", { id: `${name}-error`, className: "mt-1 text-sm text-red-400" }, (error.message || "Field tidak valid"))))) }));
};
exports.FormField = FormField;

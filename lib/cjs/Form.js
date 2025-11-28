"use client";
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Form = void 0;
const react_1 = __importStar(require("react"));
const react_hook_form_1 = require("react-hook-form");
const form_context_1 = require("./form-context");
const form_utils_1 = require("./form-utils");
const FormComponent = ({ children, onSubmit, schema, defaultValues, className = "", config = {}, }, ref) => {
    const resolver = (0, form_utils_1.getResolver)(schema);
    const methods = (0, react_hook_form_1.useForm)({
        resolver,
        defaultValues,
        mode: "onChange",
        ...config,
    });
    const submit = (0, react_1.useCallback)(async () => {
        await methods.handleSubmit(onSubmit)();
    }, [methods, onSubmit]);
    const validate = (0, react_1.useCallback)(async () => {
        return await methods.trigger();
    }, [methods]);
    (0, react_1.useImperativeHandle)(ref, () => ({
        ...methods,
        submit,
        validate,
        setError: methods.setError,
    }), [submit, validate]);
    function useFieldArrayFactory(name) {
        return (0, react_hook_form_1.useFieldArray)({
            control: methods.control,
            name,
        });
    }
    const enhancedMethods = (0, react_1.useMemo)(() => ({
        ...methods,
        submit,
        validate,
        ...methods,
        isPending: methods.formState.isSubmitting,
        useFieldArray: useFieldArrayFactory,
        setError: methods.setError,
    }), [methods, submit, validate]);
    return (react_1.default.createElement(react_hook_form_1.FormProvider, { ...methods },
        react_1.default.createElement(form_context_1.FormContext.Provider, { value: methods },
            react_1.default.createElement("form", { className: className, onSubmit: methods.handleSubmit(onSubmit) }, typeof children === "function"
                ? children(enhancedMethods)
                : children))));
};
exports.Form = (0, react_1.forwardRef)(FormComponent);

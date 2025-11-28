"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFormContext = exports.FormContext = void 0;
const react_1 = require("react");
exports.FormContext = (0, react_1.createContext)(null);
const useFormContext = () => {
    const context = (0, react_1.useContext)(exports.FormContext);
    if (!context) {
        throw new Error("useFormContext must be used within a Form component");
    }
    return context;
};
exports.useFormContext = useFormContext;

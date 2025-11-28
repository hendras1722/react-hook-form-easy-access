"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResolver = void 0;
const zod_1 = require("@hookform/resolvers/zod");
const yup_1 = require("@hookform/resolvers/yup");
const getResolver = (schema) => {
    if (!schema)
        return undefined;
    // ─────────────────────────────────────────────
    // 1. EXPLICIT CONFIG MODE  { type, schema }
    // ─────────────────────────────────────────────
    if (typeof schema === "object" && "type" in schema && "schema" in schema) {
        const { type, schema: validationSchema } = schema;
        switch (type) {
            case "zod":
                return (0, zod_1.zodResolver)(validationSchema);
            case "yup":
                return (0, yup_1.yupResolver)(validationSchema);
            default:
                console.warn(`Unknown schema type: ${type}`);
                return undefined;
        }
    }
    // ─────────────────────────────────────────────
    // 2. AUTO-DETECT MODE
    // ─────────────────────────────────────────────
    if (typeof schema === "object") {
        // Zod detection
        if ("_def" in schema || "safeParse" in schema) {
            return (0, zod_1.zodResolver)(schema);
        }
        // Yup detection
        if ("__isYupSchema__" in schema) {
            return (0, yup_1.yupResolver)(schema);
        }
    }
    console.warn("Unable to detect schema type, proceeding without validation");
    return undefined;
};
exports.getResolver = getResolver;

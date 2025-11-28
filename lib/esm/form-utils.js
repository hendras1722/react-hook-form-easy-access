import { zodResolver } from "@hookform/resolvers/zod";
import { yupResolver } from "@hookform/resolvers/yup";
export const getResolver = (schema) => {
    if (!schema)
        return undefined;
    // ─────────────────────────────────────────────
    // 1. EXPLICIT CONFIG MODE  { type, schema }
    // ─────────────────────────────────────────────
    if (typeof schema === "object" && "type" in schema && "schema" in schema) {
        const { type, schema: validationSchema } = schema;
        switch (type) {
            case "zod":
                return zodResolver(validationSchema);
            case "yup":
                return yupResolver(validationSchema);
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
            return zodResolver(schema);
        }
        // Yup detection
        if ("__isYupSchema__" in schema) {
            return yupResolver(schema);
        }
    }
    console.warn("Unable to detect schema type, proceeding without validation");
    return undefined;
};

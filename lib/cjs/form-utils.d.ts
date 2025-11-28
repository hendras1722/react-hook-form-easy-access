import type { Resolver } from "react-hook-form";
export type SchemaType = "zod" | "yup";
export interface SchemaConfig {
    type: SchemaType;
    schema: any;
}
export declare const getResolver: (schema?: SchemaConfig | any) => Resolver<any> | undefined;

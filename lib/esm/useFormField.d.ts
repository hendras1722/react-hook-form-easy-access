export declare const useFormField: (name: string) => {
    fields: Record<"id", string>[];
    append: import("react-hook-form").UseFieldArrayAppend<import("react-hook-form").FieldValues, string>;
    remove: import("react-hook-form").UseFieldArrayRemove;
    insert: import("react-hook-form").UseFieldArrayInsert<import("react-hook-form").FieldValues, string>;
    update: import("react-hook-form").UseFieldArrayUpdate<import("react-hook-form").FieldValues, string>;
    prepend: import("react-hook-form").UseFieldArrayPrepend<import("react-hook-form").FieldValues, string>;
    swap: import("react-hook-form").UseFieldArraySwap;
    move: import("react-hook-form").UseFieldArrayMove;
};

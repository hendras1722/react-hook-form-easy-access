# Form Component Library

A composable, flexible form library for React, built on top of `react-hook-form`.

## Features

- 🧩 **Composable**: Build forms using `Form` and `FormField` components.
- 🛡️ **Schema Validation**: Built-in support for **Zod**, **Yup**, **Joi**, **Superstruct**, and **Vest** (auto-detected).
- 🔄 **Dynamic Fields**: Easy management of array fields with `useFormField`.
- 💅 **Headless UI**: Full control over styling (Tailwind ready).
- 🚀 **Performance**: Optimized renders using `react-hook-form`.

## Installation

How to install react-hook-form-easy:

```bash
npm install react-hook-form-easy
```

## Usage

### 1. Basic Form

The `Form` component acts as a provider, and `FormField` handles individual inputs.

```tsx
import { Form, FormField } from "react-hook-form-easy";
import { z } from "zod";

// 1. Define Schema
const schema = z.object({
  username: z.string().min(3, "Username must be at least 3 chars"),
  email: z.string().email("Invalid email"),
});

export default function LoginForm() {
  const handleSubmit = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <Form 
      schema={schema} 
      onSubmit={handleSubmit} 
      defaultValues={{ username: "", email: "" }}
      className="space-y-4"
    >
      <FormField name="username" label="Username" required>
        <input className="border p-2 rounded w-full text-black" placeholder="Enter username" />
      </FormField>

      <FormField name="email" label="Email" required>
        <input className="border p-2 rounded w-full text-black" type="email" placeholder="Enter email" />
      </FormField>

      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Login
      </button>
    </Form>
  );
}
```

### 2. Accessing Form Methods (Render Props)

If you need access to form methods like `reset`, `setValue`, or `isPending` inside the form, use the render prop pattern.

```tsx
<Form schema={schema} onSubmit={onSubmit}>
  {(methods) => (
    <>
      <FormField name="name" label="Name">
        <input className="border p-2" />
      </FormField>
      
      <button 
        type="button" 
        onClick={() => methods.reset()}
        className="text-gray-500"
      >
        Reset
      </button>
      
      <button 
        type="submit" 
        disabled={methods.isPending}
        className="bg-blue-600 text-white p-2"
      >
        {methods.isPending ? "Submitting..." : "Submit"}
      </button>
    </>
  )}
</Form>
```

### 3. Dynamic Fields (Array)

Use `useFormField` (which wraps `useFieldArray`) to handle dynamic lists.

```tsx
import { Form, FormField } from "react-hook-form-easy";

function DynamicList({ useFieldArray }) {
  // This hook must be used inside a component that is a child of <Form>
  // OR use the render prop pattern to access `useFieldArray` directly.
  const { fields, append, remove } = useFormField("items");

  return (
    <div>
      {fields.map((field, index) => (
        <div key={field.id} className="flex gap-2 mb-2">
          <FormField name={`items.${index}.name`}>
            <input placeholder="Item name" className="border p-1" />
          </FormField>
          <button type="button" onClick={() => remove(index)}>Remove</button>
        </div>
      ))}
      <button type="button" onClick={() => append({ name: "" })}>
        Add Item
      </button>
    </div>
  );
}

// Usage
<Form onSubmit={...}>
{
  ({useFieldArray}) =>  <DynamicList useFieldArray={useFieldArray} />
}

// or you can use This

{
  ({useFieldArray}) => {
     const { fields, append, remove } = useFieldArray("address");
     return (
        {fields.map((field, index) => (
            <div key={field.id} className="mb-3 p-3 border rounded-lg border-white/20">
              <FormField name={`address.${index}.street`} label="Street" required>
                <input placeholder="Input here" />
              </FormField>

              <FormField name={`address.${index}.city`} label="City" required>
                <input placeholder="Input here" />
              </FormField>

              <button
                type="button"
                onClick={() => remove(index)}
                className="mt-2 w-full"
              >
                Delete Address
              </button>
            </div>
          ))
          ...etc
        )
      }     
    )
  }
}
</Form>
```

## API Reference

### `<Form />`

The root component that provides context to all fields.

| Prop | Type | Description |
|------|------|-------------|
| `schema` | `SchemaConfig \| any` | Validation schema (Zod, Yup, etc.). Auto-detected. |
| `onSubmit` | `(data: T) => void` | Function called on successful submission. |
| `defaultValues` | `DefaultValues<T>` | Initial values for the form. |
| `children` | `ReactNode \| (methods) => ReactNode` | Form content. Can be a function to access form methods. |
| `className` | `string` | CSS class for the `<form>` element. |
| `config` | `UseFormProps` | Additional configuration for `react-hook-form`. |
| `ref` | `Ref<FormRef>` | Exposes return by useForm as setFocus, setError, etc methods. |

### `<FormField />`

Wrapper for individual inputs. Connects them to the form state.

| Prop | Type | Description |
|------|------|-------------|
| `name` | `string` | **Required**. The path to the field value (e.g., "user.name"). |
| `label` | `string` | Label text displayed above the input. |
| `required` | `boolean` | If true, adds a required rule and displays an asterisk. |
| `children` | `ReactElement` | The input component (must accept `value`, `onChange`, `ref`). |
| `rules` | `object` | Additional validation rules (standard React Hook Form rules). |
| `className` | `string` | CSS class for the wrapper div. |

### `useFormField(name)`

A hook to manage field arrays (dynamic lists).

| Return Value | Description |
|--------------|-------------|
| `fields` | Array of fields to map over. Use `field.id` as key. |
| `append(value)` | Add a new item to the end. |
| `remove(index)` | Remove item at index. |
| `prepend(value)` | Add item to the start. |
| `...` | Other methods: `insert`, `swap`, `move`, `update`. |

## Validation Support

The library uses `form-utils.ts` to automatically detect and use the correct resolver for your schema.

**Supported Libraries:**
- **Zod** (Recommended)
- **Yup**
- **Joi**
- **Superstruct**
- **Vest**

You can also pass an explicit config if auto-detection fails:

```tsx
<Form 
  schema={{ type: 'zod', schema: myZodSchema }} 
  ... 
/>
```

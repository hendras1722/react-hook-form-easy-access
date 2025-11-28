import z from "zod";
import { Form, FormField } from "./playground";
import { useRef } from "react";
import type { FormRef } from "./playground/Form";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(3, { message: "This field must be at least 3 characters long." }),
  address: z
    .array(
      z.object({
        street: z.string().min(3, "Street wajib diisi"),
        city: z.string().min(2, "City wajib diisi"),
      })
    )
    .min(1, "Minimal 1 alamat"),
});

type LoginFormData = z.infer<typeof schema>;

export default function LoginPage() {
  const formRef = useRef<FormRef<LoginFormData>>(null);

  const onSubmit = async (data: LoginFormData) => {
    console.log(data);
  };

  const handleExternalSubmit = async () => {
    // Validasi form
    const isValid = await formRef.current?.validate();
    console.log(formRef.current?.reset)
    if (isValid) {
      // Submit form
      // await formRef.current?.submit();
      if (formRef.current?.reset) {
        alert('ww')
        formRef.current.reset();
      }
    } else {
      console.log('Form tidak valid');
    }
  };

  return (
    <div className="min-h-screen flex items-center w-full justify-center bg-linear-to-br from-slate-900 to-slate-700">
      <div className="w-full max-w-md p-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-semibold text-center text-white mb-6">Login ke Akunmu</h1>

        <button onClick={handleExternalSubmit}>
          Submit dari luar form
        </button>

        <Form
          ref={formRef}
          schema={schema}
          onSubmit={onSubmit}
          defaultValues={{
            email: "",
            password: "",
            address: [{ street: "", city: "" }],
          }}
          config={{
            mode: "onChange",
          }}
        >
          {({ isPending, useFieldArray }) => {
            const { fields, append, remove } = useFieldArray("address");
       
            return (
              <>
                <FormField name="email" label="Email" required className="text-white">
                  <input type="email" placeholder="masukkan email kamu" />
                </FormField>

                <FormField name="password" label="Password" required className="text-white">
                  <input type="password" placeholder="****" />
                </FormField>

                <div className="mb-4">
                  <label className="block text-white font-semibold mb-1">Alamat</label>

                  {fields.map((field, index) => (
                    <div key={field.id} className="mb-3 p-3 border rounded-lg border-white/20">
                      <FormField name={`address.${index}.street`} label="Street" required>
                        <input placeholder="Jl. Mawar No. 1" />
                      </FormField>

                      <FormField name={`address.${index}.city`} label="City" required>
                        <input placeholder="Jakarta" />
                      </FormField>

                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="mt-2 w-full"
                      >
                        Hapus Alamat
                      </button>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() => append({ street: "", city: "" })}
                    className="w-full mb-4 bg-green-600 text-white"
                  >
                    + Tambah Alamat
                  </button>
                </div>

                <button
                  disabled={isPending}
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md"
                >
                  {isPending ? "Loading..." : "Submit"}
                </button>
              </>
            );
          }}
        </Form>

        <p className="mt-6 text-sm text-center text-gray-400">
          Belum punya akun?{" "}
          <a href="/register" className="text-blue-400 hover:text-blue-300">
            Daftar sekarang
          </a>
        </p>
      </div>
    </div>

  );
}

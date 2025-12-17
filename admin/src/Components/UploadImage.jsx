// @ts-check
import { FileInput, Label, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";

/**
 * @param {{
 *   onUploaded: (tempId: string) => void
 *  imagemUrl?: string
 * }} props
 */
export default function UploadImage({ onUploaded, imagemUrl }) {
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // @ts-ignore
    setPreview(imagemUrl || null);
  }, [imagemUrl]);

  /**
   * @param {import("react").ChangeEvent<HTMLInputElement>} e
   */
  const handleChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("http://localhost:3000/admin/uploads", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Falha no upload");
      }

      const data = await res.json();

      setPreview(data.url);
      onUploaded(data.url);
    } catch {
      // @ts-ignore
      setError("Erro ao enviar imagem. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full items-center justify-center">
      <Label
        htmlFor="dropzone-file"
        className="relative flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className="max-h-full max-w-full rounded object-contain"
          />
        ) : (
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> ou arraste
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              PNG, JPG, GIF
            </p>
          </div>
        )}

        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <Spinner size="xl" />
          </div>
        )}

        <FileInput
          id="dropzone-file"
          className="hidden"
          accept="image/*"
          onChange={handleChange}
        />
      </Label>

      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
}

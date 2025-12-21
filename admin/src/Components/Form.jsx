// @ts-check

/**
 * @param {{children: React.ReactNode, onSubmit?: () => void, type: "disabled" | "enabled", linkReturn?: string}} props
 */
export default function Form({ children, onSubmit, type, linkReturn }) {
  return (
    <div className="flex flex-col items-end overflow-x-auto rounded-lg bg-gray-900 p-4">
      <div className="flex min-h-128 w-full flex-col gap-4">{children}</div>
      <div className="flex min-h-11.5 w-full items-center justify-end gap-4 pt-4">
        {type === "enabled" && (
          <>
            {linkReturn && (
              <a
                href={linkReturn}
                className="cursor-pointer rounded-md bg-red-600 px-4 py-2 font-medium text-white hover:bg-red-500"
              >
                Cancelar
              </a>
            )}
            <button
              type="submit"
              className="bg-primary-600 hover:bg-primary-500 cursor-pointer rounded-md px-4 py-2 font-medium text-white"
              onClick={onSubmit ?? (() => {})}
            >
              Salvar
            </button>
          </>
        )}
      </div>
    </div>
  );
}

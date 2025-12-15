// @ts-check

/**
 * @typedef Column
 * @property {string} name
 * @property {string} label
 * @property {string} width
 */

/**
 * @typedef TableListProps
 * @property {Column[]} columns
 * @property {Object[]} items
 * @property {boolean} isLoading
 * @property {string} actionsSize
 */

import {
  Pagination,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { HiEye, HiOutlinePencilAlt, HiTrash } from "react-icons/hi";

/**
 * @param {TableListProps} props
 */
export default function TableList({ columns, items, isLoading, actionsSize }) {
  if (isLoading) {
    return (
      <div className="flex w-full items-center justify-center p-10 text-gray-100">
        <Spinner aria-label="Extra large spinner example" size="xl" />
      </div>
    );
  }
  return (
    <div className="flex flex-col items-end overflow-x-auto rounded-lg bg-gray-900 p-4">
      <div className="min-h-128 w-full">
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableHeadCell key={column.name} className={column.width}>
                  {column.name}
                </TableHeadCell>
              ))}
              <TableHeadCell className={`${actionsSize} text-right`}>
                Ações
              </TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody className="divide-y">
            {items.map((item) => (
              <TableRow
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
                key={item.id}
              >
                {Object.values(columns).map((column) => (
                  <TableCell
                    key={`${item.id}-${column.name}-${item[column.name.toLowerCase()]}`}
                    className={column.width}
                  >
                    {item[column.label.toLowerCase()]}
                  </TableCell>
                ))}
                <TableCell className="flex w-full justify-end gap-4">
                  <a
                    href="produtos/visualizar/1"
                    className="text-primary-600 dark:text-primary-500 font-medium hover:underline"
                  >
                    <HiEye size={20} />
                  </a>
                  <a
                    href="produtos/editar/1"
                    className="text-primary-600 dark:text-primary-500 font-medium hover:underline"
                  >
                    <HiOutlinePencilAlt size={20} />
                  </a>
                  <a
                    href="produtos/deletar/1"
                    className="text-primary-600 dark:text-primary-500 font-medium hover:underline"
                  >
                    <HiTrash size={20} />
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Pagination currentPage={1} totalPages={100} onPageChange={() => {}} />
    </div>
  );
}

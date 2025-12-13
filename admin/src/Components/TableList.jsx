import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";

export default function TableList() {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHead>
          <TableRow>
            <TableHeadCell>Nome do Produto</TableHeadCell>
            <TableHeadCell>Cor</TableHeadCell>
            <TableHeadCell>Categoria</TableHeadCell>
            <TableHeadCell>Preço</TableHeadCell>
            <TableHeadCell>
              <span className="sr-only">Editar</span>
            </TableHeadCell>
            <TableHeadCell>
              <span className="sr-only">Deletar</span>
            </TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody className="divide-y">
          <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <TableCell className="font-medium whitespace-nowrap text-gray-900 dark:text-white">
              Apple MacBook Pro 17"
            </TableCell>
            <TableCell>Sliver</TableCell>
            <TableCell>Laptop</TableCell>
            <TableCell>$2999</TableCell>
            <TableCell>
              <a
                href="#"
                className="text-primary-600 dark:text-primary-500 font-medium hover:underline"
              >
                Editar
              </a>
            </TableCell>
            <TableCell>
              <a
                href="#"
                className="text-primary-600 dark:text-primary-500 font-medium hover:underline"
              >
                Deletar
              </a>
            </TableCell>
          </TableRow>
          <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <TableCell className="font-medium whitespace-nowrap text-gray-900 dark:text-white">
              Microsoft Surface Pro
            </TableCell>
            <TableCell>White</TableCell>
            <TableCell>Laptop PC</TableCell>
            <TableCell>$1999</TableCell>
            <TableCell>
              <a
                href="#"
                className="text-primary-600 dark:text-primary-500 font-medium hover:underline"
              >
                Editar
              </a>
            </TableCell>
            <TableCell>
              <a
                href="#"
                className="text-primary-600 dark:text-primary-500 font-medium hover:underline"
              >
                Deletar
              </a>
            </TableCell>
          </TableRow>
          <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <TableCell className="font-medium whitespace-nowrap text-gray-900 dark:text-white">
              Magic Mouse 2
            </TableCell>
            <TableCell>Black</TableCell>
            <TableCell>Accessories</TableCell>
            <TableCell>$99</TableCell>
            <TableCell>
              <a
                href="#"
                className="text-primary-600 dark:text-primary-500 font-medium hover:underline"
              >
                Editar
              </a>
            </TableCell>
            <TableCell>
              <a
                href="#"
                className="text-primary-600 dark:text-primary-500 font-medium hover:underline"
              >
                Deletar
              </a>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

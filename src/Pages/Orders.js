import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/react";
import { useSelector } from "react-redux";
const Orders = () => {
  const selector = useSelector((state) => state.order);
  const rows = selector[0]?.map((item, index) => ({ ...item, sno: index }))||[];

  const columns = [
    {
      key: "sno",
      label: "S.No",
    },
    {
      key: "product",
      label: "Products",
    },
    {
      key: "fulladdress",
      label: "Address",
    },
    {
      key: "phonenumber",
      label: "Phone Number",
    },
    {
      key: "amount",
      label: "Amount",
    },
  ];

  return (
    <div>
      <Table aria-label="Example table with dynamic content">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={rows}>
          {(item) => (
            <TableRow key={item.name}>
              {(columnKey) => (
                <TableCell key={columnKey}>
                  {columnKey === "product"
                    ? (item?.product?.map((product)=>(product.productname +",")))
                    : getKeyValue(item, columnKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default Orders;

// // import React from "react";
// import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue} from "@nextui-org/react";

// const rows = [
//   {
//     key: "1",
//     name: "Tony Reichert",
//     role: "CEO",
//     status: "Active",
//   },
//   {
//     key: "2",
//     name: "Zoey Lang",
//     role: "Technical Lead",
//     status: "Paused",
//   },
//   {
//     key: "3",
//     name: "Jane Fisher",
//     role: "Senior Developer",
//     status: "Active",
//   },
//   {
//     key: "4",
//     name: "William Howard",
//     role: "Community Manager",
//     status: "Vacation",
//   },
// ];

// const columns = [
//   {
//     key: "name",
//     label: "NAME",
//   },
//   {
//     key: "role",
//     label: "ROLE",
//   },
//   {
//     key: "status",
//     label: "STATUS",
//   },
// ];

// export default function App() {
//   return (
//     <Table aria-label="Example table with dynamic content">
//       <TableHeader columns={columns}>
//         {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
//       </TableHeader>
//       <TableBody items={rows}>
//         {(item) => (
//           <TableRow key={item.key}>
//             {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
//           </TableRow>
//         )}
//       </TableBody>
//     </Table>
//   );
// }

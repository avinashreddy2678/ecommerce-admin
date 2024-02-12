import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  getKeyValue,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import ModelBox from "../ui/Model.js";
import { VerticalDotsIcon } from "../ui/VerticalDotsIcon";
import axios from "axios";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";
import useAllProducts from "../hooks/use-Allproducts.js";
function ProductTable({ data }) {
  const [dataset, setDataset] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const [cookie, _] = useCookies(["access_token"]);
  const userId = localStorage.getItem("userId");
  const {mutateData} = useAllProducts(cookie,userId)
  useEffect(() => {
    // if (data && data.length > 0) {
    //   const modifiedData = data.map((item, index) => ({
    //     ...item,
    //     key: index + 1,
    //   }));

      setDataset(data);
    
  }, [data]);
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 6;

  const pages = Math.ceil(data.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return dataset.slice(start, end);
  }, [page, dataset]);

  // handle edit data-->data is passed to Modelbox as props
  const handleEdit = (item) => {
    setSelectedItem(item);
    setOpen(true);
  
  };
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:4001/Product/DeleteProduct/${id}`,
        {
          data: { userId }, // Use 'data' property for data in DELETE requests
          headers: { authorization: cookie.access_token },
        }
      );
      if (res.status === 200) {
        mutateData();
        toast.success("Deleted Product Success");
      }
    } catch (error) {
      console.error("Error deleting product:", error.message);
      
    }
  };

  return (
    <div className="lg:w-[70%] m-auto">
      <Table
        aria-label="Example table with client-side pagination"
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="secondary"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        }
        classNames={{
          wrapper: "min-h-[222px]",
        }}
      >
        <TableHeader>
          <TableColumn key="name">NAME</TableColumn>
          <TableColumn key="Type">Type</TableColumn>
          <TableColumn key="color">Color</TableColumn>
          <TableColumn key="price">Price</TableColumn>
          <TableColumn key="actions" className="center">
            ACTIONS
          </TableColumn>
        </TableHeader>
        <TableBody items={items}>
          {(item) => (
            <TableRow key={item.name}>
              {(columnKey) => (
                <TableCell>
                  {columnKey !== "actions" ? (
                    getKeyValue(item, columnKey)
                  ) : (
                    <>
                      <Dropdown>
                        <DropdownTrigger>
                          <Button isIconOnly size="sm" variant="light">
                            <VerticalDotsIcon className="text-default-300" />
                          </Button>
                        </DropdownTrigger>
                        <DropdownMenu>
                          <DropdownItem>
                            <p onClick={() => handleEdit(item)}>Edit</p>
                          </DropdownItem>
                          <DropdownItem
                            onClick={() => {
                              handleDelete(item._id);
                            }}
                          >
                            Delete
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </>
                  )}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      {open && selectedItem && (
        <ModelBox open={open} setOpen={setOpen} productItem={selectedItem} />
      )}
    </div>
  );
}

export default ProductTable;

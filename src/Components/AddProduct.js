import { Button } from "@nextui-org/button";
import React, { useState } from "react";
import { PlusIcon } from "../ui/PlusIcon.js";
import ModelBox from "../ui/Model.js";
const AddProduct = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button
        className="bg-foreground text-background"
        endContent={<PlusIcon />}
        size="sm"
        onClick={() => {
          setOpen(true);
        }}
      >
        Add New
      </Button>
      <ModelBox open={open} setOpen={setOpen} />
    </div>
  );
};

export default AddProduct;

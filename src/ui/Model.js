import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
import ImageUpload from "../utils/UploadImage";
import axios from "axios";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";
import useAllProducts from "../hooks/use-Allproducts";

export default function ModelBox({ open, setOpen, productItem }) {
  // to set the dialog box
  const [isOpen, setIsopen] = useState(open || false);
  // Product Name
  const [ProductName, setProductName] = useState(productItem?.name || "");
  // type
  const [Type, setType] = useState(productItem?.Type || "");
  // Color
  const [color, setColor] = useState(productItem?.color || "");
  // Price
  const [price, setPrice] = useState(productItem?.price || "");
  // array of image url after uploading to cloundary we get url in return
  const [imageurl, setimageurl] = useState(productItem?.productImage || []);
  // single image for uploading to cloundanry
  const [image, setImage] = useState();
  // each size and quantity
  const [size, setSize] = useState({
    size: "",
    quantity: "",
  });
  // array of size and quantity
  const [AllSizeandQuantity, setAllSizeandQuantity] = useState(
    productItem?.size ? [...productItem?.size] : []
  );

  const [addsizebtn, setaddsizebtn] = useState(false);

  const userId = localStorage.getItem("userId");
  const [cookie, _] = useCookies("access_token");
  const {mutateData} = useAllProducts(cookie,userId)
  // for setting the dialog box open or close on true or false
  useEffect(() => {
    setIsopen(open);
  }, [open]);

  const handleImageUpload = async () => {
    const res = await ImageUpload(image);
    setimageurl((prev) => [...prev, res]);
    setImage();
  };

  const hanldeSizeandQChange = (e) => {
    setSize({ ...size, [e.target.name]: e.target.value });
  };

  const addsizetoArray = () => {
    setAllSizeandQuantity((prev) => [...prev, size]);
    setaddsizebtn(false);
    setSize({ size: "", quantity: "" });
  };


  const handlesizeChange=(index,property,value)=>{
    setAllSizeandQuantity(prevSizes => {
      const updatedSizes = [...prevSizes];
      updatedSizes[index][property] = value;
      return updatedSizes;
  }
    )}
  const handlesubmit = async (e) => {
    e.preventDefault();
    // userId, name, Type, color, quantity, price, productImage, size
    const res = await axios.post(
      "http://localhost:4001/Product/AddProduct",
      {
        imageurl,
        AllSizeandQuantity,
        ProductName,
        Type,
        color,
        price,
        userId,
      },
      {
        headers: { authorization: cookie.access_token },
      }
    );
    if (res.status === 200) {
      mutateData();
      toast.success("product added successfully");
      setAllSizeandQuantity([]);
      setProductName("");
      setColor("");
      setImage("");
      setPrice("");
      setType("");
      setimageurl([]);
    }
  };

  const handleUpdate = async (id) => {
    const res = await axios.patch(
      `http://localhost:4001/Product/UpdateProduct/${id}`,
      { imageurl, AllSizeandQuantity, ProductName, Type, color, price, userId },
      {
        headers: { authorization: cookie.access_token },
      }
    );
    if (res.status === 200) {
      mutateData();
      toast.success("Updated Product Success");
    }
    setOpen(false);
  };
  return (
    <>
      <Modal isOpen={isOpen}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add to Product
              </ModalHeader>
              <form onSubmit={(e) => handlesubmit(e)}>
                <ModalBody>
                  <div>
                    <Input
                      value={ProductName}
                      onChange={(e) => {
                        setProductName(e.target.value);
                      }}
                      placeholder="Product Name"
                    />
                    <div className="flex">
                      <Input
                        value={Type}
                        onChange={(e) => {
                          setType(e.target.value);
                        }}
                        className="mt-4 w-[50%] mr-3"
                        placeholder="Type"
                      />
                      <Input
                        value={color}
                        onChange={(e) => {
                          setColor(e.target.value);
                        }}
                        className="mt-4 w-[50%] mr-3"
                        placeholder="Color like #fff"
                      />
                      <Input
                        value={price}
                        onChange={(e) => {
                          setPrice(e.target.value);
                        }}
                        className="mt-4 w-[50%]"
                        placeholder="Price in INR"
                      />
                    </div>
                    <div className="mt-4">
                      {/* show add btn when click on the add to btn it goes and input box will be shown with a update btn on clicking the update btn it is added to array */}
                      {/* showing here the aarray of obects here */}
                      {AllSizeandQuantity.map((item, index) => (
                        <div key={index} className="flex my-2">
                          <Input className="mx-2" value={item.size} onChange={(e)=>{handlesizeChange(index,"size",e.target.value)}} />
                          <Input value={item.quantity} onChange={(e)=>{handlesizeChange(index,"quantity",e.target.value)}} />
                        </div>
                      ))}
                      <div className="flex mt-4">
                        {addsizebtn ? (
                          <>
                            <Input
                              name="size"
                              onChange={(e) => {
                                hanldeSizeandQChange(e);
                              }}
                              className="mr-3 w-30"
                              placeholder="size"
                            />
                            <Input
                              name="quantity"
                              onChange={(e) => {
                                hanldeSizeandQChange(e);
                              }}
                              placeholder="quantity"
                              className="w-30 mr-4"
                            />
                            <button
                              onClick={() => {
                                addsizetoArray();
                              }}
                              className="btn btn-secondary m-auto mr-3"
                            >
                              Update
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => {
                              setaddsizebtn(true);
                            }}
                            className="btn btn-primary ml-2"
                          >
                            Add size & Quantity
                          </button>
                        )}
                      </div>

                    </div>
                    <input
                    className="my-3 ml-2"
                      onChange={(e) => {
                        setImage(e.target.files[0]);
                      }}
                      type="file"
                    ></input>
                    <div className="flex ml-2">
                      <Button onClick={() => handleImageUpload()}>
                        Upload Images
                      </Button>
                      {imageurl.length > 0 &&
                        imageurl.map((eachImage, index) => (
                          <img
                            key={index}
                            className="rounded-pill ml-2"
                            src={eachImage}
                            height={40}
                            width={43}
                            alt="pic"
                          />
                        ))}
                    </div>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button
                    onClick={() => setOpen(false)}
                    color="danger"
                    variant="light"
                    onPress={onClose}
                  >
                    Close
                  </Button>
                  {productItem ? (
                    <Button
                      type="button"
                      color="primary"
                      className="ml-3"
                      onClick={() => {
                        handleUpdate(productItem._id);
                      }}
                      onPress={onClose}
                    >
                      Update
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      color="primary"
                      onClick={() => {
                        setOpen(false);
                      }}
                      onPress={onClose}
                    >
                      Submit
                    </Button>
                  )}
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

import React, { useState } from "react";
import { Input, ModalHeader, user } from "@nextui-org/react";
import { useCookies } from "react-cookie";
import ImageUpload from "../utils/UploadImage";
import axios from "axios";
import { toast } from "react-hot-toast";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import useGetBillBoard from "../hooks/use-GetBillBoard";

export default function BillboardModel({
  isCreatedOpen,
  setisCreatedOpen,
  data,
  isUpdateOpen,
  setSelectedBillboard,
  setisUpdateOpen,
}) {
  // console.log(data._id);
  const [loading, setloading] = useState(false);
  const [BillboardTag, setBillboardTag] = useState("" || data?.BillboardTag);
  const [image, setImage] = useState("");
  const [BillboardImage, setBillboardImage] = useState(
    "" || data?.BillboardImage
  );

  const userId = localStorage.getItem("userId");
  const [cookie, _] = useCookies(["access_token"]);
  // for images
  const hanldeUploadClick = async () => {
    setloading(true)
    const response = await ImageUpload(image);
    setBillboardImage(response);
    setloading(false)
    setImage(""); // Clear the image input after upload
  };
  // rerendering the image and data
  const { mutateData } = useGetBillBoard(userId, cookie);

  const handleUpdate = async (id) => {
    try {
      const res = await axios.patch(
        `http://localhost:4001/Billboard/Update/${id}`,
        {
          userId,
          BillboardImage,
          BillboardTag,
        },
        {
          headers: {
            authorization: cookie.access_token,
          },
        }
      );

      if (res.status === 200) {
        mutateData();
        setisUpdateOpen(false);
        setSelectedBillboard(null);
        toast.success(res.data.message);
      }
      hanldeCancel();
    } catch (error) {
      console.error("Error creating Billboard:", error.message);
      toast.error("Error creating Billboard");
    }
  };

  const hanldeSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:4001/Billboard/Create",
        {
          userId,
          BillboardImage,
          BillboardTag,
        },
        {
          headers: {
            authorization: cookie.access_token,
          },
        }
      );

      if (res.status === 200) {
        setSelectedBillboard(null);
        setisCreatedOpen(false);
        mutateData();
        toast.success(res.data.message);
      }
      hanldeCancel();
    } catch (error) {
      console.error("Error creating Billboard:", error.message);
      toast.error("Error creating Billboard");
    }
  };

  const hanldeCancel = () => {
    setSelectedBillboard(null);
    setisUpdateOpen(false);
    setisCreatedOpen(false);
    setImage("");
    setBillboardTag("");
    setBillboardImage("");
  };

  return (
    <>
      <Modal isOpen={isCreatedOpen || isUpdateOpen}>
        <ModalContent>
          {(onClose) => (
            <>
              <form onSubmit={(e) => hanldeSubmit(e)}>
                <ModalHeader className="mt-3">
                  {data ? <h5>Editing Billboard</h5> : <h1>Create here</h1>}
                </ModalHeader>
                <ModalBody>
                  <div>
                    <Input
                      value={BillboardTag}
                      onChange={(e) => setBillboardTag(e.target.value)}
                      placeholder="Enter here"
                    />
                    <input
                      className="mt-4"
                      onChange={(e) => setImage(e.target.files[0])}
                      type="file"
                      placeholder="image"
                    />
                    <button
                      type="button"
                      className="btn btn-outline  text-center mt-4 align-middle"
                      variant="bordered"
                      onClick={hanldeUploadClick}
                    >
                      Upload Image
                    </button>
                    {BillboardImage && (
                      <img
                        src={BillboardImage}
                        width={"240px"}
                        height={"240px"}
                        className="mt-4"
                        alt="No pic"
                      />
                    )}
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onClick={hanldeCancel}>
                    Cancel
                  </Button>
                  {data ? (
                    <Button
                      color="primary"
                      onClick={() => {
                        handleUpdate(data?._id);
                      }}
                    >
                      Update
                    </Button>
                  ) : (
                    <>
                      <Button disabled={loading} color="primary" type="submit">
                        Submit
                      </Button>
                    </>
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

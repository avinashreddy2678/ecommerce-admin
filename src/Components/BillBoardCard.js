import { Card, CardFooter, CardHeader } from "@nextui-org/react";
import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import useGetBillBoard from "../hooks/use-GetBillBoard.js";
import axios from "axios";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";
const BillBoardCard = ({ data }) => {
  const [cookie] = useCookies(["access_token"]);
  const userId = localStorage.getItem("userId");
  const { mutateData } = useGetBillBoard(userId, cookie);
  const handleClickCard = async (id) => {
    const res = await axios.patch(
      `http://localhost:4001/Billboard/ChangeActivation/${id}`,
      { userId },
      {
        headers: {
          authorization: cookie.access_token,
        },
      }
    );
    if (res.status === 200) {
      mutateData();
      toast.success(res.data.message);
    }
  };
  const hanldeBillboarddelete = async (id) => {
    const res = await axios.delete(
      `http://localhost:4001/Billboard/deleteBillboard/${id}`,
      {
        data: { userId },
        headers: { authorization: cookie.access_token },
      }
    );
    if (res.status === 200) {
      toast.success(res.data.message);
      mutateData();
    }
  };
  return (
    <div className="w-[230px] mx-4">
      <div className="flex my-4 justify-between items-center w-full">
        {/* <h6>Edit BillBoard</h6> */}
        <Trash2
          onClick={() => {
            hanldeBillboarddelete(data?._id);
          }}
          className="text-red-100 cursor-pointer m-1 p-1 rounded-md bg-red-500"
        />
      </div>
      <div
        onClick={() => {
          handleClickCard(data?._id);
        }}
      >
        <Card className="col-span-12 sm:col-span-4 h-[300px]">
          <CardHeader className="absolute z-10 top-1 flex-col !items-start">
            <h1 className=" text-black w-full h-full flex  justify-center font-medium text-3xl">
              {data?.BillboardTag}
            </h1>
          </CardHeader>
          <img
            removeWrapper
            alt="Card background"
            className="z-0  h-full opacity-80 object-cover"
            src={data?.BillboardImage}
          />
          <CardFooter>{data?.isActivated ? " active " : " "}</CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default BillBoardCard;

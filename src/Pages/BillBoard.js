import { useState } from "react";
import BillBoardCard from "../Components/BillBoardCard";
import { Divider } from "@nextui-org/react";
import { useCookies } from "react-cookie";
import BillboardModel from "../ui/BillBoardModal.js";
import { Edit } from "lucide-react";
import useGetBillBoard from "../hooks/use-GetBillBoard.js";

const Billboard = () => {
  const [isCreatedOpen, setisCreatedOpen] = useState(false);
  const [isUpdateOpen, setisUpdateOpen] = useState(false);
  const [selectedBillboard, setSelectedBillboard] = useState(null);
  const userId = localStorage.getItem("userId");
  const [cookie, _] = useCookies(["access_token"]);
  const { response } = useGetBillBoard(userId, cookie);

  const handleUpdate = (billboard) => {
    setisUpdateOpen(true);
    setSelectedBillboard(billboard);
  };
  const handleCreate = () => {
    setisCreatedOpen(true);
  };

  return (
    <>
      <div className="mx-3">
        <div className="flex justify-between">
        <h3 className="mx-4">Bill Board</h3>
        <button
          className="btn btn-primary variant-primary ml-5"
          onClick={() => {
            handleCreate();
          }}
        >
          Create Billboard
        </button>
        </div>
        <Divider className="px-4" />
        <div className="grid lg:grid-cols-4 md:grid-cols-2  gap-2 w-[80%] m-auto ">
          {response?.length > 0 ? (
            response.map((item) => (
              <div>
                <BillBoardCard key={item.id} data={item} />
                <button
                  className="btn bg-black mt-3 mx-5 text-white"
                  onClick={() => {
                    handleUpdate(item);
                  }}
                >
                  <span className="flex  items-center">
                    Edit here
                    <Edit className="ml-3" />
                  </span>
                </button>
              </div>
            ))
          ) : (
            <h4 className="ml-4">No BillBoards</h4>
          )}
        </div>
        <Divider />

        
        {(isCreatedOpen || isUpdateOpen) && (
          <BillboardModel
            isCreatedOpen={isCreatedOpen}
            setisCreatedOpen={setisCreatedOpen}
            data={selectedBillboard}
            setSelectedBillboard={setSelectedBillboard}
            isUpdateOpen={isUpdateOpen}
            setisUpdateOpen={setisUpdateOpen}
          />
        )}
      </div>
    </>
  );
};

export default Billboard;

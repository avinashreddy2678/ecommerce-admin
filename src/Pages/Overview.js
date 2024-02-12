import React, { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux"
import { useCookies } from "react-cookie";

import { CreditCard, DollarSign } from "lucide-react";
import { Card, CardHeader, CardBody } from "@nextui-org/react";


import { Overview } from "../ui/DashBoardGrap";
import getAllOrders from "../hooks/use-GetAllOrders.js";
import { addAll } from "../Store/OrderSlice.js";



const DashBoardOverview = () => {

  const dispatch=useDispatch();
 

  const [cookie, _] = useCookies(["access_token"]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const ordersData = await getAllOrders(cookie);
        dispatch(addAll(ordersData.data))

      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    if (cookie && cookie.access_token) {
      fetchData();
    }
  }, []);
  const selector=useSelector(state=>state.order);
  // console.log(selector);
  const totalRevenue = selector[0]?.reduce((total, order) => total + Number(order.amount),0);
  const totalSales = selector[0]?.reduce((total, order) => {
    if (order && order.product) {
        return total + (order.product.length || 0);
    }
    return total;
}, 0);

// for graph data selecting each month 
const graphData = [
  { name: "Jan", total: 0 },
  { name: "Feb", total: 0 },
  { name: "Mar", total: 0 },
  { name: "Apr", total: 0 },
  { name: "May", total: 0 },
  { name: "Jun", total: 0 },
  { name: "Jul", total: 0 },
  { name: "Aug", total: 0 },
  { name: "Sep", total: 0 },
  { name: "Oct", total: 0 },
  { name: "Nov", total: 0 },
  { name: "Dec", total: 0 },
];

if(selector.length>0){
  for(const month of selector[0]){
    const EachMonth=new Date(month.createdAt).getMonth(month);
     graphData[EachMonth].total+=Number(month.amount)
  }
}
  
  return (
    <div>
      <div className="grid gap-4 grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h1 className="text-sm font-medium">Total Revenue</h1>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardBody>
            <div className="text-2xl font-bold">{totalRevenue}</div>
          </CardBody>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h1 className="text-sm font-medium">Sales Count</h1>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardBody>
            <div className="text-2xl font-bold">{totalSales}</div>
          </CardBody>
        </Card>
       
      </div>
      <Card className="mt-4">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <h1 className="text-sm font-medium">Overivew</h1>
        </CardHeader>
        <CardBody>
          <Overview data={graphData} />
        </CardBody>
      </Card>
    </div>
  );
};

export default DashBoardOverview;

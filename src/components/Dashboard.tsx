import { useEffect, useState } from "react";
import { db } from "../../firebase";  // Import Firestore functions
import { collection, getDocs } from "firebase/firestore";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";  // Shadcn Card components
import { Button } from "./ui/button";  // Assuming Button component is present
import { Label } from "./ui/label";  // Assuming Label component is present

export default function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "orders"));
        const ordersList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("Fetched Orders:", ordersList);  // Debugging line
        setOrders(ordersList);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Group orders by table number
  const groupedOrders = orders.reduce((acc, order) => {
    const tableNumber = order.tableNumber;
    if (!acc[tableNumber]) {
      acc[tableNumber] = [];
    }
    acc[tableNumber].push(order);
    return acc;
  }, {});

  // Debugging the grouped orders
  console.log("Grouped Orders:", groupedOrders);  // Debugging line

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      {loading ? (
        <p>Loading orders...</p>
      ) : (
        Object.keys(groupedOrders).map((tableNumber) => (
          <div key={tableNumber}>
            <h2 className="text-2xl font-semibold mb-4">Table No. {tableNumber}</h2>
            <div className="space-y-4">
              {groupedOrders[tableNumber].map((order) => (
                <Card key={order.id} className="w-full max-w-md p-4 shadow-md">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold space-x-2"><span>Order ID: </span><span>{order.id}</span></CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Label className="block mb-2 font-bold">Items</Label>
                    <ul className="space-y-2">
                      {order.items.map((item, index) => (
                        <li key={index} className="flex justify-between">
                          <span>{item.name}</span>
                          <span>{item.price}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="text-center flex items-center space-x-2">
                    <span className="block ">Order Date:-</span>
                    <span>{new Date(order.date.seconds * 1000).toLocaleString()}</span>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

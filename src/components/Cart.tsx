import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "./ui/button";
import { ChevronUp } from "lucide-react";
import { Input } from "./ui/input";
import { useState } from "react";
import { Label } from "./ui/label";
import { db } from "../../firebase";  // Import Firestore functions
import { collection, addDoc } from "firebase/firestore";

export default function Cart({ data, update }) {
  const [table, setTable] = useState("");
  const [loading, setLoading] = useState(false);  // Added loading state

  // Function to handle creating an order in Firestore
  const handleOrder = async () => {
    if (!table) {
      alert("Please provide a table number.");
      return;
    }

    // Set loading state to true when starting the order process
    setLoading(true);

    // Prepare the order data
    const orderItems = data.map((item) => ({
      name: item.name,
      price: item.price,
    }));

    // Create an order object to send to Firestore
    const order = {
      tableNumber: table,
      items: orderItems,
      date: new Date(),
    };

    try {
      // Add the order document to Firestore
      const orderRef = await addDoc(collection(db, "orders"), order);

      // Successfully created the order
      console.log("Order created with ID: ", orderRef.id);

      alert("Order placed successfully!");

      // Clear the cart after successful order
      setTable("")
      update([]);
    } catch (error) {
      console.error("Error placing order:", error);
      alert("An error occurred. Please try again.");
    } finally {
      // Set loading state to false after the order is processed
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-2 right-2 z-50">
      <Drawer>
        <DrawerTrigger>
          <Button className="p-5 bg-black text-white hover:bg-gray-400 font-semibold">
            Cart : {data.length} <span><ChevronUp size={40} /></span>
          </Button>
        </DrawerTrigger>
        <DrawerContent className="max-w-fit p-10 px-20 mx-auto flex flex-col items-center">
          <DrawerHeader className="text-center">
            <DrawerTitle className="text-3xl font-bold text-center">You Selected Items</DrawerTitle>
            <DrawerDescription className="mt-4 ">
              <Label htmlFor="table" className="text-left">
                Table No.
              </Label>
              <Input
                id="table"
                placeholder="e.g., 12"
                className="col-span-3 mt-2"
                required
                value={table}
                onChange={(e) => setTable(e.target.value)}
              />
            </DrawerDescription>
          </DrawerHeader>

          {/* Render the selected items in the drawer */}
          <div className="mt-6 w-full space-y-2">
            {data.map((item, index) => (
              <div key={index} className="flex justify-between">
                <span>{item.name}</span>
                <span>{item.price}</span>
              </div>
            ))}
          </div>

          <DrawerFooter className="mt-6 flex justify-center gap-4 w-full">
            <Button
              onClick={handleOrder}
              className="w-full h-12 text-xl font-bold text-center"
              disabled={loading} // Disable button while loading
            >
              {loading ? "Placing Order..." : "Order Now"} {/* Change text when loading */}
            </Button>
            <DrawerClose className="w-full">
              <Button
                variant="outline"
                className="w-full h-12 text-xl font-bold text-center"
                onClick={() => update([])}
              >
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

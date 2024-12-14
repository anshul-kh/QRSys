import { useEffect, useState } from "react";
import { DialogBox } from "./components/Dialog";
import Header from "./components/Header";
import QR from "./components/QR";
import { AppSidebar } from "./components/Sidebar";
import { SidebarProvider } from "./components/ui/sidebar";
import { CardWithForm } from "./components/AdminOrderCard";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { HomeCard } from "./components/HomeCard";
import Cart from "./components/Cart";

type dataProps = {
  docId: string;
  name: string;
  description: string;
  price: string;
};

export default function App() {
  const [data, setData] = useState<dataProps[]>([]);
  const [order, setOrder] = useState([]);

  // Fetch Data if authenticated
  useEffect(() => {
      const fetchData = async () => {
        try {
          const itemsCollectionRef = collection(db, "menu", "menu-items", "items");
          const querySnapshot = await getDocs(itemsCollectionRef);

          const itemsData = querySnapshot.docs.map((doc) => ({
            docId: doc.id, // Add Firestore document ID
            name: doc.data().name || "Unnamed Item",
            description: doc.data().description || "No description",
            price: doc.data().price || "0",
          }));

          setData(itemsData);
        } catch (error) {
          console.error("Error fetching Firestore data:", error);
        }
      };

      fetchData();
    }, []); // Only fetch data if user is available



  return (
    <div className="min-w-screen min-h-screen flex items-center flex-col bg-gray-100 scrollbar-hidden">
      <Header />
      <Cart data={ order} update={setOrder}/>

          <div className="flex flex-row gap-2">

            <div className="flex flex-col justify-start items-start md:w-[70vw] px-10 mt-5 gap-3">
                  <h1 className="font-semibold mb-4 text-2xl">CURRENT MENU</h1>
                  {!data.length && (
                    <p className="text-gray-500 px-2">No Available Data. (Add New Item)</p>
                  )}
                  <div className="flex flex-wrap gap-4 justify-start w-full">
                    {data.map((item, index) => (
                      <HomeCard
                        key={`${item.docId}`} // Use unique docId as key
                        id={index + 1}
                        title={item.name}
                        description={item.description}
                        price={item.price}
                        update={setOrder}
                      />
                    ))}
                  </div>
            </div>
          </div>
    </div>
  );
}

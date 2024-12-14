import { useEffect, useState } from "react";
import { DialogBox } from "./components/Dialog";
import Header from "./components/Header";
import QR from "./components/QR";
import { AppSidebar } from "./components/Sidebar";
import { SidebarProvider } from "./components/ui/sidebar";
import { CardWithForm } from "./components/AdminOrderCard";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useUser } from "@clerk/clerk-react"; // Clerk hook to get current user
import Dashboard from "./components/Dashboard";

type dataProps = {
  docId: string;
  name: string;
  description: string;
  price: string;
};

export default function AdminPage() {
  const { user, isLoaded } = useUser(); // Clerk's useUser hook to get user info and loading state
  const [data, setData] = useState<dataProps[]>([]);
  const [tab, setTab] = useState<0 | 1>(0);


  // Fetch Data if authenticated
  useEffect(() => {
    if (user) {
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
    }
  }, [user]); // Only fetch data if user is available

  // If Clerk is still loading the user information, show a loading state
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-w-screen min-h-screen flex items-center flex-col bg-gray-100 scrollbar-hidden">
      <Header />

      {!user ? (
        <div className="flex flex-col justify-center items-center mt-20">
          <h2 className="text-2xl mb-4">Please Sign in to access the admin page.</h2>
          
        </div>
      ) : (
        <>
          <QR />
          <div className="flex flex-row gap-2">
            <div>
              <SidebarProvider>
                <AppSidebar active={setTab} />
              </SidebarProvider>
            </div>

            <div className="flex flex-col justify-start items-start md:w-[70vw] px-10 mt-5 gap-3">
              {!tab && (
                <>
                  <DialogBox updateData={setData} />
                  <h1 className="font-semibold mb-4 text-2xl">CURRENT MENU</h1>
                  {!data.length && (
                    <p className="text-gray-500 px-2">No Available Data. (Add New Item)</p>
                  )}
                  <div className="flex flex-wrap gap-4 justify-start w-full">
                    {data.map((item, index) => (
                      <CardWithForm
                        key={`${item.docId}`} // Use unique docId as key
                        id={index + 1}
                        docId={item.docId} // Pass Firestore document ID
                        title={item.name}
                        description={item.description}
                        price={item.price}
                        update={setData}
                      />
                    ))}
                    
                   
                  </div>
                  
                  
                </>
              )}
              
              {
                tab === 1 && <Dashboard/>
              }
            </div>
          </div>
        </>
      )}
    </div>
  );
}

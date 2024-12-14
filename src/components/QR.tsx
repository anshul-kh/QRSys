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
import QrCodeCustom from "./QRCode";
import { useRef } from "react";

export default function QR() {
  
  const qrRef = useRef(null);
 
   const handleDownload = () => {
     const canvas = qrRef.current.querySelector("canvas");
 
     if (canvas) {
       const dataURL = canvas.toDataURL("image/png");
       const link = document.createElement("a");
       link.href = dataURL;
       link.download = "qrcode.png"; 
       link.click();
     } else {
       alert("Error Downloading QR");
     }
   };
  
  return (
    <div className="fixed bottom-2 right-2 z-50">
      <Drawer>
        <DrawerTrigger>
          <Button className="p-5 bg-black text-white hover:bg-gray-400 font-semibold">
            Your QR <span><ChevronUp size={40} /></span>
          </Button>
        </DrawerTrigger>
        <DrawerContent className="max-w-fit p-10 px-20 mx-auto flex flex-col items-center">
          <DrawerHeader className="text-center">
            <DrawerTitle className="text-3xl font-bold text-center ">Share This QR</DrawerTitle>
            <DrawerDescription className="mt-4 ">
              <div ref={qrRef}>
              <QrCodeCustom />
              </div>
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter className="mt-6 flex justify-center gap-4 w-full">
            <Button onClick={handleDownload} className="w-full h-12 text-xl font-bold text-center">Download Now</Button>
            <DrawerClose className="w-full">
              <Button variant="outline" className="w-full h-12 text-xl font-bold text-center">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Delete } from "lucide-react";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase"; // Adjust the path to your Firebase config

export function CardWithForm({
  id,
  docId, // Pass Firestore document ID
  title,
  description,
  price,
  update,
}: {
  id: number;
  docId: string; // Firestore document ID
  title: string;
  description: string;
  price: string;
  update: React.Dispatch<React.SetStateAction<any[]>>; // Update function passed from parent
}) {
  const [isDeleting, setIsDeleting] = React.useState(false);

  // Delete Functionality (Backend + Local)
  const handleDelete = async () => {
    setIsDeleting(true); // Start the loading state
    try {
      const docRef = doc(db, "menu", "menu-items", "items", docId);
      await deleteDoc(docRef); // Delete from Firestore

      // Update the local state to reflect the change
      update((prevData) => prevData.filter((_, index) => index + 1 !== id));
      console.log(`Successfully deleted item with ID: ${docId}`);
    } catch (error) {
      console.error("Error deleting document: ", error);
    } finally {
      setIsDeleting(false); // End the loading state
    }
  };

  return (
    <Card className="w-[350px] px-1">
      <CardHeader className="flex justify-between flex-row items-center">
        <CardTitle className="text-xl">{`${id}. ${title}`}</CardTitle>
        <div className="space-x-2">
          <Button
            className="w-7 h-7"
            onClick={handleDelete}
            disabled={isDeleting}
            variant="destructive"
          >
            {isDeleting ? "..." : <Delete />}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label
                htmlFor="description"
                className="text-sm font-semibold text-gray-500"
              >
                Description
              </Label>
              <Textarea
                className="text-wrap w-full flex flex-wrap"
                disabled
                value={`${description.substring(0, 200)}...`}
              ></Textarea>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" disabled>
          Price: {Number(price)}
        </Button>
      </CardFooter>
    </Card>
  );
}

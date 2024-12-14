import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { useState } from "react";

export function HomeCard({
  id,
  title,
  description,
  price,
  update
}: {
  id: number;
  title: string;
  description: string;
  price: string;
  update: any;
}) {
  const [adding, setAdding] = useState(false);

  const handleAddItem = () => {
    setAdding(true); // Indicate the item is being added

    // Create an object with the name and price to add to the state
    const newItem = { name: title, price: price };

    // Update the parent state using the provided update function
    update((prevData: any) => [...prevData, newItem]);

    // Simulate the adding process (reset the button state after a short delay)
    setTimeout(() => {
      setAdding(false);
    }, 1000); // Set the delay for the "adding" state to reset (1 second)
  };

  return (
    <Card className="w-[350px] px-1">
      <CardHeader className="flex justify-between flex-row items-center">
        <CardTitle className="text-xl">{`${id}. ${title}`}</CardTitle>
        <div className="space-x-2">
          <Button
            className="w-7 h-7"
            disabled={adding}
            variant="outline"
            onClick={handleAddItem} // Handle the plus button click
          >
            {adding ? "..." : <Plus />}
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
              <p className="text-wrap w-full flex flex-wrap">
                {description.substring(0, 200)}
              </p>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button variant="outline">
          Price: {Number(price)}
        </Button>
      </CardFooter>
    </Card>
  );
}

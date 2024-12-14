import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";

type formData = {
  name: string;
  description: string;
  price: string;
};

export function DialogBox({ updateData }: { updateData: any }) {
  const [form, setForm] = useState<formData>({ name: "", description: "", price: "" });
  const [isSaving, setIsSaving] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // Dialog open state

  const handleSave = async () => {
    if (!form.name || !form.description || !form.price) return;

    setIsSaving(true);

    try {
      const docRef = await addDoc(collection(db, "menu", "menu-items", "items"), form);
      updateData((prev: formData[]) => [...prev, form]);
      setForm({ name: "", description: "", price: "" });
      console.log("Document written with ID: ", docRef.id);
      setIsOpen(false); // Close dialog after saving
    } catch (error) {
      console.error("Error adding document: ", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setIsOpen(true)}>
          Add New Item
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Item</DialogTitle>
          <DialogDescription>
            Add new item to your menu. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-left">
              Name
            </Label>
            <Input
              id="name"
              placeholder="e.g., Chai"
              className="col-span-3"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-left">
              Description
            </Label>
            <Input
              id="description"
              placeholder="e.g., Black Chai without milk."
              className="col-span-3 h-20"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-left">
              Price
            </Label>
            <Input
              id="price"
              placeholder="e.g., Rs 10"
              className="col-span-3"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleSave} disabled={isSaving}>
            {isSaving ? "Saving..." : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

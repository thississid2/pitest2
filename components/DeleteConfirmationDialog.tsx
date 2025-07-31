import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import Button from "@/components/ui/button";

/**
 * Props for DeleteConfirmationDialog component.
 */
interface DeleteConfirmationDialogProps {
  open: boolean;
  acquirer: string | null;
  onCancel: () => void;
  onConfirm: () => void;
}

/**
 * Renders a confirmation dialog for deleting an acquirer.
 */
const DeleteConfirmationDialog: React.FC<DeleteConfirmationDialogProps> = ({
  open,
  acquirer,
  onCancel,
  onConfirm,
}) => (
  <Dialog open={open} onOpenChange={open ? onCancel : undefined}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Delete Acquirer</DialogTitle>
      </DialogHeader>
      <div className="mb-6">
        Are you sure you want to delete{" "}
        <span className="font-bold">{acquirer}</span>?
      </div>
      <DialogFooter className="flex justify-end gap-4">
        <Button
          text="No"
          className="bg-gray-200 hover:bg-gray-300"
          onClick={onCancel}
        />
        <Button
          text="Yes"
          className="bg-red-500 text-white hover:bg-red-600"
          onClick={onConfirm}
        />
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export default DeleteConfirmationDialog;

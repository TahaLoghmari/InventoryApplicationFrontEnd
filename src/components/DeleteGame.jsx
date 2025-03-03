import { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { States } from "./App";
import { toast } from "sonner";
import { API_BASE_URL } from '@/lib/api';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
export default function DeleteGame() {
  const { GameList, setGameList } = useContext(States);
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  const handleDelete = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/games/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete game from server");
      }
      const updatedGameList = GameList.filter(
        (game) => game.id !== parseInt(id)
      );
      setGameList(updatedGameList);
      setIsOpen(false);
      toast("Game has been deleted successfully.");
      navigate("/games");
    } catch (error) {
      console.error("Error deleting game:", error);
      toast.error("Failed to delete game. Please try again.");
    }
  };
  const handleCancel = () => {
    setIsOpen(false);
    navigate("/games");
  };
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your Game
            and remove its data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancel} className="cursor-pointer">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} className="cursor-pointer">
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

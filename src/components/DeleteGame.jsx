import { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { States } from "./App";
import { toast } from "sonner";
import { API_BASE_URL } from "@/lib/api";
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
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleDelete = async () => {
    try {
      setLoading(true);
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
      setLoading(false);
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
  if (loading)
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
        <div className="bg-card rounded-lg p-6 text-center shadow-lg">
          <div className="border-primary mb-4 inline-block h-8 w-8 animate-spin rounded-full border-4 border-t-transparent"></div>
          <p className="text-lg font-medium">Deleting Game...</p>
        </div>
      </div>
    );
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

import { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { States } from "./App";
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
export default function DeleteCategory() {
  const { CategoryList, setCategoryList } = useContext(States);
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(true);
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleDelete = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete category from the server");
      }
      const updatedCategoryList = CategoryList.filter(
        (category) => category.id !== parseInt(id)
      );
      setCategoryList(updatedCategoryList);
      setIsOpen(false);
      navigate("/categories");
      setLoading(false);
    } catch (error) {
      setErrorDialogOpen(true);
    }
  };
  const handleCancel = () => {
    setIsOpen(false);
    navigate("/categories");
  };
  if (loading)
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
        <div className="bg-card rounded-lg p-6 text-center shadow-lg">
          <div className="border-primary mb-4 inline-block h-8 w-8 animate-spin rounded-full border-4 border-t-transparent"></div>
          <p className="text-lg font-medium">Deleting Category...</p>
        </div>
      </div>
    );
  return (
    <>
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              Category and remove its data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={handleCancel}
              className="cursor-pointer"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="cursor-pointer"
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog open={errorDialogOpen} onOpenChange={setErrorDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cannot Delete Category</AlertDialogTitle>
            <AlertDialogDescription>
              Make sure you change this category’s games category so you can
              delete this category.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setErrorDialogOpen(false);
                navigate("/categories");
              }}
              className="cursor-pointer"
            >
              OK
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

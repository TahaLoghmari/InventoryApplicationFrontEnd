import { useContext, useEffect } from "react";
import { States } from "./App";
import { Link } from "react-router-dom";
import { Cat, CirclePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { Trash2 } from "lucide-react";
import { Outlet } from "react-router-dom";

export default function Categories() {
  const { setCurrentPage, CategoryList } = useContext(States);
  useEffect(() => {
    setCurrentPage("Categories Inventory");
  }, []);
  return (
    <div className="mt-6 w-[80%] rounded-sm border p-6 sm:w-[70%] md:w-[60%]">
      <div className="flex justify-between">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Categories
        </h4>
        <Button className="w-30 sm:w-40 md:w-45">
          <Link
            to="/categories/create"
            className="flex flex-row items-center justify-center gap-2"
          >
            <CirclePlus />
            <p className="leading-7 [&:not(:first-child)]:mt-0">Add Category</p>
          </Link>
        </Button>
      </div>
      <div className="mt-8 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
        {CategoryList.map((Category) => (
          <Link
            className="bg-secondary relative mb-6 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-sm border p-6 pt-3 transition-all duration-200 hover:brightness-125"
            key={Category.id}
            to={`/categories/${Category.id}`}
          >
            <div className="text-muted-foreground mb-1 flex w-full justify-end gap-3">
              <Link to={`/categories/edit/${Category.id}`}>
                <Pencil className="text-primary bg-secondary h-7 w-7 rounded-full border p-1 hover:scale-[1.2]" />
              </Link>
              <Link to={`/categories/delete/${Category.id}`}>
                <Trash2 className="text-primary bg-secondary h-7 w-7 rounded-full border p-1 hover:scale-[1.2]" />
              </Link>
            </div>
            <img
              src={Category.imageUrl}
              alt="Category Image"
              className="mb-2 h-[80%] w-full rounded-sm"
            />
            <p className="text-xs leading-7 md:text-sm lg:text-base [&:not(:first-child)]:mt-0">
              {Category.name} Games
            </p>
          </Link>
        ))}
      </div>
      <Outlet />
    </div>
  );
}

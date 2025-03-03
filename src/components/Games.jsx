import { useContext, useEffect } from "react";
import { States } from "./App";
import { Link } from "react-router-dom";
import { CirclePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { Trash2 } from "lucide-react";
import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";

export default function Games() {
  const { setCurrentPage, GameList } = useContext(States);
  useEffect(() => {
    setCurrentPage("Games Inventory");
  }, []);
  return (
    <div className="mt-6 w-[80%] rounded-sm border p-6 sm:w-[70%] md:w-[60%]">
      <div className="flex justify-between">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Games
        </h4>
        <Button>
          <Link
            to="/games/create"
            className="flex flex-row items-center justify-center gap-2"
          >
            <CirclePlus />
            <p className="leading-7 [&:not(:first-child)]:mt-0">Add New Game</p>
          </Link>
        </Button>
      </div>
      <div className="mt-8 grid grid-cols-2 gap-5 rounded-sm md:grid-cols-3 lg:grid-cols-4">
        {GameList.map((Game) => (
          <Link
            to={`/games/${Game.id}`}
            className="relative mb-6 cursor-pointer"
            key={Game.id}
          >
            <img
              src={Game.imageUrl}
              alt="Game Icon"
              className="mb-2 h-[80%] w-full rounded-sm transition-all duration-200 hover:scale-[1.02] hover:brightness-125"
            />
            <p className="text-muted-foreground text-xs leading-7 md:text-sm lg:text-base [&:not(:first-child)]:mt-0">
              {Game.category}
            </p>
            <h4 className="scroll-m-20 text-sm font-semibold tracking-tight md:text-base lg:text-lg">
              {Game.name}
            </h4>
            <p className="text-xs leading-7 md:text-sm lg:text-base [&:not(:first-child)]:mt-0">
              {Game.price == 0 ? "Free" : `$${Game.price}`}
            </p>
            <div className="text-muted-foreground absolute top-2 right-1 flex gap-3">
              <Link to={`/games/edit/${Game.id}`}>
                <Pencil className="text-primary bg-secondary h-6 w-6 rounded-full border p-1 hover:scale-[1.2]" />
              </Link>
              <Link to={`/games/delete/${Game.id}`}>
                <Trash2 className="text-primary bg-secondary h-6 w-6 rounded-full border p-1 hover:scale-[1.2]" />
              </Link>
            </div>
          </Link>
        ))}
      </div>
      <Outlet />
      <Toaster />
    </div>
  );
}

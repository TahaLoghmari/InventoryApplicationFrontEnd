import { CirclePlus } from "lucide-react";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { States } from "./App";
export default function Home() {
  const { currentPage, setCurrentPage, CategoryList, GameList } =
    useContext(States);
  useEffect(() => {
    setCurrentPage("GameStore Inventory");
  }, []);
  return (
    <>
      <div className="mt-6 w-[70%] rounded-sm border p-6">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Welcome to GameStore Inventory
        </h3>
        <p className="leading-7 [&:not(:first-child)]:mt-4">
          Manage your gamestore's inventory efficiently with our easy-to-use
          system.
        </p>
        <div className="mt-4 flex flex-col gap-4 lg:flex-row">
          <Link
            className="bg-secondary text-secondary-foreground hover:bg-secondary/90 w-full cursor-pointer rounded-sm p-6 transition-all duration-200 hover:scale-[1.02] hover:shadow-md lg:grow"
            to="/games"
          >
            <p className="leading-7 [&:not(:first-child)]:mt-4">Games</p>
            <h3 className="text-secondary-foreground scroll-m-20 text-2xl font-semibold tracking-tight">
              {GameList.length}
            </h3>
            <p>total</p>
          </Link>
          <Link
            className="bg-secondary text-secondary-foreground hover:bg-secondary/90 w-full cursor-pointer rounded-sm p-6 transition-all duration-200 hover:scale-[1.02] hover:shadow-md lg:grow"
            to="/categories"
          >
            <p className="leading-7 [&:not(:first-child)]:mt-4">Categories</p>
            <h3 className="text-secondary-foreground scroll-m-20 text-2xl font-semibold tracking-tight">
              {CategoryList.length}
            </h3>
            <p>total</p>
          </Link>
        </div>
        <h4 className="mt-4 scroll-m-20 text-xl font-semibold tracking-tight">
          Quick Actions
        </h4>
        <div className="mt-4 flex flex-col gap-4 lg:flex-row">
          <Link
            to="/games/create"
            className="bg-secondary text-secondary-foreground hover:bg-secondary/90 flex w-full cursor-pointer items-center gap-4 rounded-sm p-6 transition-all duration-200 hover:scale-[1.02] hover:shadow-md lg:grow"
          >
            <CirclePlus />
            <div>
              <h4 className="mt-4 scroll-m-20 text-xl font-semibold tracking-tight">
                Add New Game
              </h4>
              <p className="leading-7 [&:not(:first-child)]:mt-0">
                Add a new Game to the inventory
              </p>
            </div>
          </Link>
          <Link
            to="/categories/create"
            className="bg-secondary text-secondary-foreground hover:bg-secondary/90 flex w-full cursor-pointer items-center gap-4 rounded-sm p-6 transition-all duration-200 hover:scale-[1.02] hover:shadow-md lg:grow"
          >
            <CirclePlus />
            <div>
              <h4 className="mt-4 scroll-m-20 text-xl font-semibold tracking-tight">
                Add New Category
              </h4>
              <p className="leading-7 [&:not(:first-child)]:mt-0">
                Add a new Category to the inventory
              </p>
            </div>
          </Link>
        </div>
      </div>
      <div className="bg-primary text-primary-foreground mt-6 mb-6 w-[70%] rounded-sm border p-6">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          How to use
        </h3>
        <div className="mt-4 mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
          <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
          <div className="space-y-1">
            <p className="text-sm leading-none font-medium">
              <span className="font-bold text-sky-500"> Click Games </span> to
              see All the games you created
            </p>
            <p className="text-muted-foreground text-sm">
              You will be able to see the image , name , category and the price
              of the games u added
            </p>
          </div>
        </div>
        <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
          <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
          <div className="space-y-1">
            <p className="text-sm leading-none font-medium">
              <span className="font-bold text-sky-500"> Click Categories </span>
              to see All the Categories you created
            </p>
            <p className="text-muted-foreground text-sm">
              You will be able to see the image and the name of the categories u
              added
            </p>
          </div>
        </div>
        <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
          <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
          <div className="space-y-1">
            <p className="text-sm leading-none font-medium">
              <span className="font-bold text-sky-500">
                {" "}
                Click Add New Game{" "}
              </span>{" "}
              to add a new Game
            </p>
            <p className="text-muted-foreground text-sm">
              fill the name , imageUrl , category , description , platform and
              price to add a new Game
            </p>
          </div>
        </div>
        <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
          <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
          <div className="space-y-1">
            <p className="text-sm leading-none font-medium">
              <span className="font-bold text-sky-500">
                {" "}
                Click Add New Category{" "}
              </span>
              to add a New Category
            </p>
            <p className="text-muted-foreground text-sm">
              fill the name , imageUrl , description to add a new Category
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

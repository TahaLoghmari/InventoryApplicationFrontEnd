import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { States } from "./App";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Game() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setCurrentPage, GameList } = useContext(States);
  const Game = GameList.find((item) => item.id === parseInt(id));
  useEffect(() => {
    setCurrentPage(`${Game.name}`);
  }, [id]);
  let goBack = () => {
    navigate(-1);
  };
  return !Game ? (
    <div className="mt-6 p-6">Game not found</div>
  ) : (
    <div className="my-auto mt-6 mb-6 flex h-[90%] w-[90%] flex-col justify-start rounded-sm border px-4 sm:w-[60%] md:w-[50%] lg:w-[40%] xl:w-[30%]">
      <ArrowLeft className="mt-2 mb-2 cursor-pointer" onClick={goBack} />
      <p className="">{Game.name}</p>
      <p className="text-muted-foreground mb-2 text-xs leading-7 md:text-sm lg:text-base [&:not(:first-child)]:mt-0">
        {Game.description}
      </p>
      <img
        src={Game.imageUrl}
        alt="Game Image"
        className="mb-2 h-[75%] w-full rounded-sm"
      />
      <div className="flex flex-col items-start">
        <p className="bg-secondary text-secondary-foreground mb-2 rounded-sm p-2">
          {Game.category} Game
        </p>
        <p className="mb-2 font-bold">
          {" "}
          {Game.price == 0 ? "Free" : `${Game.price}`}
        </p>
      </div>
    </div>
  );
}

import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { States } from "./App";
import { Link } from "react-router-dom";
import { Pencil } from "lucide-react";
import { Trash2 } from "lucide-react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Category() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setCurrentPage, GameList, CategoryList } = useContext(States);
  const Category = CategoryList.find((item) => item.id === parseInt(id));
  useEffect(() => {
    setCurrentPage(`${Category.name}`);
  }, [id]);
  let goBack = () => {
    navigate(-1);
  };
  return !Category ? (
    <div className="mt-6 p-6">Category not found</div>
  ) : (
    <div className="mt-6 w-[95%] rounded-sm border p-6 md:w-[60%]">
      <ArrowLeft className="mt-2 mb-3 cursor-pointer" onClick={goBack} />
      <div className="bg-secondary text-secondary-foreground w-full rounded-sm p-6">
        <h4 className="text-secondary-foreground scroll-m-20 text-xl font-semibold tracking-tight">
          Description
        </h4>
        <p className="leading-7 [&:not(:first-child)]:mt-4">
          {Category.description}
        </p>
      </div>
      <h4 className="mt-5 scroll-m-20 text-2xl font-semibold tracking-tight">
        {Category.name}'s Games
      </h4>
      <div className="mt-8 grid grid-cols-2 gap-5 rounded-sm md:grid-cols-3 lg:grid-cols-4">
        {GameList.filter((Game) => Game.category === Category.name).map(
          (Game) => (
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
          ),
        )}
      </div>
    </div>
  );
}

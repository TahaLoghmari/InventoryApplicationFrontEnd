import { ThemeProvider } from "./theme-provider";
import { ModeToggle } from "./mode-toggle";
import { createContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import { API_BASE_URL } from "@/lib/api";

export const States = createContext(null);
function App() {
  const [currentPage, setCurrentPage] = useState("GameStore");
  const [GameList, setGameList] = useState([]);
  const [CategoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setCurrentPage("Games");
    fetch(`${API_BASE_URL}/categories`)
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((categoriesData) => {
        const formattedCategories = categoriesData
          .map((category) => {
            return {
              id: category.categoryid,
              name: category.name,
              imageUrl: category.imageurl,
              description: category.description,
            };
          })
          .catch((error) => console.log(error));
        setCategoryList(formattedCategories);
        return fetch(`${API_BASE_URL}/games`)
          .then((response) => response.json())
          .then((gamesData) => {
            setLoading(false);
            const formattedGames = gamesData.map((game) => {
              const matchingCategory = formattedCategories.find(
                (category) => category.id == game.categoryid
              );
              return {
                id: game.gameid,
                name: game.name,
                price: game.price,
                platform: game.platform,
                description: game.description,
                imageUrl: game.imageurl,
                category: matchingCategory.name,
              };
            });
            setGameList(formattedGames);
          });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  if (loading)
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
        <div className="bg-card rounded-lg p-6 text-center shadow-lg">
          <div className="border-primary mb-4 inline-block h-8 w-8 animate-spin rounded-full border-4 border-t-transparent"></div>
          <p className="text-lg font-medium">Loading...</p>
        </div>
      </div>
    );
  return (
    <ThemeProvider>
      <States.Provider
        value={{
          currentPage,
          setCurrentPage,
          GameList,
          CategoryList,
          setCategoryList,
          setGameList,
        }}
      >
        <nav className="flex w-full items-center justify-center border-b">
          <div className="navContent flex w-[100%] flex-col gap-2 p-6 sm:w-[80%]">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              {currentPage}
            </h3>
            <div className="flex justify-between pl-2">
              <NavBar />
              <ModeToggle />
            </div>
          </div>
        </nav>

        <Outlet />
      </States.Provider>
    </ThemeProvider>
  );
}

export default App;

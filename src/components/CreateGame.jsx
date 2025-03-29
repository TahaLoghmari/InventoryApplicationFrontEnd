import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { CircleCheck } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { useContext, useState, useEffect } from "react";
import { States } from "./App";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import { API_BASE_URL } from "@/lib/api";

const formSchema = z.object({
  name: z.string().min(3, "Game name must be at least 3 characters"),
  price: z.coerce.number().min(0, "Price must be at least 0"),
  picture: z.string().nonempty("Picture URL must not be empty"),
  category: z.string().nonempty("Please select a category"),
  platform: z.string().nonempty("Please select a platform"),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters")
    .max(500, "Description cannot exceed 500 characters")
    .optional(),
});

export default function CreateGame() {
  const navigate = useNavigate();
  const { CategoryList, setGameList, setCurrentPage } = useContext(States);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: 0,
      category: "",
      description: "",
      platform: "",
      picture: "",
    },
  });
  useEffect(() => {
    setCurrentPage("Create Game");
  }, []);
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const categoryId = CategoryList.find(
        (cat) => cat.name === data.category
      )?.id;
      const gameData = {
        name: data.name,
        price: parseInt(data.price),
        platform: data.platform,
        description: data.description,
        imageURL: data.picture,
        categoryId: categoryId,
      };
      const response = await fetch(`${API_BASE_URL}/games/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(gameData),
      });
      if (!response.ok) {
        throw new Error("Failed to create game");
      }
      const newGame = await response.json();
      setGameList((prevState) => [
        ...prevState,
        {
          id: newGame.gameid,
          name: newGame.name,
          price: newGame.price,
          platform: newGame.platform,
          description: newGame.description,
          imageUrl: newGame.imageurl,
          category: data.category,
        },
      ]);
      setLoading(false);
      setIsDialogOpen(true);
    } catch (error) {
      console.error("Error creating game:", error);
      alert("Failed to create game: " + error.message);
    }
  };
  let goBack = () => {
    navigate(-1);
  };
  if (loading)
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
        <div className="bg-card rounded-lg p-6 text-center shadow-lg">
          <div className="border-primary mb-4 inline-block h-8 w-8 animate-spin rounded-full border-4 border-t-transparent"></div>
          <p className="text-lg font-medium">Creating Game...</p>
        </div>
      </div>
    );
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto mt-6 max-w-sm space-y-4 rounded-sm border p-6"
        >
          <ArrowLeft className="cursor-pointer" onClick={goBack} />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Game name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Price" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="picture"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Picture</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Picture URL" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {CategoryList.map((Category) => (
                      <SelectItem value={Category.name} key={Category.id}>
                        {Category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>Pick a Category</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Describe Your Game" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="platform"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Platform</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a platform" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="PC">PC</SelectItem>
                    <SelectItem value="PS4-PS5">PS4-PS5</SelectItem>
                    <SelectItem value="Xbox">Xbox</SelectItem>
                    <SelectItem value="Cross Platform">
                      Cross Platform
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>Pick a Category</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Submitting..." : "Create Game"}
          </Button>
        </form>
      </Form>
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              <div className="flex items-center justify-between gap-2">
                <p className="leading-7 [&:not(:first-child)]:mt-0">
                  Game Successfully Created!
                </p>
                <CircleCheck className="text-green-500" />
              </div>
            </AlertDialogTitle>
            <AlertDialogDescription>
              Check Games To See How It Turned Out!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => {
                setIsDialogOpen(false);
                navigate("/games");
              }}
            >
              Ok
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

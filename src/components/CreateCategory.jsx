import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { API_BASE_URL } from "@/lib/api";
import { useContext, useState, useEffect } from "react";
import { States } from "./App";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { CircleCheck } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  name: z.string().min(3, "Category name must be at least 3 characters"),
  picture: z.string().min(5, "Picture URL must not be Empty"),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters")
    .max(500, "Description cannot exceed 500 characters")
    .optional(),
});

export default function CreateCategory() {
  const { setCategoryList, CategoryList, setCurrentPage } = useContext(States);
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", description: "" },
    picture: "",
  });
  useEffect(() => {
    setCurrentPage("Create Category");
  }, []);
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const categoryData = {
        name: data.name,
        description: data.description,
        imageURL: `${data.picture}`,
      };
      const response = await fetch(`${API_BASE_URL}/categories/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(categoryData),
      });

      if (!response.ok) {
        throw new Error("Failed to create category");
      }
      const newCategory = await response.json();
      setCategoryList((prevState) => [
        ...prevState,
        {
          id: newCategory.categoryid,
          name: newCategory.name,
          description: newCategory.description,
          imageUrl: newCategory.imageurl,
        },
      ]);
      setLoading(false);
      setIsDialogOpen(true);
    } catch (error) {
      console.error("Error creating category:", error);
      alert("Failed to create category: " + error.message);
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
          <p className="text-lg font-medium">Creating Category...</p>
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
                  <Input placeholder="Enter Category name" {...field} />
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
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Describe Your Category" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Submitting..." : "Create Category"}
          </Button>
        </form>
      </Form>
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              <div className="flex items-center justify-between gap-2">
                <p className="leading-7 [&:not(:first-child)]:mt-0">
                  Category Successfully Created!
                </p>
                <CircleCheck className="text-green-500" />
              </div>
            </AlertDialogTitle>
            <AlertDialogDescription>
              Check Categories To See How It Turned Out!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => {
                setIsDialogOpen(false);
                navigate("/categories");
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

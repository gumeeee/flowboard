import { Separator } from "@/components/ui/separator";
import { NewProjectForm } from "./NewProjectForm";

export default function NewProjectPage() {
  return (
    <div className="w-full md:w-[80%] mx-auto mt-20 p-8">
      <h1>Create new Project</h1>
      <Separator className="my-4" />
      <NewProjectForm />
    </div>
  );
}

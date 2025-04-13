"use client";

import { useToast } from "@/hooks/use-toast";
import { projects } from "@/utils/projects";
import { useMemo, useState } from "react";
import { ProjectTabs } from "./_components/ProjectTabs";
import { CloseProjectDialog } from "./_components/CloseProjectDialog";
import { DeleteProjectDialog } from "./_components/DeleteProjectDialog";
import { ReopenProjectDialog } from "./_components/ReopenProjectDialog";

interface ProjectsProps {
  initialProjects: IProject[];
}

export const Projects = ({ initialProjects }: ProjectsProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [availableProjects, setAvailableProjects] = useState(initialProjects);
  const [projectToClose, setProjectToClose] = useState<string | null>(null);
  const [projectToDelete, setProjectToDelete] = useState<IProject | null>(null);
  const [projectToReopen, setProjectToReopen] = useState<string | null>(null);
  const { toast } = useToast();

  const filteredProjects = useMemo(() => {
    return availableProjects
      .filter((project) => {
        const searchLower = searchTerm.toLowerCase();

        return (
          project.name.toLowerCase().includes(searchLower) ||
          project.description.toLowerCase().includes(searchLower)
        );
      })
      .sort((a, b) => {
        const dateA = new Date(a.created_at).getTime();
        const dateB = new Date(b.created_at).getTime();

        return sortOrder === "newest" ? dateA - dateB : dateB - dateA;
      });
  }, [searchTerm, initialProjects, sortOrder]);

  const activeProjects = filteredProjects.filter((project) => !project.closed);
  const closedProjects = filteredProjects.filter((project) => project.closed);

  const handleCloseProject = async () => {
    if (!projectToClose) return;

    try {
      await projects.administration.close(projectToClose);

      setAvailableProjects((prev) =>
        prev.map((project) =>
          project.id === projectToClose ? { ...project, closed: true } : project
        )
      );

      toast({
        title: "Project Closed ✅",
        description: "Project has been closed successfully!",
      });
    } catch (error) {
      console.log("Error closing project:", error);
      toast({
        variant: "destructive",
        title: "Error ❌",
        description: "Failed to close project. Please try again. 🫤",
      });
    } finally {
      setProjectToClose(null);
    }
  };

  const handleReopenProject = async () => {
    if (!projectToReopen) return;

    try {
      await projects.administration.reopen(projectToReopen);

      setAvailableProjects((prev) =>
        prev.map((project) =>
          project.id === projectToReopen
            ? { ...project, closed: false }
            : project
        )
      );

      toast({
        title: "Project Reopened ✅",
        description: "Project has been reopened successfully!",
      });
    } catch (error) {
      console.log("Error reopening project:", error);
      toast({
        variant: "destructive",
        title: "Error ❌",
        description: "Failed to reopen project. Please try again. 🫤",
      });
    } finally {
      setProjectToReopen(null);
    }
  };

  const handleDeleteProject = async () => {
    if (!projectToDelete) return;

    try {
      await projects.administration.delete(projectToDelete.id);

      setAvailableProjects((prev) =>
        prev.filter((project) => project.id !== projectToDelete.id)
      );

      toast({
        title: "Project Deleted ✅",
        description: "Project has been deleted successfully!",
      });
    } catch (error) {
      console.log("Error deleting project:", error);
      toast({
        variant: "destructive",
        title: "Error ❌",
        description: "Failed to delete project. Please try again. 🫤",
      });
    } finally {
      setProjectToDelete(null);
    }
  };

  const handleSort = (order: "newest" | "oldest") => {
    setSortOrder(order);
  };

  return (
    <div>
      <ProjectTabs
        activeProjects={activeProjects}
        closedProjects={closedProjects}
        allProjects={filteredProjects}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortOrder={sortOrder}
        onSort={handleSort}
        setProjectToClose={setProjectToClose}
        setProjectToReopen={setProjectToReopen}
        setProjectToDelete={setProjectToDelete}
      />

      <CloseProjectDialog
        open={!!projectToClose}
        onOpenChange={() => setProjectToClose(null)}
        onConfirm={handleCloseProject}
      />

      {projectToDelete && (
        <DeleteProjectDialog
          open={!!projectToDelete}
          onOpenChange={() => setProjectToDelete(null)}
          onConfirm={handleDeleteProject}
          projectName={projectToDelete.name}
        />
      )}

      <ReopenProjectDialog
        open={!!projectToReopen}
        onOpenChange={() => setProjectToReopen(null)}
        onConfirm={handleReopenProject}
      />
    </div>
  );
};

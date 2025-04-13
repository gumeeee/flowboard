import { createClient } from "./supabase/client";

const supabase = createClient();

export const projects = {
  administration: {
    close: async (projectId: string) => {
      const { error } = await supabase
        .from("projects")
        .update({
          closed: true,
          updated_at: new Date(),
        })
        .eq("id", projectId);

      if (error) throw error;
    },

    reopen: async (projectId: string) => {
      const { error } = await supabase
        .from("projects")
        .update({
          closed: false,
          updated_at: new Date(),
        })
        .eq("id", projectId);

      if (error) throw error;
    },

    delete: async (projectId: string) => {
      const { error } = await supabase
        .from("projects")
        .delete()
        .eq("id", projectId);

      if (error) throw error;
    },
  },

  getUserProjects: async (userId: string) => {
    const [ownedProjects, memberProjects] = await Promise.all([
      supabase
        .from("projects")
        .select("*")
        .eq("created_by", userId)
        .order("created_at", { ascending: false }),

      supabase
        .from("project_members")
        .select(
          `
          project:projects (*)
        `
        )
        .eq("user_id", userId)
        .eq("invitationStatus", "accepted")
        .order("created_at", { ascending: false })
        .not("project.created_by", "eq", userId),
    ]);

    if (ownedProjects.error) throw ownedProjects.error;
    if (memberProjects.error) throw memberProjects.error;

    const allProjects = [
      ...ownedProjects.data,
      ...memberProjects.data.map((row) => row.project),
    ];

    return allProjects as IProject[];
  },
};

"use client";

import { TextEditor } from "@/components/text-editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { CreateProjectModal } from "./CreateProjectModal";
import { CustomFieldOptions } from "@/components/custom-field/CustomFieldOptions";

export function NewProjectForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [readme, setReadme] = useState("");

  return (
    <div className="space-y-5">
      <div className="space-y-1 max-w-96">
        <Label className="text-xs">Project name</Label>
        <Input
          placeholder="Name your project"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="space-y-1 max-w-[30rem]">
        <Label className="text-xs">Short Description</Label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your project"
          rows={8}
        />
      </div>

      <div className="space-y-1 max-w-[40rem]">
        <Label className="text-xs">README</Label>
        <TextEditor
          content={readme}
          onChange={(content) => setReadme(content)}
          isEditable
        />
      </div>
      <div className="flex">
        <CreateProjectModal projectDetails={{ name, description, readme }} />
      </div>

      <CustomFieldOptions field="status" />
    </div>
  );
}

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { successBtnStyles } from "@/app/commonStyles";
import { OptionItem } from "./OptionItem";
import { defaultStatuses } from "@/consts/default-options";

interface Props {
  field: string;
  title?: string;
  description?: string;
}

export const CustomFieldOptions = ({ title, description }: Props) => {
  return (
    <>
      <div>
        <div className="flex justify-between items-center">
          <h1 className="text-lg py-3"> {title || "Options"} </h1>
          <Button className={cn(successBtnStyles)}>Create new Option</Button>
        </div>
        {description && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            {description}
          </p>
        )}

        <div className="border rounded-sm">
          {defaultStatuses.map((status) => (
            <OptionItem key={status.id} item={status} />
          ))}
        </div>
      </div>
    </>
  );
};

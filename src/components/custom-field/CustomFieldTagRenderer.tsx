import { getCustomFieldTagColorsForTheme } from "@/lib/helpers";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Badge } from "../ui/badge";

interface Props {
  color: string;
  label: string;
}

export const CustomFieldTagRenderer = ({ color, label }: Props) => {
  const { theme } = useTheme();
  const [styles, setStyles] = useState<object | undefined>(undefined);

  useEffect(() => {
    setStyles(getCustomFieldTagColorsForTheme(color, theme));
  }, [theme, color]);

  return styles && <Badge className="rounded-full" style={styles}>{label}</Badge>;
};

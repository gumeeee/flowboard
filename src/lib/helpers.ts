export function hslModifyLightness(hslColor: string, newLightness: number) {
  if (newLightness < 0 || newLightness > 100) {
    throw new Error("Lightness must be between 0 and 100.");
  }
  const hslPattern = /hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/;
  const match = hslColor.match(hslPattern);

  if (!match) {
    throw new Error("Invalid HSL color format.");
  }

  const h = match[1];
  const s = match[2];

  return `hsl(${h}, ${s}%, ${newLightness}%)`;
}

export const getCustomFieldTagColorsForTheme = (
  hslColor: string,
  theme: string | undefined
) => ({
  backgroundColor: hslModifyLightness(hslColor, theme === "light" ? 90 : 15),
  color: hslModifyLightness(hslColor, theme === "light" ? 40 : 70),
  border: `1px solid ${hslModifyLightness(hslColor, theme === "light" ? 60 : 45)}`,
});

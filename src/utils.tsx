export function getContrastColorHex(color: string) {
    if (color && color.length === 7) {
       let x = color.replace("#", "");
       let r = parseInt(x.substring(0, 2), 16);
       let g = parseInt(x.substring(2, 4), 16);
       let b = parseInt(x.substring(4, 6), 16);

       if (r * 0.299 + g * 0.587 + b * 0.114 > 186) return "#18181b";
       else return "#f4f4f5";
    }
 }

 export function getContrastColorName(color: string) {
   if (color && color.length === 7) {
      let x = color.replace("#", "");
      let r = parseInt(x.substring(0, 2), 16);
      let g = parseInt(x.substring(2, 4), 16);
      let b = parseInt(x.substring(4, 6), 16);

      if (r * 0.299 + g * 0.587 + b * 0.114 > 186) return "text-zinc-900";
      else return "text-zinc-100";
   }
}
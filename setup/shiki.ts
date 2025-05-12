import { defineShikiSetup } from "@slidev/types";

import python314Grammar from "../assets/grammars/python314.json";

// @ts-expect-error who knows, honestly? -dave
export default defineShikiSetup(() => {
  return {
    themes: {
      dark: "one-dark-pro",
      light: "one-light",
    },
    langs: ["js", python314Grammar],
  };
});

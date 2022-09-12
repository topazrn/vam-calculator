import { DB } from "$lib/Database";
import { browser } from "$app/environment";
import type { LayoutLoad } from "./$types";

export const load: LayoutLoad = async () => {
  if (!browser) {
    return {
      problems: [],
    };
  }

  return {
    problems: await DB.problems.reverse().toArray(),
  };
};

import { DB } from "$lib/Database";
import { browser } from "$app/env";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params }) => {
  if (!browser) {
    return {
      problem: undefined,
    };
  }

  return {
    problem: await DB.problems.where("id").equals(parseInt(params.slug)).first(),
  };
};

import { DB, type Problem } from "$lib/Database";
import { browser } from "$app/environment";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params }) => {
  const _: Problem = {
    id: 0,
    y: [1],
    x: [1],
    matrix: [[1]],
    dateIn: 0,
  };

  if (!browser) {
    return {
      problem: _,
    };
  }

  const problem = await DB.problems.where("id").equals(parseInt(params.slug)).first();

  if (problem === undefined) {
    return {
      problem: _,
    };
  }

  return {
    problem: problem,
  };
};

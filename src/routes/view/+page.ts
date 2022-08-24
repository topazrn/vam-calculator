import { DB } from "$lib/Database";
import { browser } from "$app/env";

export async function load() {
  return {
    problems: browser ? await DB.problems.toArray() : []
  } ;
}

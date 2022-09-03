import { DB } from "$lib/Database";
import { browser } from "$app/environment";
import type { PageLoad } from "./$types";

interface ChartData {
  month: string;
  count: number;
}

export const load: PageLoad = async () => {
  const chart: ChartData[] = [];

  if (!browser) return { chart };

  const problems = await DB.problems.orderBy("dateIn").toArray();

  if (problems.length === 0) return { chart };

  const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  for (let index = 0; index < problems.length; index++) {
    const problem = problems[index];

    if (chart.length > 0 && chart[chart.length - 1].month === month[new Date(problem.dateIn).getMonth()]) {
      chart[chart.length - 1].count++;
    } else {
      chart.push({ month: month[new Date(problem.dateIn).getMonth()], count: 1 });
    }
  }

  return {
    chart,
  };
};

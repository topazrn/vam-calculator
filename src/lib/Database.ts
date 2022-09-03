import { Dexie, type Table } from "dexie";
import type { Problem as IProblem } from "vogels-approximation-method";

export interface Problem extends IProblem {
  id?: number;
  dateIn: number;
}

export class Database extends Dexie {
  problems!: Table<Problem>;

  constructor() {
    super("dexie");
    this.version(1).stores({
      problems: "++id, dateIn", // Primary key and indexed props
    });
  }
}

export const DB = new Database();

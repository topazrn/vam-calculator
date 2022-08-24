import Dexie from 'dexie';
import type { Table } from 'dexie';

export interface Problem {
  id?: number;
  supply: number[],
  demand: number[],
  cost: number[][],
  dateIn: number,
}

export class Database extends Dexie {
  problems!: Table<Problem>;

  constructor() {
    super('dexie');
    this.version(1).stores({
      problems: '++id, dateIn' // Primary key and indexed props
    });
  }
}

export const DB = new Database();

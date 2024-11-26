import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root',
})
export class DBTaskService {
  private db!: SQLiteObject;

  constructor(private sqlite: SQLite, private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.create();
    this.db = await this.sqlite.create({
      name: 'data.db',
      location: 'default',
    });

    await this.createTables();
  }

  async createTables() {
    const sql = `
      CREATE TABLE IF NOT EXISTS sesion_data (
        user_name TEXT PRIMARY KEY NOT NULL,
        password INTEGER NOT NULL,
        active INTEGER NOT NULL
      )
    `;
    await this.db.executeSql(sql, []);
  }

  async setSQLiteObject(db: SQLiteObject) {
    this.db = db;
  }

  async isActiveSession(): Promise<boolean> {
    const res = await this.db.executeSql(
      'SELECT * FROM sesion_data WHERE active = 1',
      []
    );

    return res.rows.length > 0;
  }

  async validateUser(userName: string, password: number): Promise<boolean> {
    const res = await this.db.executeSql(
      'SELECT * FROM sesion_data WHERE user_name = ? AND password = ?',
      [userName, password]
    );

    return res.rows.length > 0;
  }

  async registerSession(userName: string, password: number): Promise<void> {
    const sql =
      'INSERT INTO sesion_data (user_name, password, active) VALUES (?, ?, ?)';

    await this.db.executeSql(sql, [userName, password, 1]);
  }

  async updateSessionStatus(userName: string, active: number): Promise<void> {
    const sql = 'UPDATE sesion_data SET active = ? WHERE user_name = ?';

    await this.db.executeSql(sql, [active, userName]);
  }

  async saveSessionToStorage(userName: string) {
    await this.storage.set('activeUser ', userName);
  }

  async clearSessionFromStorage() {
    await this.storage.remove('activeUser ');
  }
}

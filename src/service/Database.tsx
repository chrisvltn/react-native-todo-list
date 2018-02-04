import SQLite from 'react-native-sqlite-storage'
import { SQLitePlugin, SQLResult } from 'react-native-sqlite-storage';
SQLite.enablePromise(false);

let db;

export class Database {
	db: SQLitePlugin

	static async getInstance(): Promise<Database> {
		if (db) return db
		db = new Database()
		await db.connect()
		return db
	}

	async connect() {
		if (this.db) return this.db;
		this.db = await new Promise((resolve, reject) => {
			const db = SQLite.openDatabase({ name: 'tasklist5.db' }, () => resolve(db), err => reject(err))
		})
		return this.db
	}

	async query(sql: string, params: any[] = []): Promise<SQLResult> {
		params = this.treatParams(params)
		return new Promise<SQLResult>(resolve => {
			this.db.transaction(async tx => {
				const [newTx, results] = await (new Promise((resolve, reject) => {
					tx.executeSql(sql, params, (a, b) => resolve([a, b]), err => reject(err))
				})) as any
				resolve(results)
			})
		})
	}

	async queryAndGetRows(sql: string, params: any[] = []): Promise<any[]> {
		const result = await this.query(sql, params)
		const data = []

		for (let i = 0; i < result.rows.length; i++) {
			data.push(result.rows.item(i))
		}

		return data;
	}

	async queryAndGetInsertId(sql: string, params: any[] = []): Promise<number> {
		const result = await this.query(sql, params)
		return result.insertId
	}

	async insert(table: string, keys: string[], values: any[]): Promise<number> {
		const gaps = keys.map(k => '?')
		const sql = `INSERT INTO ${table} (${keys.join(', ')}) VALUES (${gaps.join(', ')})`
		const insertId = this.queryAndGetInsertId(sql, values)
		return insertId
	}

	async update(table: string, keys: string[], values: any[], where?: { [key: string]: any }) {
		const keysString = keys.map(k => k + ' = ?').join(', ')
		const { sql, params } = this.buildWhere(where)
		const query = `UPDATE ${table} SET ${keysString} ` + sql
		return this.query(query, values.concat(params))
	}

	async delete<T>(table: string, statement?: WhereStatement<T>): Promise<any> {
		const { sql, params } = this.buildWhere(statement)
		const query = `DELETE ${table} ` + sql
		return this.query(query, params)
	}

	private buildWhere<T>(where: WhereStatement<T>): WhereStatementResult {
		const values = []
		let sql = ''
		if (where) {
			Object.keys(where).forEach(k => values.push(where[k]))
			sql = 'WHERE ' + Object.keys(where).map(k => k + ' = ?').join(' AND ')
		}
		return {
			params: values,
			sql: sql,
		}
	}

	private treatParams(params: any[]): any[] {
		const newParams = []
		params.forEach(p => {
			switch (typeof p) {
				case 'string':
					newParams.push(p.trim()); break;
				case 'boolean':
					newParams.push(p ? 1 : 0); break;
				case 'object':
					if (p instanceof Date) {
						newParams.push(p.toISOString())
					} else if (p !== null) {
						try { newParams.push(JSON.stringify(p)) }
						catch (e) { newParams.push(p) }
					} else {
						newParams.push(p)
					}
					break;
				default:
					newParams.push(p)
			}
		})
		return newParams
	}
}

type WhereStatement<T> = {
	[K in keyof T]?: T[K]
}

type WhereStatementResult = {
	sql: string
	params: any[]
}
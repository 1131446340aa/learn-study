import client from '../database/index.ts';
export const FindOne = async (tableName: string, where: string) => {
	let sql = `select id from ${tableName}s ${where}`;
	let res = (await client.execute(sql)).rows;
	return res && res[0];
};

export const Count = async (tableName: string, where: string) => {
	let sql = `select count(*) as count from ${tableName}s as ${tableName} ${where}`;
	let result = (await client.execute(sql)).rows;
	return result && result[0].count;
};

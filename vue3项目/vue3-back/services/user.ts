import { UserInfo } from '../types/interface.ts';
import { FindOne } from '../util/processMysql.ts';
import client from '../database/index.ts';

export const createUser = async ({ userName, password, nickName, question, answer }: UserInfo) => {
	let sql = `insert into users (userName, password, nickName, question, answer) values ('${userName}', '${password}', '${nickName}', '${question}', '${answer}')`;
	await client.execute(sql);
};

export const getUserInfo = async ({ userName, password }: UserInfo) => {
	let where = `where userName = ${userName} `;
	if (password) {
		where += `and password = ${password}`;
	}
	let sql = `select * from users ${where}`;
	return (await client.execute(sql)).rows;
};
export const updateUser = async ({ nickName, picture, password, work, desc, userId }: UserInfo) => {
	let sql = `update users set `;
	//   let updateIptions = {}
	let updateSql = ``;
	nickName && (updateSql += `nickName = '${nickName}', `);
	picture && (updateSql += `picture = '${picture}', `);
	password && (updateSql += `password = '${password}', `);
	work && (updateSql += `work = '${work}', `);
	desc && (updateSql += `des = '${desc}', `);
	updateSql = updateSql.slice(0, -2);
	sql = `${sql}${updateSql} where id = ${userId}`;
	return (await client.execute(sql)).affectedRows;
};

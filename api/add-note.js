/**
 * Route: POST /note
 */
import AWS from 'aws-sdk';
import { getResponseHeaders, getUserId, getUserName } from './util.js';
import moment from 'moment';
import { uuid } from 'uuidv4';

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.NOTES_TABLE;

export const handler = async (event) => {
	try {
		let item = JSON.parse(event.body).Item;
		item.user_id = getUserId(event.headers);
		item.user_name = getUserName(event.headers);
		item.note_id = item.user_id + ':' + uuid();
		item.timestamp = moment().unix();
		item.expires = moment().add(90, 'days').unix();

		let data = await dynamoDb
			.put({
				TableName: tableName,
				Item: item,
			})
			.promise();

		return {
			statusCode: 200,
			headers: getResponseHeaders(),
			body: JSON.stringify(item),
		};
	} catch (err) {
		console.log('Error', err);
		return {
			statusCode: err.statusCode ? err.statusCode : 500,
			headers: getResponseHeaders(),
			body: JSON.stringify({
				error: err.name ? err.name : 'Exception',
				message: err.message ? err.message : 'Unknown error',
			}),
		};
	}
};

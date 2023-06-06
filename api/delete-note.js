/**
 * Route: DELETE /note/t/{timestamp}
 */

import { AWS } from 'aws-sdk';
import { getResponseHeaders } from './util';

const dynamoDb = new AWS.DynamoDb.DocumentClient();
const tableName = process.env.NOTES_TABLE;

exports.handler = async (event) => {
	try {
		return {
			statusCode: 200,
			headers: getResponseHeaders(),
			body: JSON.stringify(''),
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

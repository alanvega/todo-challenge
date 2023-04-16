import type {NextApiRequest, NextApiResponse} from 'next'
import {TODO_ADD_PATH, TODO_CLEAR_DONE_PATH} from '@/utils/url-paths';
import {AddReq} from '@/interfaces/addReq';
import mongodbCollection from '@/lib/mongo';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'DELETE') {
		// handle the POST request
		const queryId = req.query.id;
		console.log(`${TODO_CLEAR_DONE_PATH} request received with id ${queryId}`)

		const dbCollection = await mongodbCollection();
		await dbCollection.deleteMany({isDone: true});

		console.log('Deleted all done items');
		res.status(200).json({});
	} else {
		// handle other HTTP methods
		res.status(400).json({error: 'Only POST requests allowed'});
	}
}

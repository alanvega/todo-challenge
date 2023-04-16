import type {NextApiRequest, NextApiResponse} from 'next'
import {TODO_DELETE_PATH} from '@/utils/url-paths';
import mongodbCollection from '@/lib/mongo';
import {ObjectId} from 'bson';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'DELETE') {
		// handle the DELETE request
		const queryId = req.query.id as string;
		console.log(`${TODO_DELETE_PATH} DELETE request received with query: ${queryId}`);

		const dbCollection = await mongodbCollection();
		await dbCollection.findOneAndDelete({_id: new ObjectId(queryId)});

		// TODO: reorder list

		console.log("Deleted todo item with id: {}", queryId);
		res.status(200).json({});
	} else {
		// handle other HTTP methods
		res.status(400).json({error: 'Only DELETE requests allowed'});
	}
}

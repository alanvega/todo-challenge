import type {NextApiRequest, NextApiResponse} from 'next'
import {TODO_MARK_DONE_PATH} from '@/utils/url-paths';
import {MarkDoneReq} from '@/interfaces/markDoneReq';
import mongodbCollection from '@/lib/mongo';
import {ObjectId} from 'bson';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'POST') {
		// handle the POST request
		const markDoneReq: MarkDoneReq = JSON.parse(req.body);
		console.log(`${TODO_MARK_DONE_PATH} request received with body: ${markDoneReq}`);

		// update the given id
		const dbCollection = await mongodbCollection();
		await dbCollection.findOneAndUpdate(
			{_id: new ObjectId(markDoneReq.id)}, {$set: {isDone: markDoneReq.isDone}}
		);
		console.log(`Marked item ${markDoneReq.id} as isDone: ${markDoneReq.isDone}`);

		res.status(200).json({});
	} else {
		// handle other HTTP methods
		res.status(400).json({error: 'Only POST requests allowed'});
	}
}

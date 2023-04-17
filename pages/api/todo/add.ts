import type {NextApiRequest, NextApiResponse} from 'next'
import {TODO_ADD_PATH} from '@/utils/url-paths';
import {AddReq} from '@/interfaces/addReq';
import mongodbCollection from '@/lib/mongo';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	// handle the POST request
	if (req.method === 'POST') {
		const addReq: AddReq = JSON.parse(req.body);
		console.log(`${TODO_ADD_PATH} request received, with body: `, addReq);

		const dbCollection = await mongodbCollection();
		// this finds the last added item and adds 1 to its order
		const [lastAdded] = await dbCollection.find({}).sort({_id:-1}).limit(1).toArray();
		const newOrder = lastAdded?.order+1 || 0;
		await dbCollection.insertOne({...addReq, order: newOrder});

		console.log('Inserted new todo item: {}, with order {}', addReq, newOrder);
		res.status(200).json({});
	} else {
		// handle other HTTP methods
		res.status(400).json({error: 'Only POST requests allowed'});
	}
}

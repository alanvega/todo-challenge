import type {NextApiRequest, NextApiResponse} from 'next'
import {TODO_ADD_PATH} from '@/utils/url-paths';
import {AddReq} from '@/interfaces/addReq';

interface TodoRequest extends NextApiRequest {
	body: AddReq;
}

export default function handler(
	req: TodoRequest,
	res: NextApiResponse
) {
	if (req.method === 'POST') {
		// handle the POST request
		console.log(`${TODO_ADD_PATH} request received`)
		console.log(`Received body: ${req.body}`);
		res.status(200).json({ message: 'POST request received' });
	} else {
		// handle other HTTP methods
		res.status(400).json({ error: 'Only POST requests allowed' });
	}
}

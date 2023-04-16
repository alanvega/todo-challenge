import type {NextApiRequest, NextApiResponse} from 'next'
import {TODO_ADD_PATH, TODO_CLEAR_DONE_PATH} from '@/utils/url-paths';
import {AddReq} from '@/interfaces/addReq';

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'DELETE') {
		// handle the POST request
		console.log(`${TODO_CLEAR_DONE_PATH} request received`)
		res.status(200).json({ message: 'POST request received' });
	} else {
		// handle other HTTP methods
		res.status(400).json({ error: 'Only POST requests allowed' });
	}
}

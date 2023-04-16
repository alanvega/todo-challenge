import type {NextApiRequest, NextApiResponse} from 'next'
import {TODO_DELETE_PATH} from '@/utils/url-paths';

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'DELETE') {
		// handle the DELETE request
		console.log(`${TODO_DELETE_PATH} DELETE request received`)
		console.log(`Received body: ${req.query.id}`);
		res.status(200).json({ message: 'POST request received' });
	} else {
		// handle other HTTP methods
		res.status(400).json({ error: 'Only DELETE requests allowed' });
	}
}

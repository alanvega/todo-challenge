import type {NextApiRequest, NextApiResponse} from 'next'
import {TODO_MARK_DONE_PATH} from '@/utils/url-paths';
import {MarkDoneReq} from '@/interfaces/markDoneReq';

interface MarkDoneRequest extends NextApiRequest {
	body: MarkDoneReq;
}

export default function handler(
	req: MarkDoneRequest,
	res: NextApiResponse
) {
	if (req.method === 'POST') {
		// handle the POST request
		console.log(`${TODO_MARK_DONE_PATH} request received`)
		console.log(`Received body: ${req.body}`);
		res.status(200).json({ message: 'POST request received' });
	} else {
		// handle other HTTP methods
		res.status(400).json({ error: 'Only POST requests allowed' });
	}
}

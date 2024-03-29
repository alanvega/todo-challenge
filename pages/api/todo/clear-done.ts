import type {NextApiRequest, NextApiResponse} from 'next'
import {TODO_CLEAR_DONE_PATH} from '@/utils/url-paths';
import {mongodbCollection} from '@/lib/mongo';
import {reorderTodoList} from '@/pages/api/todo/utils/_reorder-todo-list';

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

		await reorderTodoList();

		console.log('Deleted all done items');
		res.status(200).json({});
	} else {
		// handle other HTTP methods
		res.status(400).json({error: 'Only DELETE requests allowed'});
	}
}

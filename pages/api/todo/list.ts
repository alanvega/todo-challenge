import type {NextApiRequest, NextApiResponse} from 'next'
import {Todo} from '@/interfaces/todo';

// import todoList from '../_todo-list.json';
import {TodoListType} from '@/interfaces/todoListType';
import mongodbCollection from '@/lib/mongo';

interface ListReq extends NextApiRequest {
	query: { type: TodoListType }
}

export default async function handler(
	req: ListReq,
	res: NextApiResponse<Todo[]>
) {
	const queryType = req.query.type;
	console.log('todo list request received with query type: ', queryType);

	const dbCollection = await mongodbCollection();
	const todoWithId = await dbCollection.find().toArray();

	const todoList = todoWithId.map(({_id, isDone, name, order}): Todo => {
		return { isDone: isDone, name: name, order: order, id: _id.toHexString() };
	}).sort(
		(a, b) => a.order - b.order
	);

	if (queryType !== 'ALL') {
		return res.status(200).json(
			todoList.filter(({isDone}) => (queryType === 'COMPLETED') ? isDone : !isDone)
		);
	}

	return res.status(200).json(todoList);
}

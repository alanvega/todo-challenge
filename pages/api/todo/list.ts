import type {NextApiRequest, NextApiResponse} from 'next'
import {Todo} from '@/interfaces/todo';

import todoList from '../_todo-list.json';
import {TodoListType} from '@/interfaces/todoListType';

interface ListReq extends NextApiRequest {
	query: { type: TodoListType }
}

export default function handler(
	req: ListReq,
	res: NextApiResponse<Todo[]>
) {
	const queryType = req.query.type;
	console.log('todo list request received with query type: ', queryType);

	const list = todoList.sort(
		(a, b) => a.order - b.order
	);

	if (queryType !== 'ALL') {
		return res.status(200).json(
			list.filter(todo => (queryType === 'COMPLETED') ? todo.isDone : !todo.isDone)
		);
	}
	return res.status(200).json(list);
}

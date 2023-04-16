import {TrashIcon} from '@/icons/trash';
import {TODO_DELETE_PATH, TODO_MARK_DONE_PATH} from '@/utils/url-paths';
import {useState} from 'react';
import {MarkDoneReq} from '@/interfaces/markDoneReq';
import {useFetchAndReloadData} from '@/components/useFetchAndReloadData';

interface TodoItemInterface {
	id: number;
	isDone: boolean;
	name: string;
}

export const TodoItem = ({id, isDone, name}: TodoItemInterface) => {
	const {fetchAndReloadData} = useFetchAndReloadData();

	const [isChecked, setIsChecked] = useState(isDone);

	const handleDeleteTodo = async () => {
		// Make a delete to delete todo api
		await fetchAndReloadData(TODO_DELETE_PATH + id, 'DELETE');
		console.log('Delete todo', id);
	};

	const handleToggleCheckbox = async () => {
		const markDoneReq: MarkDoneReq = {id, isDone: !isChecked};

		// Make a post to mark-done api
		await fetchAndReloadData(TODO_MARK_DONE_PATH,
			'POST',
			JSON.stringify(markDoneReq))
		.then(() => setIsChecked(!isChecked));

		console.log('Marked todo as done');
	};

	return (
		<li className="flex space-x-3">
			<input type="checkbox" defaultChecked={isChecked} onChange={() => handleToggleCheckbox()}/>
			<span className={isChecked ? 'line-through' : ''}>name: {name}</span>
			<a className="cursor-pointer" onClick={() => handleDeleteTodo()}>
				<TrashIcon/>
			</a>
		</li>
	);
};

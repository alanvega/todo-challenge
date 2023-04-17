import {TrashIcon} from '@/icons/trash';
import {TODO_DELETE_PATH, TODO_MARK_DONE_PATH} from '@/utils/url-paths';
import {useState} from 'react';
import {MarkDoneReq} from '@/interfaces/markDoneReq';
import {useFetchAndReloadData} from '@/components/customHooks/useFetchAndReloadData';

interface TodoItemInterface {
	id: string;
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
		<li className="flex p-2 pl-3 items-center justify-between w-96 border border-gray-200 rounded dark:border-gray-700">
			<input type="checkbox"
			       className="w-7 h-7 p-3 bg-white border border-gray-600 appearance-none rounded-full checked:bg-gray-700 checked:dark:bg-fuchsia-950 dark:bg-gray-700 dark:border-gray-600"
			       defaultChecked={isChecked}
			       onChange={() => handleToggleCheckbox()}/>
			<div className="truncate">
				<span className={`block flex-1 truncate border-0 py-1.5 pl-4 text-gray-700 dark:bg-transparent ${isChecked ? 'line-through dark:text-gray-500' : 'dark:text-gray-300'}`}
				>{name}</span>
			</div>
			<a className="cursor-pointer pr-2 text-gray-400" onClick={() => handleDeleteTodo()}>
				<TrashIcon/>
			</a>
		</li>
	);
};

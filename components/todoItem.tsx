import {useState, MouseEvent} from 'react';
import {TrashIcon} from '@/icons/trash';
import {TODO_DELETE_PATH, TODO_MARK_DONE_PATH} from '@/utils/url-paths';
import {MarkDoneReq} from '@/interfaces/markDoneReq';
import {useFetchAndReloadData} from '@/components/customHooks/useFetchAndReloadData';
import {CustomCheck} from '@/components/customCheck';

interface TodoItemInterface {
	id: string;
	isDone: boolean;
	name: string;
}

export const TodoItem = ({id, isDone, name}: TodoItemInterface) => {
	const {fetchAndReloadData} = useFetchAndReloadData();

	const [isChecked, setIsChecked] = useState(isDone);

	const handleToggleCheckbox = async () => {
		const markDoneReq: MarkDoneReq = {id, isDone: !isChecked};

		// Make a post to mark-done api
		await fetchAndReloadData(TODO_MARK_DONE_PATH,
			'POST',
			JSON.stringify(markDoneReq))
		.then(() => setIsChecked(!isChecked));

		console.log('Marked todo as done');
	};

	const handleDeleteTodo = async (event: MouseEvent<HTMLAnchorElement>) => {
		event.preventDefault();
		// Make a delete to delete todo api
		await fetchAndReloadData(TODO_DELETE_PATH + id, 'DELETE');
		console.log('Deleted todo', id);
	};

	return (
		<label className="flex p-2 pl-3 cursor-pointer items-center justify-between border border-gray-200 rounded dark:border-gray-700 bg-white dark:bg-slate-800">
			<div className="flex-none">
				<CustomCheck isChecked={isChecked} onChange={handleToggleCheckbox}/>
			</div>
			<div className="truncate flex-auto">
			<span className={`block flex-1 truncate border-0 py-1.5 pl-4 text-gray-700 hover:line-through dark:bg-transparent ${isChecked ? 'line-through dark:text-gray-500' : 'dark:text-gray-300'}`}>
				{name}
			</span>
			</div>
			<a className="cursor-pointer pr-2 text-gray-400" onClick={(event) => handleDeleteTodo(event)}>
				<TrashIcon/>
			</a>
		</label>
	);
};

import {TODO_CLEAR_DONE_PATH} from '@/utils/url-paths';
import {useFetchAndReloadData} from '@/components/useFetchAndReloadData';
import {useContext} from 'react';
import TodoListContext from '@/components/contexts/todoListContext';

export const Filters = () => {
	const {reloadTodoList} = useContext(TodoListContext);

	const {fetchAndReloadData} = useFetchAndReloadData();

	const clearCompleted = async () => {
		// Make a delete request to clear-done
		await fetchAndReloadData(TODO_CLEAR_DONE_PATH, 'DELETE');
		console.log('clear completed');
	};

	return (
		<div className="flex space-x-3 justify-between text-sm text-gray-600 dark:text-white">
			<div>
				<span>2 remaining</span>
			</div>
			<div className="flex space-x-1">
				<a className="cursor-pointer" onClick={() => reloadTodoList()}>All</a>
				<a className="cursor-pointer" onClick={() => reloadTodoList('ACTIVE')}>Active</a>
				<a className="cursor-pointer" onClick={() => reloadTodoList('COMPLETED')}>Completed</a>
			</div>
			<div>
				<a className="cursor-pointer" onClick={() => clearCompleted()}>Clear Completed</a>
			</div>
		</div>
	);
};

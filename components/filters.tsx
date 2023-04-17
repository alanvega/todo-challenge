import {TODO_CLEAR_DONE_PATH} from '@/utils/url-paths';
import {useFetchAndReloadData} from '@/components/customHooks/useFetchAndReloadData';
import {useContext, useState} from 'react';
import TodoListContext from '@/components/contexts/todoListContext';
import {TodoListType} from '@/interfaces/todoListType';

export const Filters = () => {
	const {todoList, reloadTodoList} = useContext(TodoListContext);

	const [filter, setFilter] = useState<TodoListType>('ALL')

	const {fetchAndReloadData} = useFetchAndReloadData();

	const clearCompleted = async () => {
		// Make a delete request to clear-done
		await fetchAndReloadData(TODO_CLEAR_DONE_PATH, 'DELETE');
		console.log('clear completed');
	};

	const getRemaining = () => {
		// This could be resolved on the server side
		return todoList.filter((todo) => !todo.isDone).length;
	};

	function getReloadTodoList(type: TodoListType = 'ALL') {
		setFilter(type);
		reloadTodoList(type);
	}

	return (
		<div className="flex p-3 items-center justify-between max-w-sm border border-gray-200 rounded dark:border-gray-700 text-xs text-gray-600 dark:text-gray-500">
			<div>
				<span>{getRemaining()} remaining</span>
			</div>
			<div className="flex space-x-1">
				<a className={`cursor-pointer p-1 ${filter === 'ALL'? 'font-bold dark:font-normal dark:text-gray-200': ''}`} onClick={() => getReloadTodoList()}>All</a>
				<a className={`cursor-pointer p-1 ${filter === 'ACTIVE'? 'font-bold dark:font-normal dark:text-gray-200': ''}`} onClick={() => getReloadTodoList('ACTIVE')}>Active</a>
				<a className={`cursor-pointer p-1 ${filter === 'COMPLETED'? 'font-bold dark:font-normal dark:text-gray-200': ''}`} onClick={() => getReloadTodoList('COMPLETED')}>Completed</a>
			</div>
			<div>
				<a className="cursor-pointer" onClick={() => clearCompleted()}>Clear Completed</a>
			</div>
		</div>
	);
};

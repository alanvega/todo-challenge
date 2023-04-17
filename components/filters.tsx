import {TODO_CLEAR_DONE_PATH} from '@/utils/url-paths';
import {useFetchAndReloadData} from '@/components/customHooks/useFetchAndReloadData';
import {useContext, useState} from 'react';
import TodoListContext from '@/components/contexts/todoListContext';
import {TodoListType} from '@/types/todoListType';
import {Todo} from '@/interfaces/todo';

export const Filters = () => {
	const {todoList, reloadTodoList} = useContext(TodoListContext);

	const [filter, setFilter] = useState<TodoListType>('ALL')

	const {fetchAndReloadData} = useFetchAndReloadData();

	const clearCompleted = async () => {
		// Make a delete request to clear-done
		await fetchAndReloadData(TODO_CLEAR_DONE_PATH, 'DELETE');
		console.log('clear completed');
	};

	const countRemaining = () => {
		// This could be resolved on the server side
		return todoList.filter((todo: Todo) => !todo.isDone).length;
	};

	function getReloadTodoList(type: TodoListType = 'ALL') {
		setFilter(type);
		reloadTodoList(type);
	}

	const typeFilter = (type: TodoListType) =>
		<a className={`cursor-pointer p-1 capitalize ${filter === type ? 'font-bold dark:font-normal dark:text-gray-200' : ''}`}
		   onClick={() => getReloadTodoList(type)}>{type.toLowerCase()}
		</a>;

	return (
		<div className="flex p-3 w-96 items-center justify-between max-w-sm border border-gray-200 rounded dark:border-gray-700 text-xs text-gray-600 dark:text-gray-500">
			<div>
				<span>{countRemaining()} remaining</span>
			</div>
			<div className="flex space-x-1">
				{typeFilter('ALL')}
				{typeFilter('ACTIVE')}
				{typeFilter('COMPLETED')}
			</div>
			<div>
				<a className="cursor-pointer" onClick={() => clearCompleted()}>Clear Completed</a>
			</div>
		</div>
	);
};

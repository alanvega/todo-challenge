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

	function filteredTodoList(type: TodoListType = 'ALL') {
		setFilter(type);
		reloadTodoList(type);
	}

	const typeFilter = (type: TodoListType, index: number) =>
		<a key={`${type}-${index}`} className={`cursor-pointer p-1 capitalize ${filter === type ? 'font-bold dark:font-normal dark:text-gray-200' : ''}`}
		   onClick={() => filteredTodoList(type)}>{type.toLowerCase()}
		</a>;

	return (
		<div className="flex p-2 sm:p-3 items-center justify-between border border-gray-200 rounded dark:border-gray-700 text-xs text-gray-600 dark:text-gray-500 dark:bg-slate-800">
			<div className="flex flex-col sm:flex-row items-center w-1/4">
				<span className="sm:pr-1">{countRemaining()}</span>
				<span>remaining</span>
			</div>
			<div className="flex w-full justify-center space-x-1">
				{ ['ALL', 'ACTIVE', 'COMPLETED'].map((type, index) => typeFilter(type as TodoListType, index))}
			</div>
			<div className="text-center sm:w-2/5">
				<a className="cursor-pointer" onClick={() => clearCompleted()}>Clear Completed</a>
			</div>
		</div>
	);
};

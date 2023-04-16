import {TODO_CLEAR_DONE_PATH} from '@/utils/url-paths';
import {useFetchAndReloadData} from '@/components/useFetchAndReloadData';
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
		<div className="flex space-x-3 justify-between text-sm text-gray-600 dark:text-white">
			<div>
				<span>{getRemaining()} remaining</span>
			</div>
			<div className="flex space-x-1">
				<a className={`cursor-pointer ${filter === 'ALL'? 'font-bold': ''}`} onClick={() => getReloadTodoList()}>All</a>
				<a className={`cursor-pointer ${filter === 'ACTIVE'? 'font-bold': ''}`} onClick={() => getReloadTodoList('ACTIVE')}>Active</a>
				<a className={`cursor-pointer ${filter === 'COMPLETED'? 'font-bold': ''}`} onClick={() => getReloadTodoList('COMPLETED')}>Completed</a>
			</div>
			<div>
				<a className="cursor-pointer" onClick={() => clearCompleted()}>Clear Completed</a>
			</div>
		</div>
	);
};

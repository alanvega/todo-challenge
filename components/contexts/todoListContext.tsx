import React, {createContext, useState} from 'react';
import useSWR from 'swr';
import {fetcher} from '@/utils/swr-fetcher';
import {Todo} from '@/interfaces/todo';
import {TODO_LIST_PATH} from '@/utils/url-paths';
import {TodoListType} from '@/types/todoListType';
import {ResultContextType} from '@/types/resultContextType';

const TodoListContext = createContext<ResultContextType>({
	todoList: [],
	reloadTodoList: (listType) => {}
});

function TodoListProvider({children}: { children: React.ReactNode }) {

	const [queryListType, setQueryListType] = useState<TodoListType>('ALL');

	const {
		data = [],
		mutate
	} = useSWR<Todo[]>(`${TODO_LIST_PATH}${queryListType ? '?type=' + queryListType : ''}`, fetcher, {
		revalidateOnMount: true,
		revalidateOnFocus: false
	})

	const reloadTodoList = async (listType: TodoListType = 'ALL') => {
		console.log('reload data with query: ', listType);
		setQueryListType(listType);
		await mutate(); // this will trigger a manual revalidation on todo list
	};

	const contextValue: ResultContextType = {
		todoList: data,
		reloadTodoList
	};

	return (
		<TodoListContext.Provider value={contextValue}>
			{children}
		</TodoListContext.Provider>
	);
}

export default TodoListContext;
export {TodoListProvider};

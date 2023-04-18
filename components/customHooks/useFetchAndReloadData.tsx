import React, {useCallback, useContext} from 'react';
import TodoListContext from '@/components/contexts/todoListContext';

export function useFetchAndReloadData() {
	const {reloadTodoList} = useContext(TodoListContext)

	const fetchAndReloadData = useCallback(async (path: string, methodType: string, body?: string) => {
		try {
			const response = await fetch(path, {
				method: methodType,
				body: body
			});
			await response;
			reloadTodoList();
		} catch (error) {
			console.error(error);
		}
	}, []);

	return {fetchAndReloadData}
}

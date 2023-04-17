import React, {useCallback, useContext, useState} from 'react';
import TodoListContext from '@/components/contexts/todoListContext';

export function useFetchAndReloadData<T>() {
	const {reloadTodoList} = useContext(TodoListContext)

	const [data, setData] = useState<T>();

	const fetchAndReloadData = useCallback(async (path: string, methodType: string, body?: string) => {
		try {
			const response = await fetch(path, {
				method: methodType,
				body: body
			});
			const data = await response.json();
			setData(data);
			reloadTodoList();
		} catch (error) {
			console.error(error);
		}
	}, []);

	return {fetchAndReloadData, data}
}

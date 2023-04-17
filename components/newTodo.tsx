import {TODO_ADD_PATH} from '@/utils/url-paths';
import {ChangeEvent, FormEvent, useState} from 'react';
import {AddReq} from '@/interfaces/addReq';
import {useFetchAndReloadData} from '@/components/customHooks/useFetchAndReloadData';

export const NewTodo = () => {
	const defaultAddReq: AddReq = {name: '', isDone: false};

	const {fetchAndReloadData} = useFetchAndReloadData();

	const [addReq, setAddReq] = useState<AddReq>(defaultAddReq)

	const handleNewTodo = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault(); // Prevent page reload

		// Make a post to add api with new todo
		await fetchAndReloadData(TODO_ADD_PATH, 'POST', JSON.stringify(addReq));
		console.log('New todo created');
		setAddReq(defaultAddReq);
	};

	const handleChangeActive = (event: ChangeEvent<HTMLInputElement>) => {
		setAddReq({...addReq, isDone: event.target.checked});
	};

	const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
		setAddReq({...addReq, name: event.target.value});
	};

	return (
		<form className="flex items-center p-2 pl-4 border border-gray-200 rounded dark:border-gray-700 dark:bg-gray-800"
		      onSubmit={handleNewTodo}>
			<input type="checkbox"
			       className="w-7 h-7 bg-white border border-gray-600 appearance-none rounded-full checked:bg-gray-700 checked:dark:bg-fuchsia-950 dark:bg-gray-700 dark:border-gray-600"
			       checked={addReq.isDone}
			       onChange={handleChangeActive}/>
			<input type="text"
			       className="block flex-1 border-0 py-1.5 pl-4 text-gray-700 placeholder:text-gray-500 dark:bg-transparent dark:text-gray-300"
			       placeholder="Create a new todo"
			       value={addReq.name}
			       onChange={handleChangeName}/>
		</form>
	);
};

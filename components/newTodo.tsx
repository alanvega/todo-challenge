import {ChangeEvent, FormEvent, useState} from 'react';
import {TODO_ADD_PATH} from '@/utils/url-paths';
import {AddReq} from '@/interfaces/addReq';
import {useFetchAndReloadData} from '@/components/customHooks/useFetchAndReloadData';
import {CustomCheck} from '@/components/customCheck';

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
		<form className="flex items-center p-2 pl-4 border border-gray-200 rounded dark:border-gray-700 dark:bg-slate-800"
		      onSubmit={handleNewTodo}>
			<CustomCheck isChecked={addReq.isDone} onChange={handleChangeActive}/>
			<input type="text"
			       className="block flex-1 border-0 py-1.5 ml-3 mr-2 p-1 text-gray-700 placeholder:text-gray-500 dark:bg-transparent dark:text-gray-300"
			       placeholder="Create a new todo"
			       value={addReq.name}
			       onChange={handleChangeName}/>
		</form>
	);
};

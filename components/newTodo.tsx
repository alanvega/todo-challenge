import {TODO_ADD_PATH} from '@/utils/url-paths';
import {ChangeEvent, FormEvent, useState} from 'react';
import {AddReq} from '@/interfaces/addReq';
import {useFetchAndReloadData} from '@/components/useFetchAndReloadData';

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
		<form className="flex space-x-2" onSubmit={handleNewTodo}>
			<input type="checkbox" checked={addReq.isDone} onChange={handleChangeActive} />
			<input type="text" placeholder="Create a new todo" value={addReq.name} onChange={handleChangeName} />
		</form>
	);
};

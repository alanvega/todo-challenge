import {useContext} from 'react';
import {TodoItem} from '@/components/todoItem';
import TodoListContext from '@/components/contexts/todoListContext';

export const TodoList = () => {
	const {todoList} = useContext(TodoListContext);

	return (
		<div>
			<ul>
				{todoList?.map(
					({id, name, isDone}) => (
						<TodoItem key={`todo-${id}`}
						          id={id}
						          isDone={isDone}
						          name={name}
						/>
					)
				)}
			</ul>
		</div>
	);
};

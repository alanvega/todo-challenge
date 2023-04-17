import {NewTodo} from '@/components/newTodo';
import {TodoList} from '@/components/todoList';
import {Filters} from '@/components/filters';
import {TodoListProvider} from '@/components/contexts/todoListContext';

export const TodoContainer = () =>
	(
		<TodoListProvider>
			<div className="space-y-8">
				<NewTodo/>
			</div>
			<div className="space-y-0.5">
				<TodoList/>
				<Filters/>
			</div>
		</TodoListProvider>
	);

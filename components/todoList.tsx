import {useContext, DragEvent, useRef, useState} from 'react';
import {TodoItem} from '@/components/todoItem';
import TodoListContext from '@/components/contexts/todoListContext';
import {useFetchAndReloadData} from '@/components/customHooks/useFetchAndReloadData';
import {TODO_CHANGE_ORDER_PATH} from '@/utils/url-paths';
import {MarkDoneReq} from '@/interfaces/markDoneReq';
import {ChangeOrderReq} from '@/interfaces/changeOrderReq';

export const TodoList = () => {
	const {todoList} = useContext(TodoListContext);

	const {fetchAndReloadData} = useFetchAndReloadData();

	const [movedItemId, setMovedItemId] = useState<string>('');

	const draggedItem = useRef<number>();
	const draggedEnterItem = useRef<number>();

	const handleDragStart = (id: string, index: number) => {
		setMovedItemId(id);
		draggedItem.current = index;
	};

	const handleDragEnter = (index: number) => {
		draggedEnterItem.current = index;
	};

	const handleDragEnd = async () => {
		if (draggedItem.current !== draggedEnterItem.current && movedItemId) {
			const changeOrderReq: ChangeOrderReq = {id: movedItemId, order: draggedEnterItem.current || 0};
			console.log(`Moving item with id: ${movedItemId} from order: `, draggedItem.current, ", to: ", draggedEnterItem.current);
			await fetchAndReloadData(TODO_CHANGE_ORDER_PATH, 'POST', JSON.stringify(changeOrderReq));
		}

		draggedItem.current = undefined;
		draggedEnterItem.current = undefined;
	}

	return (
		<div>
			<ul>
				{todoList?.map(
					({id, name, isDone}, index) => (
						<li key={`todo-item-${id}`}
						    draggable
						    onDragStart={() => handleDragStart(id, index)}
						    onDragEnter={() =>  handleDragEnter(index)}
						    onDragEnd={handleDragEnd}
						>
							<TodoItem id={id}
							          isDone={isDone}
							          name={name}
							/>
						</li>

					)
				)}
			</ul>
		</div>
	);
};

import {mongodbCollection} from '@/lib/mongo';

export const reorderTodoList = async () => {
	console.log('Re ordering items...');
	const dbCollection = await mongodbCollection()
	const listToReOrder = await dbCollection.find({}).toArray();
	for (const item of listToReOrder) {
		const index = listToReOrder.indexOf(item);
		await dbCollection.updateOne({_id: item._id}, {$set: {order: index}});
	}
	console.log('Re order items completed');
};

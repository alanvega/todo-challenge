import type {NextApiRequest, NextApiResponse} from 'next'
import {TODO_CHANGE_ORDER_PATH} from '@/utils/url-paths';
import {ObjectId} from 'bson';
import {mongodbCollection} from '@/lib/mongo';
import {ChangeOrderReq} from '@/interfaces/changeOrderReq';
import {Todo} from '@/interfaces/todo';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'POST') {
		// handle the DELETE request
		const changeOrderReq: ChangeOrderReq = JSON.parse(req.body);

		console.log(`${TODO_CHANGE_ORDER_PATH} POST request received with body`, changeOrderReq);

		const {order, id} = changeOrderReq;

		const dbCollection = await mongodbCollection();

		// First I find the item to be moved to get the older order
		const itemToChange = await dbCollection.findOne<Todo>({_id: new ObjectId(id)});

		// Then I change the order of the item to -1, so that it is not included in the next query
		await dbCollection.updateOne({_id: new ObjectId(id)}, {$set: {order: -1}});

		if(itemToChange?.order === undefined) { // If the item or order is not found returns an error
			res.status(400).json({error: 'Item not found'});
		} else {
			 // If the item is already in the correct position, returns an empty response
			if (itemToChange?.order == order) return res.status(200).json({});

			// If the new order is greater than the old order, I change the order of all items with order > oldOrder and order <= newOrder,
			// else I change the order of all items with order < oldOrder and order >= newOrder
			const isGreater =  (itemToChange?.order < order);
			const orderFun = isGreater ? {$gt: itemToChange?.order, $lte: order} : {$lt: itemToChange?.order, $gte: order};
			const updateFun = (itemOrder: number) => isGreater ? {$set: {order: itemOrder - 1}} : {$set: {order: itemOrder + 1}}

			const listItems = await dbCollection.find({order: orderFun}).toArray();
			listItems.forEach(item => dbCollection.updateOne({_id: item._id}, updateFun(item.order)))
		}

		// Finally I change the order of the item to the new order
		await dbCollection.updateOne({_id: new ObjectId(id)}, {$set: {order: order}});

		console.log("Changed todo item with id: {} and order: {}", id, order);
		res.status(200).json({});
	} else {
		// handle other HTTP methods
		res.status(400).json({error: 'Only POST requests allowed'});
	}
}

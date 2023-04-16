import {MongoClient} from 'mongodb';

// this should be moved to a config file on a real app
const uri: string = "mongodb://localhost:27017/todos";

const client = new MongoClient(uri);

const mongodbCollection = async () => {
	await client.connect();
	const db = client.db('todos');
	return db.collection('todo_list');
};

export default mongodbCollection;

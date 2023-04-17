import {MongoClient} from 'mongodb';

// const uri: string = "mongodb://localhost:27017/todos"; //only for local

// this should be moved to a config file on a real app
const user = 'user';
const password = 'SYe2OKhUZS1qOBcd';
const uri: string = `mongodb+srv://${user}:${password}@cluster0.mube2gl.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri);

const mongodbCollection = async () => {
	await client.connect();
	const db = client.db('todos');
	return db.collection('todo_list');
};

export default mongodbCollection;

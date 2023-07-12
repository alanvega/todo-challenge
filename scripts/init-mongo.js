// This script is used to initialize the mongo database
// @ts-nocheck
// noinspection JSUnresolvedReference
/* eslint-disable */
// Create DB and collection
db = new Mongo().getDB("todos");
db.createCollection("todo_list", { capped: false })

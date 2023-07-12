# Todo App
I used Next.js, React, Typescript, TailwindCSS, MongoDB, and Docker (local) to build this app,
and Vercel to deploy it.

This was my first time using Next.js and TailwindCSS before, so it was a good opportunity to learn it.
Both have good documentation and community, so it was easy to learn.

Also, I had never used Vercel before, but it was very easy to deploy a Next.js app.

I had only used MongoDB before for personal projects, I think for this case it was a good choice (but maybe there are better options), because it's fast and easy to implement.

### Improvements ideas
If I had more time I would improve this app with:
- Loaders (because it's a free mongo, and sometimes it takes longer than expected to make a request to it) when:
  - Adding a new Todo (or skeleton)
  - Deleting a Todo
  - Marking a Todo as done (or active)
  - Filtering Todos
- Animations
- Error handling
- Edit a Todo
- Some tests


## Notes

## List updates 
I am doing an update to the server list every time the user makes a change to the list, but I think it's not the best way to do it.

Maybe it's a better user experience to use the cache that provides the `useSWR` hook, but I wanted to have the same list on the server and the client, so I didn't use it.

### Drag and drop
I made the drag and drop to post the new order and the id only, and then the server re-order the list. 

The easiest way to do this it's to send all the list with the correct order from the client side, but if the list is too big, it could be a problem.

I don't know if this it's the best way either because the server has to query the mongo lots of times, but I prefer to do all the work on the server.


## Run app in development mode

### Install dependencies
    
```bash
# if you have nvm installed run this command, else use node v18
nvm use # this use node version specified in .nvmrc

# install dependencies
npm install
```

### Start docker with mongodb (skip to use mongodb from atlas)
_Note: if you want to use mongodb from atlas, you can skip this step and use the default connection on ./lib/mongo.ts,
else you should edit the connection url on that file to use `mongodb://localhost:27017/todos`:_
```bash
# Make sure you have installed Docker on your system
# https://docs.docker.com/get-docker/
# start docker with mongodb with this command (it creates a docker container with mongodb on port 27017)
./build-and-run-docker.sh
```

### Run dev script
```bash
# run this command to run on develop mode
npm run dev
```

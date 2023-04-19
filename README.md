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

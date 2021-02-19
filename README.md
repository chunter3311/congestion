# Congestion
*By Cole Hunter - [Visit Congestion](https://congestion-puzzle.herokuapp.com/)*

**Table of Contents**
* [Congestion at a Glance](#congestion-at-a-glance)
* [Application Architecture & Technologies Used](#application-architecture) 
* [Frontend Overview](#frontend-overview)
* [Backend Overview](#backend-overview)
* [Conclusion & Next Steps](#conclusion-and-next-steps)

## Congestion at a Glance
Congestion is a fullstack app based on the Windows puzzle game Blocked In. Users can create their own puzzles and save them to the database. Puzzle layouts are read from the database and rendered with React components. The state of each puzzle game is managed by classes.

##### Gameplay
![Congestion gameplay](/readme-resources/congestion-demo-1.gif)

##### Puzzle builder
![Congestion puzzle builder](/readme-resources/congestion-demo-2.gif)

## Application Architecture
The majority of the application logic occurs within front end's [Redux](https://redux.js.org/) store. Congestion uses plain CSS for styling components. 

The backend serves the frontend, responds to frontend requests, and fetches data from the PostgreSQL database.

![Congestion application architecture](/readme-resources/congestion-demo-3.jpg)

## Frontend Overview
Congestion is very frontend heavy application. Below are the frontend technologies that make this application possible. 

### Frontend Technologies Used:
#### React
At its core, Congestion is a React application. 

#### Redux
[Redux](https://redux.js.org/) and the [react-redux](https://react-redux.js.org/) library were used to manage application state and make fetch requests to the server for data. 

All puzzle information is fetched on page load and kept in the Redux store. While this expensive operation lengthens the initial load time, it also allows for a snappy experience after that load.

Redux also allows for a lot of extendibility if new features are to be implemented (additional feature wish-list discussed in [conclusion](#conclusion-and-next-steps)). 

#### CSS
CSS...

##### Puzzle gameplay
```jsx
```

##### Puzzle builder
```jsx
```

## Backend Overview
Congestion uses an Express server with PostgreSQL as the database. Compared to the frontend, the backend of Congestion is fairly simple, with the server sending the front end to the client, receiving requests, and sending data to the frontend. Below are the backend technologies used with some notes regarding their implementation. 

### Backend Technologies Used
#### ExpressJS
[Express](https://expressjs.com/) was the natural choice for Congestion's server-side framework. The minimalism of Express lent itself to the very light-weight responsibilities of Congestion's server. The server is just a couple of routes and a connection to the database, with a few utilities to facilitate this. 

#### PostgreSQL
[PostgreSQL](https://www.mongodb.com/) was perfect for this project because ...  

## Conclusion and Next Steps
Conclusion...

**Next Steps:** Next steps...

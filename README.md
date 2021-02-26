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

## Frontend Overview
Congestion is very frontend heavy application. Below are the frontend technologies that make this application possible. 

### Frontend Technologies Used:
#### React
At its core, Congestion is a React application. React components were a natural choice for rendering each puzzle piece, as they allowed changes to their position without a need for reloading the page.

#### Redux
[Redux](https://redux.js.org/) and the [react-redux](https://react-redux.js.org/) library were used to manage application state and make fetch requests to the server for data. 

All puzzle information is fetched on page load and kept in the Redux store. While this expensive operation lengthens the initial load time, it also allows for a snappy experience after that load.

Redux also allows for a lot of extendibility if new features are to be implemented.

#### JavaScript Classes
Congestion manages the state of a puzzle through use of two classes, Game and Car.

```jsx
export class Car {
    constructor(row, column, id) {
        this.id = id;
        this.initialCoordinates = [[row, column]];
        this.start = null;
        this.end = null;
        this.orientation = null;
        this.length = 1;
        this.row = null;
        this.column = null;
        this.moveOptions = []
    }

    add(row, column) {
        this.initialCoordinates.push([row, column]);
        this.length++;
        return;
    }
}

export class Game {
    constructor(layout) {
        this.isSolved = false;
        this.layout = layout;
        this.ids = new Set();
        this.originalLayout = [[], [], [], [], [], []];
        this.cars = [];
        this.validMoves = {};
        this.previousCarIndex = -1;
        this.currentCarIndex = -1;
        this.moves = 0;
        this.movesList = [];
        this.solutionMovesList = [];
        this.initialize(this.layout);
    }

    initialize(layout) {
        for (let row = 0; row < 6; row++) {
            for (let column = 0; column < 6; column++) {
                this.originalLayout[row].push(layout[row][column]);
                if (layout[row][column] === 0) continue;
                let id = layout[row][column];
                if (this.ids.has(id)) {
                    this.cars[this.getCarIndex(id)].add(row, column);
                }
                else {
                    this.ids.add(id);
                    this.cars.push(new Car(row, column, id));
                }
            }
        }
        this.cars.forEach(car => {
            if (car.initialCoordinates[0][0] === car.initialCoordinates[1][0]) {
                car.orientation = 'h';
                car.row = car.initialCoordinates[0][0];
            }
            else {
                car.orientation = 'v';
                car.column = car.initialCoordinates[0][1];
            }
            this.setCarEndPoints(car);
        });
        return;
    }

    getCarIndex(id) {
        const carId = parseInt(id);
        for (let i = 0; i < this.cars.length; i++) {
            if (this.cars[i].id === carId) return i;
        }
    }

    setCarEndPoints(car) {
        if (car.orientation === 'h') {
            car.start = car.initialCoordinates[0][1];
            car.end = car.initialCoordinates[car.length - 1][1];
        }
        else {
            car.start = car.initialCoordinates[0][0];
            car.end = car.initialCoordinates[car.length - 1][0];
        }
        return;
    }

    positiveMove(car) {
        let unitsMoved = 0;
        if (car.orientation === 'v') {
            for (let row = car.end + 1; row <= 5 && this.layout[row][car.column] === 0; row++) {
                unitsMoved++;
                this.layout[row][car.column] = car.id;
                this.layout[row - car.length][car.column] = 0;
            }
            if (!unitsMoved) return false;
            const oldStart = car.start;
            const oldEnd = car.end;
            car.start += unitsMoved;
            car.end += unitsMoved;
        }
        else if (car.orientation === 'h') {
            for (let column = car.end + 1; column <= 5 && this.layout[car.row][column] === 0; column++) {
                unitsMoved++;
                this.layout[car.row][column] = car.id;
                this.layout[car.row][column - car.length] = 0;
            }
            if (!unitsMoved) return false;
            car.start += unitsMoved;
            car.end += unitsMoved;
            if (car.row === 2 && car.end === 5) {
                car.start += 2;
                car.end += 2;
                this.isSolved = true;
            }
        }
        return true;
    }

    negativeMove(car) {
        let unitsMoved = 0;
        if (car.orientation === 'v') {
            for (let row = car.start - 1; row >= 0 && this.layout[row][car.column] === 0; row--) {
                unitsMoved++;
                this.layout[row][car.column] = car.id;
                this.layout[row + car.length][car.column] = 0;
            }
            if (!unitsMoved) return false;
            car.start -= unitsMoved;
            car.end -= unitsMoved;
        }
        else if (car.orientation === 'h') {
            for (let column = car.start - 1; column >= 0 && this.layout[car.row][column] === 0; column--) {
                unitsMoved++;
                this.layout[car.row][column] = car.id;
                this.layout[car.row][column + car.length] = 0;
            }
            if (!unitsMoved) return false;
            car.start -= unitsMoved;
            car.end -= unitsMoved;
        }
        return true;
    }

    reset() {
        for (let row = 0; row < 6; row++) {
            for (let column = 0; column < 6; column++) {
                this.layout[row][column] = this.originalLayout[row][column];
            }
        }
        this.cars.forEach(car => {
            this.setCarEndPoints(car);
        });

        this.previousCarIndex = -1;
        this.currentCarIndex = -1;
        this.moves = 0;
        this.movesList = [];
        this.isSolved = false;
    }
}
```

#### CSS
Congestion uses pure CSS for styling.

#### HTML
The puzzle builder feature utilizes HTML drag and drop.
```jsx
function Builder() {
    const dispatch = useDispatch();
    const history = useHistory();
    let location = useLocation();
    const user = useSelector(state => state.entities.users[state.session.user_id]);
    const packId = location.state.packId;
    const layout = [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0]
    ];
    const game = new Game(layout);

    const priBlk = "https://i.imgur.com/n07UANE.png";
    const horSBlk = "https://i.imgur.com/AihDIR0.png";
    const horLBlk = "https://i.imgur.com/CG1s8K7.png";
    const vertSBlk = "https://i.imgur.com/3y0Ss2a.png";
    const vertLBlk = "https://i.imgur.com/dQjG5Gz.png";

    const handleDragStart = e => {
        e.target.classList.add(styles.is_being_dragged);
        e.dataTransfer.setData('text/plain', e.target.id);
        e.dataTransfer.dropEffect = 'move';
    }

    const handleDragEnd = e => {
        e.preventDefault();
        e.target.classList.remove(styles.is_being_dragged);
    };

    const handleDragEnter = e => {
        e.preventDefault();
    };

    const handleDragLeave = e => {
        e.preventDefault();
    };

    const handleTrashDragEnter = e => {
        e.preventDefault();
        e.target.classList.remove(styles.trash_closed);
        e.target.classList.add(styles.trash_open);
    };

    const handleTrashDragLeave = e => {
        e.preventDefault();
        e.target.classList.remove(styles.trash_open);
        e.target.classList.add(styles.trash_closed);
    };

    const handleDragOver = e => {
        e.preventDefault();
    };

    const handleBoardDrop = e => {
        const row = parseInt(e.target.id[8]);
        const column = parseInt(e.target.id[7]);
        const id = e.dataTransfer.getData('text/plain');
        const idInt = parseInt(id);
        const carElement = document.getElementById(id);
        carElement.classList.remove(styles.is_being_dragged);
        if (idInt === idInt) {
            const car = game.cars[game.getCarIndex(idInt)];
            if (!game.move(row, column, car)) return;
            updateBoard(idInt - 1, false);
        }
        else {
            if (id === 'priBlk' && !game.addCar(row, column, 2, 'h', priBlk)) return;
            else if (id === 'horSBlk' && !game.addCar(row, column, 2, 'h', horSBlk)) return;
            else if (id === 'horLBlk' && !game.addCar(row, column, 3, 'h', horLBlk)) return;
            else if (id === 'vertSBlk' && !game.addCar(row, column, 2, 'v', vertSBlk)) return;
            else if (id === 'vertLBlk' && !game.addCar(row, column, 3, 'v', vertLBlk)) return;
            updateBoard(game.newCarIndex, true);
        }
    };

    const handleTrashDrop = e => {
        const id = e.dataTransfer.getData('text/plain');
        const idInt = parseInt(id);
        const carElement = document.getElementById(id);

        if (idInt === idInt) {
            game.remove(game.getCarIndex(idInt));
            carElement.classList.add(styles.hide);
        }
        else carElement.classList.remove(styles.is_being_dragged);
        e.target.classList.remove(styles.trash_open);
        e.target.classList.add(styles.trash_closed);
    };

    const updateBoard = (carIndex, isNewCar) => {
        const car = game.cars[carIndex];
        const newVehicleElement = document.getElementById(car.id);
        if (isNewCar) {
            const imageElement = document.getElementById(`image-${car.id}`);
            imageElement.style.backgroundImage = `url(${car.imageUrl})`;
            newVehicleElement.classList.remove(styles.hide);
        }
        const pct = 16.667;
        if (car.orientation === 'h') {
            newVehicleElement.style.top = (car.row * pct) + '%';
            newVehicleElement.style.left = (car.start * pct) + '%';
            newVehicleElement.style.width = (car.length * pct) + '%';
            newVehicleElement.style.height = '16.667%';
        } else if (car.orientation === 'v') {
            newVehicleElement.style.top = (car.start * pct) + '%';
            newVehicleElement.style.left = (car.column * pct) + '%';
            newVehicleElement.style.height = (car.length * pct) + '%';
            newVehicleElement.style.width = '16.667%';
        }
    }

    const initialize = () => {
        const background = document.getElementById('page-background');
        background.classList.remove(globalStyles.background_image_asphalt);
        background.classList.add(globalStyles.background_image_carbon_fiber);

        const dropZones = document.getElementsByClassName(styles.drop_zone);
        Array.from(dropZones).forEach(function (dropZone) {
            dropZone.addEventListener('drop', handleBoardDrop);
            dropZone.addEventListener('dragenter', handleDragEnter);
            dropZone.addEventListener('dragleave', handleDragLeave);
            dropZone.addEventListener('dragover', handleDragOver);
        });

        const priBlkEl = document.getElementById('priBlk');
        const horSBlkEl = document.getElementById('horSBlk');
        const horLBlkEl = document.getElementById('horLBlk');
        const vertSBlkEl = document.getElementById('vertSBlk');
        const vertLBlkEl = document.getElementById('vertLBlk');

        priBlkEl.addEventListener('dragstart', handleDragStart);
        horSBlkEl.addEventListener('dragstart', handleDragStart);
        horLBlkEl.addEventListener('dragstart', handleDragStart);
        vertSBlkEl.addEventListener('dragstart', handleDragStart);
        vertLBlkEl.addEventListener('dragstart', handleDragStart);
        priBlkEl.addEventListener('dragend', handleDragEnd);
        horSBlkEl.addEventListener('dragend', handleDragEnd);
        horLBlkEl.addEventListener('dragend', handleDragEnd);
        vertSBlkEl.addEventListener('dragend', handleDragEnd);
        vertLBlkEl.addEventListener('dragend', handleDragEnd);

        const trashEl = document.getElementById('trash');
        trashEl.addEventListener('drop', handleTrashDrop);
        trashEl.addEventListener('dragenter', handleTrashDragEnter);
        trashEl.addEventListener('dragleave', handleTrashDragLeave);
        trashEl.addEventListener('dragover', handleDragOver);

        priBlkEl.style.backgroundImage = `url(${priBlk})`;
        horSBlkEl.style.backgroundImage = `url(${horSBlk})`;
        horLBlkEl.style.backgroundImage = `url(${horLBlk})`;
        vertSBlkEl.style.backgroundImage = `url(${vertSBlk})`;
        vertLBlkEl.style.backgroundImage = `url(${vertLBlk})`;
    };

    setTimeout(initialize, 0);
    const exitHelp = () => {
        if (showHelp) setShowHelp(false);
    }

    const createPuzzleHandler = async () => {
        history.push('/packs/created');
        const layout = game.getDatabaseLayout();
        console.log(layout);
        dispatch(addUserPuzzle('unavailable', layout, '-1', -1, 0, 0, user.id, packId));
    }

    return (
        <>
            <div onClick={exitHelp} className={styles.board_wrapper}>
                <div className={styles.column_one}>
                    <div className={styles.horizontal_cars}>
                        <div className={styles.car} draggable="true" id='priBlk'></div>
                        <div className={styles.car} draggable="true" id='horSBlk'></div>
                        <div className={styles.car} draggable="true" id='horLBlk'></div>
                    </div>
                    <div className={styles.vertical_cars}>
                        <div className={styles.car} draggable="true" id='vertSBlk'></div>
                        <div className={styles.car} draggable="true" id='vertLBlk'></div>
                    </div>
                </div>
                <div className={styles.column_two}>
                    <div className={styles.board_container}>
                        <div className={styles.row}>
                            <div id="square-00" className={styles.drop_zone}></div>
                            <div id="square-10" className={styles.drop_zone}></div>
                            <div id="square-20" className={styles.drop_zone}></div>
                            <div id="square-30" className={styles.drop_zone}></div>
                            <div id="square-40" className={styles.drop_zone}></div>
                            <div id="square-50" className={styles.drop_zone}></div>
                        </div>
                        <div className={styles.row}>
                            <div id="square-01" className={styles.drop_zone}></div>
                            <div id="square-11" className={styles.drop_zone}></div>
                            <div id="square-21" className={styles.drop_zone}></div>
                            <div id="square-31" className={styles.drop_zone}></div>
                            <div id="square-41" className={styles.drop_zone}></div>
                            <div id="square-51" className={styles.drop_zone}></div>
                        </div>
                        <div className={styles.row}>
                            <div id="square-02" className={styles.drop_zone}></div>
                            <div id="square-12" className={styles.drop_zone}></div>
                            <div id="square-22" className={styles.drop_zone}></div>
                            <div id="square-32" className={styles.drop_zone}></div>
                            <div id="square-42" className={styles.drop_zone}></div>
                            <div id="square-52" className={styles.drop_zone}></div>
                        </div>
                        <div className={styles.row}>
                            <div id="square-03" className={styles.drop_zone}></div>
                            <div id="square-13" className={styles.drop_zone}></div>
                            <div id="square-23" className={styles.drop_zone}></div>
                            <div id="square-33" className={styles.drop_zone}></div>
                            <div id="square-43" className={styles.drop_zone}></div>
                            <div id="square-53" className={styles.drop_zone}></div>
                        </div>
                        <div className={styles.row}>
                            <div id="square-04" className={styles.drop_zone}></div>
                            <div id="square-14" className={styles.drop_zone}></div>
                            <div id="square-24" className={styles.drop_zone}></div>
                            <div id="square-34" className={styles.drop_zone}></div>
                            <div id="square-44" className={styles.drop_zone}></div>
                            <div id="square-54" className={styles.drop_zone}></div>
                        </div>
                        <div className={styles.row}>
                            <div id="square-05" className={styles.drop_zone}></div>
                            <div id="square-15" className={styles.drop_zone}></div>
                            <div id="square-25" className={styles.drop_zone}></div>
                            <div id="square-35" className={styles.drop_zone}></div>
                            <div id="square-45" className={styles.drop_zone}></div>
                            <div id="square-55" className={styles.drop_zone}></div>
                        </div>
                        {showHelp ? <>
                            <Buider_Help_Modal showHelp={showHelp} setShowHelp={setShowHelp} />
                        </> : ""}
                        {game.cars.map((car, i) => {
                            return (
                                <VehicleComponent car={car} game={game} key={`car-${i + 1}`} />
                            )
                        })}
                    </div>
                </div>
                <div className={styles.column_three}>
                    <div className={`${styles.trash} ${styles.trash_closed}`} id='trash'></div>
                    <div className={`${styles.widget_row} ${styles.button_spacing}`}>
                        <a className={packStyles.puzzle_pack_tab} onClick={createPuzzleHandler}>save puzzle</a>
                        <NavLink className={packStyles.puzzle_pack_tab} to={`/packs/created`} activeClassName={styles.active_tab}>discard</NavLink>
                    </div>
                </div>
            </div>
        </>
    );
}
```

## Backend Overview
Congestion uses an Express server with PostgreSQL as the database. Compared to the frontend, the backend of Congestion is fairly simple, with the server sending the front end to the client, receiving requests, and sending data to the frontend. Below are the backend technologies used with some notes regarding their implementation. 

### Backend Technologies Used
#### ExpressJS
[Express](https://expressjs.com/) was the natural choice for Congestion's server-side framework. The minimalism of Express lent itself to the very light-weight responsibilities of Congestion's server. The server is just a couple of routes and a connection to the database, with a few utilities to facilitate this. 

#### PostgreSQL
My system for database management.

## Conclusion and Next Steps
Developing Congestion challenged me to use the foundational skills I've aquired to create something that was both original and complicated. In particular, the gameplay required an inventive coordination of React, classes and CSS.

Moving forward, I have plans to add the following features:
- User accounts that have their own puzzle packs, which can optionally be shared with others
- Full CRUD functionality on puzzles

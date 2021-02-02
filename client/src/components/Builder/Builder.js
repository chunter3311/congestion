import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import globalStyles from '../../styles/global.module.css';
import { Game } from '../../classes/BuilderFunctions';
import VehicleComponent from './VehicleComponent';
import { addUserPuzzle } from '../../store/puzzles';
import Buider_Help_Modal from '../Modals/Builder_Help_Modal';
import { Redirect, Route, Router, Switch, useHistory, useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import styles from '../../styles/builder.module.css';
import boardStyles from '../../styles/board.module.css';
import packStyles from '../../styles/pack.module.css';
import { createBrowserHistory } from 'history';
import Created_Pack_LIST from '../Packs/Created_Pack_LIST';

export const history = createBrowserHistory();


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

    const resetBoard = () => {
        // game.reset();
        // setMoveCount(game.moves);
        // game.cars.forEach(car => {
        //     const carElement = document.getElementById(`${boardId}-${car.id}`);
        //     carElement.classList.add(styles.change_position);
        //     const moveContainer = document.getElementById(`${boardId}-move-container-${car.id}`);

        //     carElement.style.top = (car.orientation === 'h') ? (car.row * pct) + '%' : (car.start * pct) + '%';
        //     carElement.style.left = (car.orientation === 'h') ? (car.start * pct) + '%' : (car.column * pct) + '%';

        //     if (car.orientation === 'v') {
        //         carElement.style.height = (car.length * pct) + '%';
        //     } else {
        //         moveContainer.style.flexDirection = 'row';
        //         carElement.style.width = (car.length * pct) + '%';
        //     }
        // })
    };

    const [showHelp, setShowHelp] = useState(false);
    const toggleHelp = () => {
        if (showHelp) setShowHelp(false);
        else setShowHelp(true);
    }
    const exitHelp = () => {
        if (showHelp) setShowHelp(false);
    }

    const createPuzzleHandler = async () => {
        // history.push('/packs/created');
        history.push(`/play/${user.username}/pack-${packId}`);
        const layout = game.getDatabaseLayout();
        console.log(layout);
        dispatch(addUserPuzzle('unavailable', layout, 'unavailable', -1, 0, 0, user.id, packId));
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
                    <div className={`${styles.widget_row} ${styles.button_spacing}`}>
                        <div onClick={resetBoard} className={boardStyles.reset_button}></div>
                        <div onClick={toggleHelp} className={boardStyles.help_button}></div>
                    </div>
                    <div className={`${styles.trash} ${styles.trash_closed}`} id='trash'></div>
                    <div className={`${styles.widget_row} ${styles.button_spacing}`}>
                        <button onClick={createPuzzleHandler}>save game</button>
                        <NavLink className={packStyles.puzzle_pack_tab} to="/packs/created" activeClassName={styles.active_tab}>discard</NavLink>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Builder;
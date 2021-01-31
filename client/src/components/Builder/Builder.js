import React, { useState } from 'react';
import styles from '../../styles/builder.module.css';
import globalStyles from '../../styles/global.module.css';
import { Puzzle } from '../../classes/BuilderFunctions';
import VehicleComponent from './VehicleComponent';
import { addUserPuzzle } from '../../store/puzzles';
import { useDispatch, useSelector, connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
library.add(faTrash);



function Builder() {
    const layout = [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0]
    ];
    const puzzle = new Puzzle(layout);

    const priBlk = "https://i.imgur.com/n07UANE.png";
    const horSBlk = "https://i.imgur.com/AihDIR0.png";
    const horLBlk = "https://i.imgur.com/CG1s8K7.png";
    const vertSBlk = "https://i.imgur.com/3y0Ss2a.png";
    const vertLBlk = "https://i.imgur.com/dQjG5Gz.png";
    // const trashCan = "https://i.imgur.com/sZVs9MY.png";

    const handleDragStart = e => {
        e.target.classList.add(styles.is_being_dragged);
        e.dataTransfer.setData('text/plain', e.target.id);
        e.dataTransfer.dropEffect = 'move';
    }

    const handleDragEnter = e => {
        e.preventDefault();
        // e.target.classList.add('test');
    };

    const handleTrashDragEnter = e => {
        e.preventDefault();
        console.log(e.target);
        e.target.classList.remove(styles.trash_closed);
        e.target.classList.add(styles.trash_open);
    };

    const handleDragLeave = e => {
        // e.target.classList.remove(styles.is_being_dragged);
        // e.target.classList.remove('is_active_drop_zone');
    };

    const handleTrashDragLeave = e => {
        e.preventDefault();
        console.log(e.target);
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
        const vehicleElement = document.getElementById(id);
        vehicleElement.classList.remove(styles.is_being_dragged);
        const pct = 16.667;
        if (idInt === idInt) {
            const vehicleIndex = idInt - 1;
            const vehicle = puzzle.vehicles[vehicleIndex];
            puzzle.move(row, column, vehicle);
            if (vehicle.orientation === 'h') {
                vehicleElement.style.top = (vehicle.row * pct) + '%';
                vehicleElement.style.left = (vehicle.start * pct) + '%';
                vehicleElement.style.width = (vehicle.length * pct) + '%';
            } else if (vehicle.orientation === 'v') {
                vehicleElement.style.top = (vehicle.start * pct) + '%';
                vehicleElement.style.left = (vehicle.column * pct) + '%';
                vehicleElement.style.height = (vehicle.length * pct) + '%';
            }
        }
        else {
            if (id === 'priBlk') puzzle.addVehicle(row, column, 2, 'h', priBlk);
            else if (id === 'horSBlk') puzzle.addVehicle(row, column, 2, 'h', horSBlk);
            else if (id === 'horLBlk') puzzle.addVehicle(row, column, 3, 'h', horLBlk);
            else if (id === 'vertSBlk') puzzle.addVehicle(row, column, 2, 'v', vertSBlk);
            else if (id === 'vertLBlk') puzzle.addVehicle(row, column, 3, 'v', vertLBlk);
            updateBoard();
        }
    };

    const handleTrashDrop = e => {
        const id = e.dataTransfer.getData('text/plain');
        const idInt = parseInt(id);
        const carElement = document.getElementById(id);

        if (idInt === idInt) {
            const carIndex = idInt - 1;
            puzzle.remove(carIndex);
            carElement.remove();
        }
        else carElement.classList.remove(styles.is_being_dragged);
        e.target.classList.remove(styles.trash_open);
        e.target.classList.add(styles.trash_closed);
    };

    const updateBoard = () => {
        puzzle.vehicles.forEach((vehicle, i) => {
            const pct = 16.667;
            if (vehicle.length > 0) {
                const imageElement = document.getElementById(`image-${vehicle.id}`);
                imageElement.style.backgroundImage = `url(${vehicle.imageUrl})`;
                const newVehicleElement = document.getElementById(vehicle.id);
                newVehicleElement.classList.remove(styles.hide);
                if (vehicle.orientation === 'h') {
                    newVehicleElement.style.top = (vehicle.row * pct) + '%';
                    newVehicleElement.style.left = (vehicle.start * pct) + '%';
                    newVehicleElement.style.width = (vehicle.length * pct) + '%';
                } else if (vehicle.orientation === 'v') {
                    newVehicleElement.style.top = (vehicle.start * pct) + '%';
                    newVehicleElement.style.left = (vehicle.column * pct) + '%';
                    newVehicleElement.style.height = (vehicle.length * pct) + '%';
                }
            }
        });
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
        // trashEl.style.backgroundImage = `url(${trashCan})`;
    };

    setTimeout(initialize, 0);


    const createPuzzleHandler = async () => {
        // const layout = puzzle.getDatabaseLayout();
        // const res = await dispatch(addUserPuzzle('unavailable', layout, 'unavailable', -1, 0, 0, user.id, packId));
        // if (res.ok) {
        //     return;
        // }
    }

    return (
        <>
            <div className={styles.board_wrapper}>
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
                        {puzzle.vehicles.map((vehicle, i) => {
                            return (
                                <VehicleComponent vehicle={vehicle} puzzle={puzzle} key={`vehicle-${i + 1}`} />
                            )
                        })}
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
                    </div>
                </div>
                <div className={styles.column_three}>
                    <div className={`${styles.trash} ${styles.trash_closed}`} id='trash'></div>
                    <button onClick={createPuzzleHandler}>save puzzle</button>
                </div>
            </div>
        </>
    );
}
export default Builder;
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
    const horSBlk = "https://i.imgur.com/EuehW2s.png";
    const horLBlk = "https://i.imgur.com/TLYg7Bv.png";
    const vertSBlk = "https://i.imgur.com/CJswBXz.png";
    const vertLBlk = "https://i.imgur.com/bzFg8KO.png";
    const trashCan = "https://i.imgur.com/fwxTlXW.png";

    const handleDragStart = e => {
        e.target.classList.add(styles.is_being_dragged);
        e.dataTransfer.setData('text/plain', e.target.id);
        e.dataTransfer.dropEffect = 'move';
    }

    const handleDragEnter = e => {
        e.preventDefault();
        // e.target.classList.add('is_active_drop_zone');
    };

    const handleDragLeave = e => {
        // e.target.classList.remove(styles.is_being_dragged);
        // e.target.classList.remove('is_active_drop_zone');
    };

    const handleDragOver = e => {
        e.preventDefault();
    };

    const handleDrop = e => {
        const idNumb = parseInt(e.dataTransfer.getData('text/plain'));
        const id = e.dataTransfer.getData('text/plain');
        const vehicleElement = document.getElementById(id);
        const column = parseInt(e.target.id[7]);
        const row = parseInt(e.target.id[8]);

        vehicleElement.classList.remove(styles.is_being_dragged);

        console.log('id', id);
        console.log('vehicleElement', vehicleElement);
        console.log('row', row);
        console.log('column', column);

        console.log(e.target.id);
        if (id === 'car-one') {
            puzzle.addVehicle(row, column, 2, 'h', priBlk);
            updateBoard();
        }
        else if (id === 'car-two') {
            puzzle.addVehicle(row, column, 2, 'h', horSBlk);
            updateBoard();
        }
        else if (id === 'car-three') {
            puzzle.addVehicle(row, column, 3, 'h', horLBlk);
            updateBoard();
        }
        else if (id === 'car-four') {
            puzzle.addVehicle(row, column, 2, 'v', vertSBlk);
            updateBoard();
        }
        else if (id === 'car-five') {
            puzzle.addVehicle(row, column, 3, 'v', vertLBlk);
            updateBoard();
        }
        else {
            puzzle.vehicles.forEach((vehicle, i) => {
                const pct = 16.667;
                // console.log(vehicle.id)
                if (vehicle.id === idNumb) {
                    console.log('test');
                    if (e.target.id === 'trash') {
                        puzzle.remove(i);
                        vehicleElement.remove();
                        return;
                    }
                    else {
                        puzzle.move(row, column, vehicle);
                    }
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
            });
        }
        // puzzle.vehicles.forEach((vehicle, i) => {
        //     const pct = 16.667;
        //     if (vehicle.length > 0) {
        //         const imageElement = document.getElementById(`image-${vehicle.id}`);
        //         imageElement.style.backgroundImage = `url(${vehicle.imageUrl})`;
        //         const newVehicleElement = document.getElementById(vehicle.id);
        //         newVehicleElement.classList.remove(styles.hide);
        //         if (vehicle.orientation === 'h') {
        //             newVehicleElement.style.top = (vehicle.row * pct) + '%';
        //             newVehicleElement.style.left = (vehicle.start * pct) + '%';
        //             newVehicleElement.style.width = (vehicle.length * pct) + '%';
        //             // if (vehicle.length === 2) {
        //             //     if (vehicle.row === 2) imageElement.style.backgroundImage = `url(${priBlk})`;
        //             //     else imageElement.style.backgroundImage = `url(${horSBlk})`;
        //             // } else if (vehicle.length === 3) imageElement.style.backgroundImage = `url(${horLBlk})`;
        //         } else if (vehicle.orientation === 'v') {
        //             newVehicleElement.style.top = (vehicle.start * pct) + '%';
        //             newVehicleElement.style.left = (vehicle.column * pct) + '%';
        //             newVehicleElement.style.height = (vehicle.length * pct) + '%';
        //             // if (vehicle.length === 2) imageElement.style.backgroundImage = `url(${vertSBlk})`;
        //             // else if (vehicle.length === 3) imageElement.style.backgroundImage = `url(${vertLBlk})`;
        //         }
        //     }
        // });
        console.log(puzzle);

        // updateBoard(vehicleElement);
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
                    // if (vehicle.length === 2) {
                    //     if (vehicle.row === 2) imageElement.style.backgroundImage = `url(${priBlk})`;
                    //     else imageElement.style.backgroundImage = `url(${horSBlk})`;
                    // } else if (vehicle.length === 3) imageElement.style.backgroundImage = `url(${horLBlk})`;
                } else if (vehicle.orientation === 'v') {
                    newVehicleElement.style.top = (vehicle.start * pct) + '%';
                    newVehicleElement.style.left = (vehicle.column * pct) + '%';
                    newVehicleElement.style.height = (vehicle.length * pct) + '%';
                    // if (vehicle.length === 2) imageElement.style.backgroundImage = `url(${vertSBlk})`;
                    // else if (vehicle.length === 3) imageElement.style.backgroundImage = `url(${vertLBlk})`;
                }
            }
        });
    }

    const handleTrashDrop = e => {
        const targetId = e.dataTransfer.getData('text/plain');
        console.log('targetId', targetId);
        const vehicleId = parseInt(targetId);
        const vehicleIndex = vehicleId - 1;
        const vehicleElement = document.getElementById(targetId);
        // vehicleElement.classList.remove(styles.is_being_dragged);
        // for (let i = 0; i < puzzle.vehicles.length; i++)
        console.log('vehicleId', vehicleId);
        console.log('puzzle.vehicles[vehicleIndex].id', puzzle.vehicles[vehicleIndex].id);
        console.log('vehicleElement', vehicleElement)
        
        // puzzle.remove(vehicleIndex);
        vehicleElement.remove();
        
        
        // puzzle.vehicles.forEach((vehicle, i) => {
        //     const pct = 16.667;
        //     if (vehicle.id === vehicleId) {
        //         puzzle.remove(i);
        //         vehicleElement.remove();
        //         if (vehicle.orientation === 'h') {
        //             vehicleElement.style.top = (vehicle.row * pct) + '%';
        //             vehicleElement.style.left = (vehicle.start * pct) + '%';
        //             vehicleElement.style.width = (vehicle.length * pct) + '%';
        //         } else if (vehicle.orientation === 'v') {
        //             vehicleElement.style.top = (vehicle.start * pct) + '%';
        //             vehicleElement.style.left = (vehicle.column * pct) + '%';
        //             vehicleElement.style.height = (vehicle.length * pct) + '%';
        //         }
        //     }
        // });
        
        
        // let id;
        // let vehicleElement;
        // const idNumb = parseInt(e.dataTransfer.getData('text/plain'));
        // if (idNumb !== idNumb) {
        //     id = e.dataTransfer.getData('text/plain');
        //     vehicleElement = document.getElementById(id);
        //     vehicleElement.classList.remove(styles.is_being_dragged);
        // }
        // console.log(idNumb)
        // console.log(id)
        // const column = parseInt(e.target.id[7]);
        // const row = parseInt(e.target.id[8]);
        // if (id === 'sportsCar-model') {
        //     puzzle.addVehicle(row, column, 2, 'h', priBlk);
        //     updateBoard();
        // }
        // else if (id === 'smallHorizontal-model') {
        //     puzzle.addVehicle(row, column, 2, 'h', horSBlk);
        //     updateBoard();
        // }
        // else if (id === 'largeHorizontal-model') {
        //     puzzle.addVehicle(row, column, 3, 'h', horLBlk);
        //     updateBoard();
        // }
        // else if (id === 'smallVertical-model') {
        //     puzzle.addVehicle(row, column, 2, 'v', vertSBlk);
        //     updateBoard();
        // }
        // else if (id === 'largeVertical-model') {
        //     puzzle.addVehicle(row, column, 3, 'v', vertLBlk);
        //     updateBoard();
        // }
        // else {
        //     puzzle.vehicles.forEach((vehicle, i) => {
        //         const pct = 16.667;
        //         if (vehicle.id === idNumb) {
        //             if (e.target.id === 'trash') {
        //                 puzzle.remove(i);
        //                 vehicleElement.remove();
        //                 return;
        //             } else puzzle.move(row, column, vehicle);
        
        //             if (vehicle.orientation === 'h') {
        //                 vehicleElement.style.top = (vehicle.row * pct) + '%';
        //                 vehicleElement.style.left = (vehicle.start * pct) + '%';
        //                 vehicleElement.style.width = (vehicle.length * pct) + '%';
        //             } else if (vehicle.orientation === 'v') {
        //                 vehicleElement.style.top = (vehicle.start * pct) + '%';
        //                 vehicleElement.style.left = (vehicle.column * pct) + '%';
        //                 vehicleElement.style.height = (vehicle.length * pct) + '%';
        //             }
        //         }
        //     });
        // }
        };


    const initialize = () => {
        const background = document.getElementById('page-background');
        background.classList.remove(globalStyles.background_image_asphalt);
        background.classList.add(globalStyles.background_image_carbon_fiber);
        
        const dropZones = document.getElementsByClassName(styles.drop_zone);
        Array.from(dropZones).forEach(function (dropZone) {
        dropZone.addEventListener('drop', handleDrop);
        dropZone.addEventListener('dragenter', handleDragEnter);
        dropZone.addEventListener('dragleave', handleDragLeave);
        dropZone.addEventListener('dragover', handleDragOver);
        });
        
        const sportsCarModel = document.getElementById('sportsCar-model');
        const smallHorizontalModel = document.getElementById('smallHorizontal-model');
        const largeHorizontalModel = document.getElementById('largeHorizontal-model');
        const smallVerticalModel = document.getElementById('smallVertical-model');
        const largeVerticalModel = document.getElementById('largeVertical-model');
        
        sportsCarModel.addEventListener('dragstart', handleDragStart);
        smallHorizontalModel.addEventListener('dragstart', handleDragStart);
        largeHorizontalModel.addEventListener('dragstart', handleDragStart);
        smallVerticalModel.addEventListener('dragstart', handleDragStart);
        largeVerticalModel.addEventListener('dragstart', handleDragStart);
        
        // const trashDropZone = document.getElementById('trash');
        const trashDropZone = document.getElementById('trash');
        trashDropZone.addEventListener('drop', handleDrop);
        trashDropZone.addEventListener('dragenter', handleDragEnter);
        trashDropZone.addEventListener('dragleave', handleDragLeave);
        trashDropZone.addEventListener('dragover', handleDragOver);
        
        
        
        sportsCarModel.style.backgroundImage = `url(${priBlk})`;
        smallHorizontalModel.style.backgroundImage = `url(${horSBlk})`;
        largeHorizontalModel.style.backgroundImage = `url(${horLBlk})`;
        smallVerticalModel.style.backgroundImage = `url(${vertSBlk})`;
        largeVerticalModel.style.backgroundImage = `url(${vertLBlk})`;
        trashDropZone.style.backgroundImage = `url(${trashCan})`;
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
                        <div className={styles.car} draggable="true" id='sportsCar-model'></div>
                        <div className={styles.car} draggable="true" id='smallHorizontal-model'></div>
                        <div className={styles.car} draggable="true" id='largeHorizontal-model'></div>
                    </div>
                    <div className={styles.vertical_cars}>
                        <div className={styles.car} draggable="true" id='smallVertical-model'></div>
                        <div className={styles.car} draggable="true" id='largeVertical-model'></div>
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
                    <div className={`${styles.trash}`} id='trash'></div>
                    <button onClick={createPuzzleHandler}>save puzzle</button>
                </div>
            </div>
        </>
    );
}
export default Builder;
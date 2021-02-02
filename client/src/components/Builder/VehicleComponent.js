import React from 'react';
import styles from '../../styles/builder.module.css';

const VehicleComponent = ({ car }) => {
    const handleDragStart = e => {
        e.target.classList.add(styles.is_being_dragged);
        e.dataTransfer.setData('text/plain', e.target.id);
        e.dataTransfer.dropEffect = 'move';
    }

    const handleDragEnd = e => {
        e.preventDefault();
        // console.log('e.target', e.target)
        e.target.classList.remove(styles.is_being_dragged);
    };

    const setDragStart = () => {
        const carElement = document.getElementById(car.id);
        carElement.addEventListener('dragstart', handleDragStart);
        carElement.addEventListener('dragend', handleDragEnd);
    };

    setTimeout(setDragStart, 0);

    return (
        <>
            <div draggable="true" id={car.id} className={`${styles.container} ${styles.hide}`}>
                <div id={`image-${car.id}`} className={styles.image}></div>
            </div>
        </>
    );
}
export default VehicleComponent;
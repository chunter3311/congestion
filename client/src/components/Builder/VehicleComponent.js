import React from 'react';
import styles from '../../styles/builder.module.css';

const VehicleComponent = ({ vehicle }) => {
    const handleDragStart = e => {
        e.target.classList.add(styles.is_being_dragged);
        e.dataTransfer.setData('text/plain', e.target.id);
        e.dataTransfer.dropEffect = 'move';
    }

    const setDragStart = () => {
        const blockElement = document.getElementById(vehicle.id);
        blockElement.addEventListener('dragstart', handleDragStart);
    };

    setTimeout(setDragStart, 0);

    return (
        <>
            <div draggable="true" id={vehicle.id} className={`${styles.container} ${styles.hide}`}>
                <div id={`image-${vehicle.id}`} className={styles.image}></div>
            </div>
        </>
    );
}
export default VehicleComponent;
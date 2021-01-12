import React from 'react';
import styles from '../styles/builder.module.css';

const VehicleComponent = ({ vehicle }) => {
    const handleDragStart = e => {
        e.target.classList.add(styles.is_being_dragged);
        e.dataTransfer.setData('text/plain', e.target.id);
        e.dataTransfer.dropEffect = 'move';
    }

    // const pct = 16.667;
    const updateBlock = () => {
        const blockElement = document.getElementById(vehicle.id);
        blockElement.addEventListener('dragstart', handleDragStart);
        // if (vehicle.orientation === 'h') {
        //     blockElement.style.top = (vehicle.row * pct) + '%';
        //     blockElement.style.left = (vehicle.start * pct) + '%';
        //     blockElement.style.width = (vehicle.length * pct) + '%';
        // } else if (vehicle.orientation === 'v') {
        //     blockElement.style.top = (vehicle.start * pct) + '%';
        //     blockElement.style.left = (vehicle.column * pct) + '%';
        //     blockElement.style.height = (vehicle.length * pct) + '%';
        // }
    };

    setTimeout(updateBlock, 0);

    return (
        <>
            <div draggable="true" id={vehicle.id} className={`${styles.container} ${styles.hide}`}>
                <div id={`image-${vehicle.id}`} className={styles.image}></div>
            </div>
        </>
    );
}
export default VehicleComponent;
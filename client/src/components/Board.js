import React from "react";
import { Redirect, Route, NavLink, withRouter } from 'react-router-dom';
import styles from '../styles/board.module.css';
import navStyles from '../styles/nav.module.css';

function Board() {


    return (
        <div className={styles.board_wrapper}>
            <div className={styles.column_one}>

            </div>
            <div className={styles.column_two}>
                <div className={styles.board_container}>
                    <div className={styles.board}>
                        <div className={styles.row}>
                            <div id="square-05" className={styles.square}></div>
                            <div id="square-15" className={styles.square}></div>
                            <div id="square-25" className={styles.square}></div>
                            <div id="square-35" className={styles.square}></div>
                            <div id="square-45" className={styles.square}></div>
                            <div id="square-55" className={styles.square}></div>
                        </div>
                        <div className={styles.row}>
                            <div id="square-04" className={styles.square}></div>
                            <div id="square-14" className={styles.square}></div>
                            <div id="square-24" className={styles.square}></div>
                            <div id="square-34" className={styles.square}></div>
                            <div id="square-44" className={styles.square}></div>
                            <div id="square-54" className={styles.square}></div>
                        </div>
                        <div className={styles.row}>
                            <div id="square-03" className={styles.square}></div>
                            <div id="square-13" className={styles.square}></div>
                            <div id="square-23" className={styles.square}></div>
                            <div id="square-33" className={styles.square}></div>
                            <div id="square-43" className={styles.square}></div>
                            <div id="square-53" className={styles.square}></div>
                        </div>
                        <div className={styles.row}>
                            <div id="square-02" className={styles.square}></div>
                            <div id="square-12" className={styles.square}></div>
                            <div id="square-22" className={styles.square}></div>
                            <div id="square-32" className={styles.square}></div>
                            <div id="square-42" className={styles.square}></div>
                            <div id="square-52" className={styles.square}></div>
                        </div>
                        <div className={styles.row}>
                            <div id="square-01" className={styles.square}></div>
                            <div id="square-11" className={styles.square}></div>
                            <div id="square-21" className={styles.square}></div>
                            <div id="square-31" className={styles.square}></div>
                            <div id="square-41" className={styles.square}></div>
                            <div id="square-51" className={styles.square}></div>
                        </div>
                        <div className={styles.row}>
                            <div id="square-00" className={styles.square}></div>
                            <div id="square-10" className={styles.square}></div>
                            <div id="square-20" className={styles.square}></div>
                            <div id="square-30" className={styles.square}></div>
                            <div id="square-40" className={styles.square}></div>
                            <div id="square-50" className={styles.square}></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.column_three}></div>
        </div>
    );
}
export default Board;
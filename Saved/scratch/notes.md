Pro_Pack_LIST
    Pro_Pack_ITEM
        Pro_Puzzle_LIST
            Pro_Puzzle_ITEM

Adopted_Pack_LIST
    Adopted_Pack_ITEM
        Adopted_Puzzle_LIST
            Adopted_Puzzle_ITEM

Created_Pack_LIST
    Created_Pack_ITEM
        Created_Puzzle_LIST
            Created_Puzzle_ITEM


Pro_Pack_LIST => Pro_Pack_LIST
    Pro_Pack_ITEM
        Pro_Puzzle_LIST
            Pro_Puzzle_ITEM

Adopted_Pack_LIST => Adopted_Pack_LIST
    Adopted_Pack_ITEM
        Adopted_Puzzle_LIST
            Adopted_Puzzle_ITEM

Created_Pack_LIST => Created_Pack_LIST
    Created_Pack_ITEM
        Created_Puzzle_LIST
            Created_Puzzle_ITEM



import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNoteList } from '../store/session';
import { toggleNotebookTooltip, toggleMoveNoteButton } from '../store/ui';
import noteStyles from '../styles/note.module.css';
import MoveNoteButton from './MoveNoteButton';

const EditorNotebookButton = ({ activeNotebook }) => {
    const dispatch = useDispatch();
    const path = window.location.pathname;
    const { notebookTooltip: showTooltip } = useSelector(state => state.ui);
    const moveNote = useSelector(state => state.ui.showMoveNoteButton);

    const getTooltipPlacement = () => {
        let box = document.querySelector(".notebookButton") || { offsetWidth: 0 };
        return (box.offsetWidth - 120) / 2;
    }

    const handleNotebookClick = () => {
        dispatch(setNoteList("notebook", activeNotebook.id, true));
    }

    const handleHover = () => {
        dispatch(toggleNotebookTooltip());
        dispatch(toggleMoveNoteButton());
    }

    return (
        <div className={noteStyles.notebookButtonContainer}>
            <div style={{ display: 'flex', alignItems: 'center', margin: '0 3px', minWidth: '28px', height: '100%' }}>
                <button
                    className={noteStyles.notebookButton + " notebookButton"}
                    onClick={path === '/trash' ? '' : handleNotebookClick}
                    onMouseEnter={path === '/trash' ? '' : handleHover}
                    onMouseLeave={path === '/trash' ? '' : handleHover}>
                    <div className={noteStyles.notebookSVGWrapper}>
                        {path === '/trash' ? <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M2.945 5l8.112.004-.337 6.315C10.662 12.264 9.908 13 8.846 13H5.223c-1.06 0-1.863-.738-1.923-1.681L2.945 5zM4 6l.288 5.263c.028.43.453.737.935.737h3.623c.483 0 .854-.309.88-.739L10 6H4zm2.273-5c-1.105 0-2 .883-2 1.868V3H1.545c-.3 0-.545.245-.545.514 0 .268.244.486.545.486h10.91c.3 0 .545-.218.545-.486 0-.269-.244-.514-.546-.514H9.727v-.132c0-.985-.895-1.868-2-1.868H6.273zm2.363 2v-.132C8.636 2.42 8.23 2 7.727 2H6.273c-.502 0-.91.42-.91.868V3h3.273z" fill="currentColor"></path></svg> : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14"><path fill-rule="evenodd" d="M3 2v10h7a1 1 0 001-1V3a1 1 0 00-1-1H3zM2 1h8a2 2 0 012 2v8a2 2 0 01-2 2H2V1zm2 1v10h1V2H4zm2 3v1h4V5H6z"></path></svg>}
                    </div>
                    <span>{path === '/trash' ? 'Trash' : activeNotebook ? activeNotebook.title : ""}</span>
                </button>
                {moveNote ? <MoveNoteButton /> : ''}
            </div>
            <div
                className={showTooltip ? noteStyles.notebookTooltip : noteStyles.hidden}
                style={{ left: getTooltipPlacement(), right: getTooltipPlacement() }}>
                <div className={noteStyles.notebookTooltipTriangle}></div>
                <span>Go to Notebook</span>
            </div>
        </div>
    )
}

export default EditorNotebookButton;
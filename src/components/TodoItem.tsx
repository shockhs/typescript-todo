import React, { FunctionComponent, useEffect, useState } from 'react';
import firebase from '../data/firebase';
import deleteIcon from '../images/delete.svg';


interface todoItem {
    title: string,
    status: boolean,
    uid: string,
    deleteTodo: (uid: string) => void
}

const TodoItem: FunctionComponent<todoItem> = ({ title, status, uid, deleteTodo }) => {
    const [titleTodo, setTitleTodo] = useState<string>(title);
    const [statusTodo, setStatusTodo] = useState<boolean>(status);
    const [statusEdit, setStatusEdit] = useState<boolean>(false);
    const [forceUpdate, setForceUpdate] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        setStatusEdit(false)
        const { currentUser } = firebase.auth();
        const updateTask = async () => {
            if (currentUser) {
                await firebase.database().ref(`/todolist/${currentUser.uid}/${uid}`)
                    .update({ "title": titleTodo, "status": statusTodo })
                    .catch(() => setError('Something wrong. Try again late'))
            }
        }
        if (titleTodo !== title || statusTodo !== status) updateTask()// eslint-disable-next-line
    }, [forceUpdate]);

    const handleStatusChange = () => {
        setStatusTodo(statusTodo => !statusTodo);
        setForceUpdate(forceUpdate => !forceUpdate);
    }
    return (
        <div className="todoElements__item">
            <div className="todoElements__item-main">

                <input
                    type="checkbox"
                    className="toggle"
                    checked={statusTodo}
                    id="check"
                    onChange={() => { handleStatusChange() }}
                />
                {statusEdit
                    ? <input
                        type="text"
                        className="todoElements__item-main-label"
                        onChange={(e) => setTitleTodo(e.currentTarget.value)}
                        autoFocus={true}
                        onBlur={() => setForceUpdate(forceUpdate => !forceUpdate)}
                        value={titleTodo} />
                    : <label className="todoElements__item-main-label" onDoubleClick={() => setStatusEdit(true)}>
                        {statusTodo ? <s>{titleTodo}</s> : titleTodo}
                    </label>}
                <img className="todoElements__item-main-delete" src={deleteIcon} alt="deleteIcon" onClick={() => deleteTodo(uid)} />
            </div>
            {error !== ''
                ? <div className="todoElements__item-error">
                    {error}
                </div>
                : null}
        </div>
    );
}

export default TodoItem;
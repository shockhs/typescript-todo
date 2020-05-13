import _ from 'lodash';
import React, { FunctionComponent, useCallback, useEffect, useState } from 'react';
import firebase from '../data/firebase';
import Header from './Header';
import TodoCreateForm from './TodoCreateForm';
import TodoItem from './TodoItem';


type todoElement = {
    uid: string,
    title: string,
    status: boolean
}

const MainPage: FunctionComponent = () => {

    const [todoList, setTodoList] = useState<Array<todoElement>>([]);
    const [titleTodo, setTitleTodo] = useState<string>('');
    const [forceUpdate, setForceUpdate] = useState<boolean>(false);
    const [deleteUid, setDeleteUid] = useState<string>('');
    const [statusTodo, setStatusTodo] = useState<boolean>(false);

    useEffect(() => {
        const { currentUser } = firebase.auth();
        const createTask = async () => {
            if (currentUser) {
                await firebase.database().ref(`/todolist/${currentUser.uid}`)
                    .push({ "title": titleTodo, "status": statusTodo })
                    .then(() => {
                        setTitleTodo('');
                        setForceUpdate(forceUpdate => !forceUpdate);
                    })
            }
        }
        const deleteTask = async () => {
            if (currentUser) {
                await firebase.database().ref(`/todolist/${currentUser.uid}/${deleteUid}`)
                    .remove()
                    .then(() => {
                        setDeleteUid('');
                        setForceUpdate(forceUpdate => !forceUpdate);
                    })
            }
        }
        if (titleTodo !== '') createTask()
        else if (deleteUid !== '') deleteTask()// eslint-disable-next-line
    }, [titleTodo, deleteUid]);

    useEffect(() => {
        const { currentUser } = firebase.auth()
        if (currentUser) {
            firebase.database().ref(`/todolist/${currentUser.uid}`)
                .on('value', list => {
                    setTodoList(_.map(list.val(), (val, uid) => { return { ...val, uid } }))
                });
        }
    }, [forceUpdate])

    const updateTodoList = useCallback((title: string, status: boolean) => {
        setStatusTodo(status);
        setTitleTodo(title);
    }, [])

    const handleDeleteTodo = useCallback((event: React.MouseEvent<HTMLButtonElement, MouseEvent>, uid: string) => {
        event.preventDefault();
        setDeleteUid(uid);
    }, [])

    return (
        <div className="container">
            <Header random={todoList.length} />
            <div className="mainPage">
                <div className="todoElements">
                    {todoList.length
                        ? todoList.map((item) => {
                            return <TodoItem key={item.uid} deleteTodo={handleDeleteTodo} status={item.status} uid={item.uid} title={item.title} />
                        })
                        : null
                    }

                    <TodoCreateForm updateTodo={updateTodoList} />
                </div>
            </div>
        </div>
    );
}

export default MainPage;
import React, { FunctionComponent, useState } from 'react';

interface createForm {
    updateTodo: Function
}

const TodoCreateForm: FunctionComponent<createForm> = ({ updateTodo }) => {

    const status: boolean = false;
    const [titleTodo, setTitleTodo] = useState<string>('');


    const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        updateTodo(titleTodo, status);
        setTitleTodo('');
    }

    return (
        <div className="inputForm">
            <input
                value={titleTodo}
                placeholder="Text..."
                onChange={(e) => setTitleTodo(e.currentTarget.value)}
            />

            <button onClick={(e) => handleClick(e)}> Create</button>
        </div>
    );
}

export default TodoCreateForm;
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
            <div className="inputForm__field">
                <input
                    required
                    type="text"
                    value={titleTodo}
                    onChange={(e) => setTitleTodo(e.currentTarget.value)}
                />
                <label>Enter new Task</label>
                <span></span>
            </div>

            <button className="inputForm__button" onClick={(e) => handleClick(e)}> Create</button>
        </div>
    );
}

export default TodoCreateForm;
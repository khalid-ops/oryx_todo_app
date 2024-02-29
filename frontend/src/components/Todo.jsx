import React from 'react';

const Todo = ({title, date}) => {
    return (
        <div>
            <div class="card">
                <div class="card-body">
                    <h4 className='card-title'>{title}
                    </h4>
                    <div>
                        <h6>Due Date</h6>
                        <p>{date}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Todo;
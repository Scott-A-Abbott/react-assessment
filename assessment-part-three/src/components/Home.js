import React from 'react';
import List from './List';
import AddTodo from './AddTodo';

export default function Home(){
    return (
        <div>
            <AddTodo />
            <br/>
            <List />
        </div>
    )
}
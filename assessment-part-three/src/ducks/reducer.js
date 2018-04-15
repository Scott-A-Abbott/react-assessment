import axios from 'axios';

const initialState = {
    task: {
        title: '',
        description: '', 
        completed: false
    },
    list: [],

}

export default function reducer(state = initialState, action){
    switch(action.type){
        case GET_LIST + _FULFILLED:
            return Object.assign({}, state, {list: action.payload})
        case UPDATE_TITLE:
            return Object.assign({}, state, {task: Object.assign({}, state.task, {title: action.payload})})
        case ADD_TODO + _FULFILLED:
            return Object.assign({}, initialState, {list: action.payload})
        case COMPLETE + _FULFILLED:
            return Object.assign({}, state, {list: action.payload})
        case DELETE + _FULFILLED: 
            return Object.assign({}, state, {list: action.payload})
        case UPDATE_DESCRIPTION:
            return Object.assign({}, state, {task: Object.assign({}, state.task, {description: action.payload})})
        case UPDATE_TASK + _FULFILLED:
            return Object.assign({}, state, {list: action.payload})
        case UPDATE_COMPLETED:
            return Object.assign({}, state, {task: Object.assign({}, state.task, {completed: action.payload})})
        default: return state;
    }
}

const GET_LIST = 'GET_LIST';
const _FULFILLED = '_FULFILLED';
const UPDATE_TITLE = 'UPDATE_TITLE';
const UPDATE_DESCRIPTION = 'UPDATE_DESCRIPTION';
const ADD_TODO = 'ADD_TODO';
const COMPLETE = 'COMPLETE';
const DELETE = 'DELETE';
const UPDATE_TASK = 'UPDATE_TASK';
const UPDATE_COMPLETED = 'UPDATE_COMPLETED';

export function updateCompleted(bool){
    return {
        type: UPDATE_COMPLETED,
        payload: bool
    }
}

export function updateTask(id, task){
    let updated = axios.patch(`https://practiceapi.devmountain.com/api/tasks/${id}`, task).then(res => res.data);
    console.log(id);
    console.log(task);
    return {
        type: UPDATE_TASK,
        payload: updated
    }
}

export function complete(id){
    let updated = axios.put(`https://practiceapi.devmountain.com/api/tasks/${id}`)
                        .then(res => {console.log(res.data); return res.data});
    return {
        type: COMPLETE,
        payload: updated
    }
}

export function deleteTask(id){
    let afterDelete = axios.delete(`https://practiceapi.devmountain.com/api/tasks/${id}`)
                            .then(res => res.data)
        
    return {
        type: DELETE,
        payload: afterDelete
    }
}

export function addTodo(task){
    let newList;
    if(task.title.replace(/ /g,'').length > 0){
        newList = axios.post('https://practiceapi.devmountain.com/api/tasks', task)
        .then(res => res.data);
        return {
            type: ADD_TODO,
            payload: newList
        }
    }else {
        return {type: ADD_TODO}
    }
}

export function updateTitle(value){
    return {
        type: UPDATE_TITLE,
        payload: value
    }
}
export function updateDescription(value){
    return {
        type: UPDATE_DESCRIPTION,
        payload: value
    }
}

export function getList(){
    let list = axios.get('https://practiceapi.devmountain.com/api/tasks').then((res) => res.data);

    return {
        type: GET_LIST,
        payload: list
    }
}
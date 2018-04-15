import React from 'react';
import {connect} from 'react-redux';
import {complete, deleteTask, updateTitle, updateDescription, getList, updateTask, updateCompleted} from '../ducks/reducer';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import {css} from 'glamor';

class ItemDetails extends React.Component{
    constructor(props){
        super(props)

        this.taskId = this.props.match.params.id;
        this.state = {
            task: {}
        }
    }

   async componentDidMount(){
      await  this.props.getList()
            this.defaultValues();
            this.setState({
                task: this.props.list.find((item) => +item.id === +this.taskId)
            })
    }

    componentWillUnmount(){
        this.props.updateTitle('');
        this.props.updateDescription('');
    }
    
    defaultValues = () => {
        let task = this.props.list.find((item) => +item.id === +this.taskId);
        this.props.updateTitle(task.title);
        this.props.updateDescription(task.description);
        this.props.updateCompleted(task.completed)
    }
    
    render(){
        let flexed = css({
            display: 'flex', 
            flexDirection: 'column', 
            alignItems:'flex-start'
        })
        return (
        <div className={`${flexed}`}>
            <button onClick={() => this.props.history.push('/')} > back to tasks </button>
            <br/>
            Title
            <input onChange={(e) => this.props.updateTitle(e.target.value)} value={this.props.task.title} type='text' />
            Description
            <textarea style={{width: 300, height: 100}} onChange={(e) => this.props.updateDescription(e.target.value)} value={this.props.task.description} type='text' />
            <br />
            <div>
                <button onClick={this.defaultValues} >Cancel</button>
                <button onClick={() => {this.props.updateTask(this.taskId, this.props.task); this.props.history.push('/')}} style={{color: 'blue'}} >Save</button>
                <button onClick={() => {this.props.deleteTask(this.taskId); this.props.history.push('/')}} style={{color: 'red'}} >Delete</button>
                <button disabled={this.state.task.completed} onClick={() => {this.props.complete(this.taskId); this.props.history.push('/')}} >Complete</button>
            </div>
        </div>
    )}
}

const actions = {
    complete,
    deleteTask,
    updateTitle,
    updateDescription,
    getList,
    updateTask,
    updateCompleted
}

function mapStateToProps(state){
    return {
        task: state.task,
        list: state.list

    }
}

export default connect(mapStateToProps, actions)(withRouter(ItemDetails))
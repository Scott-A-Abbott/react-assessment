import React from 'react';
import {connect} from 'react-redux';
import {updateTitle, addTodo} from '../ducks/reducer';
import {css} from 'glamor';

class AddTodo extends React.Component{
    render(){
        let flexed = css({
            display: 'flex', 
            flexDirection: 'column', 
            alignItems:'flex-start'
        })
        return (
            <div className={`${flexed}`}>
                Title
                <input value={this.props.title} onChange={(e) => this.props.updateTitle(e.target.value)} type='text' />
                <button onClick={() => this.props.addTodo(this.props.task)} >Add</button>
            </div>
        )
    }
}

const actions = {
    updateTitle,
    addTodo
}

function mapStateToProps(state){
    return {
        title: state.task.title,
        task: state.task
    }
}

export default connect(mapStateToProps, actions)(AddTodo)
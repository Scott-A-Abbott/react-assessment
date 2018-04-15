import React from 'react';
import {connect} from 'react-redux';
import {getList, complete, deleteTask} from '../ducks/reducer';
import {withRouter} from 'react-router-dom';
import {css} from 'glamor'

class List extends React.Component{

    componentDidMount(){
        this.props.getList()
    }

    render(){
        const listItem = css({
            margin: '10px',
            ':hover':{
                cursor: 'pointer'
            }
        })
        return (
            <div>
                {
                    this.props.list.map((item, index) => {
                        return (
                            <div key={`task_${item.id}`} style={{display: 'flex'}}>
                                <div 
                                    className={`${listItem}`}
                                    onClick={() => {this.props.history.push(`/ItemDetails/${item.id}`)}}
                                    style={{color: item.completed ? 'gray' : 'blue',}}>
                                    {item.title}
                                </div>
                                <button onClick={() => this.props.complete(item.id)} disabled={item.completed}>Completed</button>
                                <button onClick={() => this.props.deleteTask(item.id)}>Delete</button>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}   


function mapStateToProps(state){
    return {
        list: state.list
    }
}
export default connect(mapStateToProps, {getList, complete, deleteTask})(withRouter(List))
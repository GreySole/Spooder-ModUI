import React from 'react';
import lockClosed from './icons/lock-solid.svg';
import lockOpen from './icons/lock-open-solid.svg';

class EventCard extends React.Component{
    constructor(props){
        super(props);
        //console.log(props.islocked);
        this.state = {
            eventname:props.eventname,
            displayname:props.displayname,
            islocked:props.islocked,
            click:props.click
        };
    }

    render(){
        return <div eventname={this.state.eventname} className={"event-card "+(this.state.islocked?"locked":"")} onClick={this.state.click}>
            <label className="event-card-name">
                {this.state.displayname}
            </label>
            <img src={this.state.islocked?lockClosed:lockOpen} width="100px" height="100px"/>
        </div>
    }
}

export default EventCard;
import React from 'react';
import lockClosed from './icons/lock-solid.svg';
import lockOpen from './icons/lock-open-solid.svg';
import defaultIcon from './icons/spider-solid.svg';
import outArrowBox from './icons/arrow-up-right-from-square-solid.svg';
import EventCard from './EventCard.js';

class PluginCard extends React.Component{
    constructor(props){
        super(props);
        //console.log(props.islocked);
        this.state = {
            pluginname:props.pluginname,
            displayname:props.displayname,
            islocked:props.islocked,
            click:props.pluginLockClick,
            modmap:props.modmap,
            utility:props.utility,
            locksExpanded:false,
            showPluginUtility:props.showPluginUtility
        };
        this.expandLocks = this.expandLocks.bind(this);
    }

    expandLocks(e){
        this.setState(Object.assign(this.state, {locksExpanded:!this.state.locksExpanded}));
    }

    

    onImgError(e){
        e.currentTarget.src = defaultIcon;
    }

    render(){
        let pluginLocks = [];
        console.log(this.state.modmap);
        if(this.state.modmap != null){
            if(this.state.modmap.locks != null){
                for(let l in this.state.modmap.locks){
                    pluginLocks.push(
                        <EventCard key={this.state.pluginname+"-"+l+"-"+this.state.modmap.locks[l]} eventname={l} displayname={l} islocked={this.state.modmap.locks[l]==true} click={()=>{this.state.click(this.state.pluginname, l)}}/>
                    )
                }
            }
        }
        let pluginLockElement = this.state.locksExpanded? <div className={"plugin-card-locks"}>
            {pluginLocks}
        </div>:null;

        let utilityShowElement = this.state.utility? <div className={"plugin-utility-button"} onClick={()=>this.state.showPluginUtility(this.state.pluginname)}>
            <img src={outArrowBox} width="80px" height="80px"/>
        </div>:null;
        
        return <div pluginname={this.state.pluginname} className={"plugin-card "+(this.state.islocked?"locked":"")+(this.state.locksExpanded?"expanded":"")}>
            <div className="plugin-card-base" onClick={this.expandLocks}>
                <div className="plugin-card-info">
                    <img src={window.location.origin+"/overlay/"+this.state.pluginname+"/icon.png"} onError={this.onImgError} width="100px" height="100px"/>
                    <label className="plugin-card-name">
                        {this.state.pluginname}
                    </label>
                </div>
                
                <div className="plugin-card-actions">
                    {utilityShowElement}
                    <div className="plugin-card-lockdown" onClick={()=>{this.state.click(this.state.pluginname, "lockdown")}}>
                        <img src={this.state.islocked?lockClosed:lockOpen} width="100px" height="100px"/>
                        <label className="plugin-lock-label">Lockdown Chat</label>
                    </div>
                </div>
            </div>
            <div className="plugin-card-expanded">
                {pluginLockElement}
            </div>
            
        </div>
    }
}

export default PluginCard;
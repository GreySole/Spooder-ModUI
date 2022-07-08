import React from 'react';

class BlacklistViewer extends React.Component{

    constructor(props){
        super(props);
        console.log("BLACKLIST PROPS", props.blacklist);
        this.state = {
            blacklist: props.blacklist,
            currentViewers: null,
            blacklistViewer:props.onBlock,
            unblacklistViewer:props.onUnblock
        };
        this.getCurrentViewers = this.getCurrentViewers.bind(this);
    }

    componentDidMount(){
        this.getCurrentViewers();
    }

    async getCurrentViewers(){
        let cViewers = await fetch(window.location.origin+"/mod/currentviewers").then(response => response.json());
        this.setState(Object.assign(this.state, {currentViewers:cViewers.chatters.viewers}));
    }

    render(){
        console.log(this.state);
        let blacklistedViewers = this.state.blacklist;
        let currentViewers = this.state.currentViewers;
        let blacklistedElements = [];
        let viewerElements = [];

        for(let b in blacklistedViewers){
            if(blacklistedViewers[b] != true){continue}
            blacklistedElements.push(
                <div key={"blacklist-"+b+"-"+blacklistedViewers[b]} className="blacklist-blockedviewer" onClick={()=>this.state.unblacklistViewer(b)}>
                    <label>{b}
                    </label>
                </div>
            );
        }

        for(let c in currentViewers){
            if(blacklistedViewers[currentViewers[c]] == true){continue;}
            viewerElements.push(
                <div key={"viewerlist-"+currentViewers[c]+"-"+blacklistedViewers[currentViewers[c]]} className="blacklist-currentviewer" onClick={()=>this.state.blacklistViewer(currentViewers[c])}>
                    <label>{currentViewers[c]}
                    </label>
                </div>
            );
        }
        
        return <div className="blacklist-tab">
            <div className="viewer-container">
                <h1>Current Viewers</h1>
                {viewerElements}</div>
            <div className="blacklist-container">
            <h1>Blacklisted Viewers</h1>
                {blacklistedElements}</div>
        </div>
    }
}

export default BlacklistViewer;
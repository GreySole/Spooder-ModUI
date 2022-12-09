import './App.css';
import OSC from 'osc-js';
import React from 'react';
import ExtWebSocketPlugin from './ExtWebSocketPlugin.js';
import EventCard from './EventCard.js';
import PluginCard from './PluginCard.js';
import BlacklistViewer from './BlacklistViewer.js';
import hamburger from './icons/bars-solid.svg';
import utilClose from './icons/x-solid.svg';
import ThemeEditor from './ThemeEditor';


var oscConnected = false;

var goodInterval = null;
var oscSettings = null;

var cStyle = getComputedStyle(document.querySelector(":root"));

function getAllCSSVars(){
  let themeState = {};
  let varnames = Array.from(document.styleSheets)
  .filter(
      sheet =>
      sheet.href === null || sheet.href.startsWith(window.location.origin)
  )
  .reduce(
      (acc, sheet) =>
      (acc = [
          ...acc,
          ...Array.from(sheet.cssRules).reduce(
          (def, rule) =>
              (def =
              rule.selectorText === ":root"
                  ? [
                      ...def,
                      ...Array.from(rule.style).filter(name =>
                      name.startsWith("--")
                      )
                  ]
                  : def),
          []
          )
      ]),
      []
  );
  for(let v in varnames){
      themeState[varnames[v]] = cStyle.getPropertyValue(varnames[v]);
  }
  //console.log(themeState);
  return themeState;
}

var originalStyle = getAllCSSVars();

class App extends React.Component {

  constructor(props){
    super(props);
    
    this.state = {};
    this.state.osc = null;
    this.state.loggedIn = false;
    this.state.moduser = null;
    let moduser = localStorage.getItem("moduser");
    if(moduser != null && moduser != ""){
      this.state.loggedIn = true;
      this.state.moduser = moduser;
    }else{
      this.state.loggedIn = false;
    }
    this.state.modmap = null;
    this.state.tab = "events";
    this.state.navOpen = false;
    this.state.utilOpen = false;
    this.state.utilityURL = null;
    this.state.status = "initial";
    this.getOSCSettings = this.getOSCSettings.bind(this);
    this.onEventClick = this.onEventClick.bind(this);
    this.onPluginLockClick = this.onPluginLockClick.bind(this);
    this.switchTab = this.switchTab.bind(this);
    this.toggleNavigation = this.toggleNavigation.bind(this);
    this.showPluginUtility = this.showPluginUtility.bind(this);
    this.closePluginUtility = this.closePluginUtility.bind(this);
    this.blacklistViewer = this.blacklistViewer.bind(this);
    this.unblacklistViewer = this.unblacklistViewer.bind(this);
    this.authenticate = this.authenticate.bind(this);
  }

  componentDidMount(){
    this.setTheme();
    if(this.state.loggedIn){
      this.getModMap();
    }
  }



  setTheme(){
    let theme = localStorage.getItem("theme");
    try{
      theme = JSON.parse(theme);
    }catch(e){
      console.log("Theme corrupt. Switching back to default");
    }
    if(theme != null){
      for(let style in theme){
          document.documentElement.style.setProperty(style, theme[style]);
      }
    }
}

  osc = null;

  async getModMap(){
    if(!this.state.osc){
      await this.getOSCSettings();
    }
    let modpack = await fetch(window.location.origin+"/mod/utilities?moduser="+this.state.moduser).then(response => response.json());
    if(modpack.status != "ok"){
      window.location.href = window.location.origin+"/mod";
      return;
    }
    console.log("GOT MODMAP", modpack);
    let newState = Object.assign(this.state);
    newState.modmap = modpack.modmap;
    newState.loggedIn = true;
    if(modpack.theme != null){
      localStorage.setItem("theme", JSON.stringify(modpack.theme));
      this.setTheme();
    }
    this.setState(newState);
    //console.log("MOD MAP", modmap);
  }
  
  

  onEventClick(el){
    let eventName = el.currentTarget.getAttribute("eventname");
    //console.log("EVENT CLICK", eventName);
    let newEvents = Object.assign(this.state.modmap.modlocks.events);
    if(newEvents[eventName] == null){
      newEvents[eventName] = true;
    }else{
      newEvents[eventName] = !newEvents[eventName];
    }
    this.sendOSC("/mod/"+this.state.moduser+"/lock/event/"+eventName, newEvents[eventName]);

    let newState = Object.assign(this.state);
    newState.modmap.modlocks.events = newEvents;
    this.setState(newState);
  }

  onPluginLockClick(pluginName, command){
    console.log("PLUGIN CLICK", pluginName, command);
    let newPlugins = Object.assign(this.state.modmap.plugins);
    let newPluginLocks = Object.assign(this.state.modmap.modlocks.plugins);
    if(command == "lockdown"){
      if(newPluginLocks[pluginName] == null){
        newPluginLocks[pluginName] = 1;
      }else{
        newPluginLocks[pluginName] = newPluginLocks[pluginName]==1?0:1;
      }
      this.sendOSC("/mod/"+this.state.moduser+"/lock/plugin/"+pluginName, newPluginLocks[pluginName]);
    }else{
      newPlugins[pluginName].modmap.locks[command] = newPlugins[pluginName].modmap.locks[command]==1?0:1;
      this.sendOSC("/mod/"+this.state.moduser+"/lock/plugin/"+pluginName+"/"+command, newPlugins[pluginName].modmap.locks[command]);
    }

    let newState = Object.assign(this.state);
    newState.modmap.plugins = newPlugins;
    newState.modmap.modlocks.plugins = newPluginLocks;
    this.setState(newState);
  }

  switchTab(e){
    let tabName = e.currentTarget.getAttribute("name");
    console.log(tabName);
    this.setState(Object.assign(this.state,{tab:tabName, navOpen:false}));
  }

  toggleNavigation(e){
    this.setState(Object.assign(this.state,{navOpen:!this.state.navOpen}));
  }

  showPluginUtility(pluginname){
    this.setState(Object.assign(this.state, {
      utilOpen:true,
      utilityURL:window.location.origin+"/utility/"+pluginname
    }));
  }

  closePluginUtility(){
    this.setState(Object.assign(this.state, {
      utilOpen:false,
      utilityURL:null
    }));
  }

  blacklistViewer(viewer){
    let newModmap = Object.assign(this.state.modmap);
    newModmap.modlocks.blacklist[viewer] = true;
    this.sendOSC("/mod/"+this.state.moduser+"/blacklist/"+viewer, newModmap.modlocks.blacklist[viewer]==true?1:0);
    this.setState(Object.assign(this.state, {modmap:newModmap}));
  }

  unblacklistViewer(viewer){
    let newModmap = Object.assign(this.state.modmap);
    newModmap.modlocks.blacklist[viewer] = false;
    this.sendOSC("/mod/"+this.state.moduser+"/blacklist/"+viewer, newModmap.modlocks.blacklist[viewer]==true?1:0);
    this.setState(Object.assign(this.state, {modmap:newModmap}));
  }

  authenticate(e){
    e.preventDefault();
    let modcode = document.querySelector(".auth-form [name=modcode]").value;
    let moduser = document.querySelector(".auth-form [name=moduser]").value;
    

    fetch(window.location.origin+"/mod/authentication",{
      method:"POST",
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body:JSON.stringify({
        code:modcode,
        moduser:moduser
      })
    }).then(async response => {
      let res = await response.json();
      
      if(res.status == "active"){
        if(res.localUser){moduser = res.localUser}
        localStorage.setItem("moduser", moduser);
        await this.getModMap();

        this.setState(Object.assign(this.state, {loggedIn:true, status:res.status}));
      }else{
        this.setState(Object.assign(this.state, {status:res.status}))
      }
      
    })
  }

  render() {

    let navigation = null;

    if(this.state.loggedIn){
      navigation = <div className={"navigation "+(this.state.navOpen?"open":"")+(this.state.utilOpen?"util":"")}>
          <div className="navigation-open-button" onClick={this.state.utilOpen?this.closePluginUtility:this.toggleNavigation}>
            <img src={this.state.utilOpen?utilClose:hamburger} width="50px" height="50px"/>
          </div>
          <div className={"navigation-tab-buttons "+(this.state.navOpen?"open":"")}>
            <div name='events' className={"navigation-tab-button events "+(this.state.tab=="events"?"active":"")} onClick={this.switchTab}>Events</div>
            <div name='plugins' className={"navigation-tab-button plugins "+(this.state.tab=="plugins"?"active":"")} onClick={this.switchTab}>Plugins</div>
            <div name='blacklist' className={"navigation-tab-button blacklist "+(this.state.tab=="blacklist"?"active":"")} onClick={this.switchTab}>Blacklist</div>
            <div name='theme' className={"navigation-tab-button theme " + (this.state.tab=="theme"?"active":"")}onClick={this.switchTab}>Theme</div>
          </div>
        </div>;
    }
    
      if(this.state.loggedIn == true){
        
        var mainContent = null;
        if(this.state.utilOpen == false){

          console.log("RENDERING");
          if(this.state.modmap){
            let modmap = this.state.modmap;
            
            if(this.state.tab == "events"){
              let modEvents = modmap.events;
              let modEventLocks = modmap.modlocks.events;
              let eventGroups = {};
              for(let e in modEvents){
                if(modEventLocks[e]==true){console.log(modEvents[e].name,"LOCKED")}
                if(eventGroups[modEvents[e].group] == null){
                  eventGroups[modEvents[e].group] = [];
                }
                eventGroups[modEvents[e].group].push(
                  <EventCard key={e+"-"+modEventLocks[e]} eventname={e} displayname={modEvents[e].name} islocked={modEventLocks[e]==1} click={this.onEventClick}/>
                )
              }
              let eventGroupElements = [];
              for(let g in eventGroups){
                eventGroupElements.push(
                  <div className="event-group">
                    <h1>{g}</h1>
                    <div className="event-group-content">
                      {eventGroups[g]}
                    </div>
                  </div>
                )
              }
              mainContent = <div className="App events">
                {eventGroupElements}
              </div>;
            
            }else if(this.state.tab == "plugins"){
              let modPlugins = modmap.plugins;
              let modPluginLocks = modmap.modlocks.plugins;
              let pluginLocks = [];
              console.log(modPlugins, modPluginLocks);
              for(let p in modPlugins){
                pluginLocks.push(
                  <PluginCard key={p+"-"+modPluginLocks[p]} pluginname={p} modmap={modPlugins[p].modmap} utility={modPlugins[p].utility} showPluginUtility={this.showPluginUtility} islocked={modPluginLocks[p]==1} pluginLockClick={this.onPluginLockClick}/>
                )
              }

              mainContent = <div className="App column">
                {pluginLocks}
              </div>;

            }else if(this.state.tab == "blacklist"){
              console.log(modmap.modlocks);
              mainContent = <div className="App">
                <BlacklistViewer blacklist={modmap.modlocks.blacklist} onBlock={this.blacklistViewer} onUnblock={this.unblacklistViewer}/>
              </div>;
            }else if(this.state.tab == "theme"){
              mainContent = <div className="App">
                <ThemeEditor editStyle={originalStyle} saveTheme={()=>{this.sendOSC("/mod/"+this.state.moduser+"/save/theme", localStorage.getItem("theme"))}}/>
              </div>
            }
          }
        }
        
        
      }else{
        if(this.state.status == "initial"){
          if(window.location.protocol=="http:"){
            mainContent = <div className="App">
              <form className="auth-form" onSubmit={this.authenticate}>
                <input type="hidden" name="moduser" value="local"/>
                <input type="hidden" name="modcode" value="local"/>
                <button className="modcheck-button" type="submit">Login</button>
              </form>
            </div>;
          }else{
            mainContent = <div className="App">
              <form className="auth-form" onSubmit={this.authenticate}>
                <input type="text" name="moduser" placeholder="Twitch Username"/>
                <input type="password" name="modcode" placeholder="Password"/>
                <button className="modcheck-button" type="submit">Login</button>
              </form>
            </div>;
          }
        }else if(this.state.status == "new"){
          mainContent = <div className="App">
            <form className="auth-form">
              <div className="status-text">Got it! Now go into the broadcaster's chat and call '!mod verify' to finish setting your password.</div>
            </form>
            </div>;
        }else if(this.state.status == "stillpending"){
          mainContent = <div className="App">
            <form className="auth-form">
              <div className="status-text">You're still pending verification! Call '!mod verify' in the broadcaster's chat to finish setting your password</div>
            </form>
            </div>;
        }else if(this.state.status=="badpassword"){
          mainContent = <div className="App">
            <div className="status-text">Wrong Password...</div>
            <form className="auth-form" onSubmit={this.authenticate}>
                <input type="text" name="moduser" placeholder="Twitch Username"/>
                <input type="password" name="modcode" placeholder="Password"/>
                <button className="modcheck-button" type="submit">Login</button>
              </form>
            </div>;
        }

      }

    return <div className="top">
      {navigation}
        <iframe id="PluginUtilityFrame" className={this.state.utilOpen?"open":""} allowFullScreen="true" src={this.state.utilityURL}></iframe>
      {mainContent}
    </div>
  }

  async getOSCSettings(){
	
    var oscSettingsRaw = await fetch(window.location.origin+"/mod/authentication_info").then(response => response.json());
    oscSettings = oscSettingsRaw;
    console.log(oscSettings);
    if(oscSettings.oscURL.startsWith("https://")){
      oscSettings.oscURL = oscSettings.oscURL.substr("https://".length);
    }
    this.initOSC(oscSettings.oscURL, oscSettings.oscPort);
    
    let newState = Object.assign(this.state);
    newState.osc = oscSettings;
    this.setState(newState);
  }

  initOSC(serverIP, serverPort){
    console.log("INIT OSC", serverIP, serverPort);
    
    let tcpPlugin = null;
    if(serverPort == null){
      tcpPlugin = new ExtWebSocketPlugin({host:serverIP,port:serverPort,secure:true});
    }else{
      tcpPlugin = new OSC.WebsocketClientPlugin({host:serverIP,port:serverPort,secure:false});
    }
    this.osc = new OSC({plugin: tcpPlugin});
    var osc = this.osc;
    
      osc.open();
      osc.on("open", () =>{
          console.log("OSC OPEN");
      if(typeof this.onOSCOpen != "undefined"){
        this.onOSCOpen();
      }
      
      clearInterval(goodInterval);
      goodInterval = setInterval(()=>{
        
        if(osc.status() == 1){
          if(!oscConnected){
            //this.sendOSC('/mod/connect', 1.0);
          }
        }else{
          if(oscConnected){
            oscConnected = false;
            window.dispatchEvent(new Event("lost_connection"));
          }
          osc.open();
        }
        
      }, 1000);
      });
    
      osc.on('*', (message)=>{
          this.getOSCMessage(message);
      });
  }
  
  sendOSC(address, message){
    console.log("SENDING", address, message);
    this.osc.send(new OSC.Message(address, message));
  }
  
  onOSCOpen(){
  
  }
  
  getOSCMessage(message){
    let address = message.address.split("/");
    if(address[1] == "mod"){
      let newState = Object.assign(this.state);
      if(address[3] == "lock"){
        
        if(address[4] == "event"){
          let eventName = address[5];
          //console.log("EVENT CLICK", eventName);
          let newEvents = Object.assign(this.state.modmap.modlocks.events);
          newEvents[eventName] = message.args[0];
          
          newState.modmap.modlocks.events = newEvents;
          
        }else if(address[4] == "plugin"){
          let pluginName = address[5];
          if(address[6] == null){
            let newPlugins = Object.assign(this.state.modmap.modlocks.plugins);
            newPlugins[pluginName] = message.args[0];
            newState.modmap.modlocks.plugins = newPlugins;
          }else{
            let newPluginLocks = Object.assign(this.state.modmap.plugins[pluginName].modmap.locks);
            newPluginLocks[address[6]] = message.args[0];
            newState.modmap.plugins[pluginName].modmap.locks = newPluginLocks;
          }
        }
        
      }else if(address[3] == "blacklist"){
        let blUser = address[4];
        let newBlacklist = Object.assign(this.state.modmap.modlocks.blacklist);
        newBlacklist[blUser] = message.args[0];
        newState.modmap.modlocks.blacklist = newBlacklist;
      }
      this.setState(newState);
    }
  }
}

export default App;

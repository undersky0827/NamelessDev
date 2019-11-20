import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from './Navbar';
import ProjectList from './ProjectList';
import NewProjectForm from './NewProjectForm';
import LoginPage from './LoginPage';
import ProjectDetails from './ProjectDetails';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: 'Ethan',
      currentProject: '',
      masterProjectList: []
    }
    this.handleLogout = this.handleLogout.bind(this);
    this.handleAddingNewProject = this.handleAddingNewProject.bind(this);
    this.handleSettingCurrentProject = this.handleSettingCurrentProject.bind(this);
  }

  handleLogout() {    
    this.setState({currentUser: ''});
  }

  handleAddingNewProject(newProject){
    var copyProjectList = this.state.masterProjectList.slice();
    copyProjectList.push(newProject);
    this.setState({masterProjectList: copyProjectList});
  }

  handleSettingCurrentProject(projectId){
    console.log(projectId);
    console.log('app check');
    this.setState({currentProject: projectId});
  }

  getCurrentProject(){
    for (let i = 0; i < this.state.masterProjectList.length; i++){
      if (this.state.currentProject == this.state.masterProjectList[i].id){
        console.log(this.state.masterProjectList[i]);
        return this.state.masterProjectList[i];
      }
    }
  }

  render() {
    console.log('current project', this.state.currentProject);
    console.log(this.state.masterProjectList);
    return(
      <div>
        <Navbar onLogout={this.handleLogout} currentUser={this.state.currentUser}/>
        <div className='container'>
          <Switch>
            <Route exact path='/' render={() => <ProjectList 
              projectList={this.state.masterProjectList} 
              onSettingCurrentProject={this.handleSettingCurrentProject} />} />
            <Route path='/new-project' render={() => <NewProjectForm  
              onNewProjectCreation={this.handleAddingNewProject} />} />
            <Route path='/details' render={() => <ProjectDetails
              currentProject={this.getCurrentProject()} />} />
            <Route path='/sign-in' 
              component={LoginPage} />
          </Switch>
        </div>
      </div>
    );
  }

}

export default App;
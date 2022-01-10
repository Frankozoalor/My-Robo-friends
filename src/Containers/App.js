import React from "react";
import Cardlist from "../Components/Cardlist";
import SearchBox from "../Components/SearchBox";
import './App.css';
import Scroll from '../Components/scroll';
import ErrorBoundry from "../Components/ErrorBoundry";

class App extends React.Component {
    constructor(){
        super()
        this.state ={
            robot: [],
            searchField: ""
        }
    }
     componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(Response=>{return Response.json();})
        .then(users => {this.setState({robot: users})})
     }

    onSearchChange = (event) =>{
        this.setState({searchField: event.target.value})
        }

    

    render() {
        const filteredRobots = this.state.robot.filter(Robot =>{
            return Robot.name.toLowerCase().includes(this.state.searchField.toLowerCase())
        })
           if(this.state.robot.length===0){
               return <h1>Loading</h1>
           }
           else{
            return(
                <div className="tc">
                    <h1>RoboFriends</h1>
                    <SearchBox searchchange ={this.onSearchChange}/>
                    <Scroll> 
                    <ErrorBoundry>
                    <Cardlist Robot ={filteredRobots}/>
                    </ErrorBoundry>
                    </Scroll>
                </div>
            )
           
           }
        }
    }

  export default App;
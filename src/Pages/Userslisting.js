import React, {Component} from 'react';
import './Userslisting.css';
import Detail from '../Components/Detail';
import Aux from '../Components/Auxiliary';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Navbar} from 'react-bootstrap';
import PageLoader from '../Components/PageLoader';


toast.configure();
class Userslisting extends Component{


        state={
        details: [],
        loading: false
    }


    notifySuccess = (mssg) => {
        toast.info(mssg, {position: toast.POSITION.TOP_CENTER, autoClose: 3000});        
    }


    notifyDanger = (mssg) => {        
        toast.error(mssg, {position: toast.POSITION.TOP_CENTER, autoClose: 3000});
    }
    

    componentDidMount(){
        this.setState({loading: true});
        const methbody = {
            method: "GET",
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': localStorage.getItem('token') 
            }
        }      
        fetch('https://springboot-users-crud-jwt.herokuapp.com/api/users/', methbody)
            .then(response => {
                response.json().then(result => {
                    //console.log("result", result);
                    if(result.status === 'success'){
                        this.setState({details: result.users});
                        //console.log(result.users);
                        this.notifySuccess('All users data is fetched successfully'); 
                        this.setState({loading: false});
                        console.log("state: ", this.state.details);
                    }   
                    else{
                        this.notifyDanger(result.message);
                        if(result.status === 401) this.props.history.push('/signin');
                    }
                }) 
            });            
        
    }   


    logoutHandler = () => {
        localStorage.removeItem("username");
        localStorage.removeItem("token");
        this.props.history.push('/signin');
    }
    

    render(){    


        console.log('inside render', this.state.details);

        let page = <PageLoader/>


        if(this.state.details){

            const detailsComponent = this.state.details.map(detail => {
                //this.dateStateHandler(detail.dateOfBirth);
                return <Detail 
                    id = {detail.id}
                    key = {detail.email}
                    firstName = {detail.firstName}
                    lastName = {detail.lastName}
                    email = {detail.email}
                    gender = {detail.gender}
                    dateOfBirth = {detail.dateOfBirth}
                    profilePhoto = {detail.profilePhoto}/>
                });


            page = (
                <section className="bg-light p-5 text-dark">
                    <div className="container">
                        <h1 className='heading text-center'>Users Listing</h1>
                        <table className='table table-hover'>
                            <thead className='thead-dark'>
                                <tr>
                                    <th>SNo</th>
                                    <th>Profile Photo</th>
                                    <th>Firstname</th>
                                    <th>Lastname</th>
                                    <th>Email</th>
                                    <th>Gender</th>
                                    <th>DOB</th>
                                    <th>Activity</th>
                                </tr>                        
                            </thead>
                            <tbody>
                                {(this.state.loading)? 
                                (<tr >
                                    <td>
                                        <PageLoader/>
                                    </td>
                                </tr>):
                                detailsComponent}  
                            </tbody>                    
                        </table>   
                    </div>
                </section>
            );
        } 


        return(                 
            <Aux>
                <Navbar bg='dark' variant="dark">
                    <Navbar.Brand>mywebsite.com</Navbar.Brand>     
                    <Navbar.Collapse className="justify-content-end">                         
                        <Navbar.Text> <span className='font-weight-bold'>Signed in as:</span> {localStorage.getItem('username')}  </Navbar.Text>                                                    
                    </Navbar.Collapse>   
                    <Navbar.Collapse className="justify-content-end">
                        <input type='button' href="/signin" className='btn btn-outline-light' onClick={this.logoutHandler} defaultValue='Logout'/>
                    </Navbar.Collapse>                                     
                </Navbar>                
                {page}                      
            </Aux>            
        );
    }
}


export default Userslisting;
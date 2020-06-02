import React, {Component} from 'react';
import Aux from '../Components/Auxiliary';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Navbar} from 'react-bootstrap';
import PageLoader from '../Components/PageLoader';


toast.configure();
class Editdetail extends Component{


    state = {
        id: this.props.match.params.id,
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        gender: '',
        dateOfBirth:'',
        profilePhoto:'',
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
                'Authorization': localStorage.getItem('token') 
            }
        }                
        fetch('https://springboot-users-crud-jwt.herokuapp.com/api/users/' + this.props.match.params.id , methbody)
            .then(response => {
                response.json().then(result => {
                    console.log("result_editdetail_get", result);
                    if(result.status === 'success'){
                        
                        this.setState({firstName: result.user.firstName,
                            lastName: result.user.lastName,
                            email: result.user.email,
                            password: result.user.password,
                            gender: result.user.gender,
                            dateOfBirth: result.user.dateOfBirth,
                            profilePhoto: result.user.profilePhoto
                        });
                        const newDate = this.formatDate(this.state.dateOfBirth);
                        this.setState({dateOfBirth: newDate});
                        console.log("this.state: after setting the state\n", this.state);
                        
                        this.notifySuccess('User\'s data is fetched successfully');       
                        this.setState({loading: false});                  
                    }
                    else{
                        this.notifyDanger(result.message);
                        if(result.status === 401) this.props.history.push('/signin');
                    }                    
                }) 
            });
    }  


    updateHandler = () => {
        this.setState({loading: true}); 
        const methbody = {
            method: "PUT",
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')              
            },
            body: JSON.stringify(this.state)
        }
        fetch('https://springboot-users-crud-jwt.herokuapp.com/api/users', methbody)
            .then(response => response.json().then(result => {
                
                console.log("result_editdetail_put", result);
                if(result.status === 'success'){                    
                    this.setState({loading: false});
                    this.props.history.push('/userslisting');
                    this.notifySuccess('User details are successfully updated'); 
                }   
                else{
                    this.notifyDanger(result.message);
                    if(result.status === 401) this.props.history.push('/signin');
                }            
            }));
    }
    

    genderHandler = (event) => {
        this.setState({gender: event.target.value});
    } 
    
    
    logoutHandler = () => {
        localStorage.removeItem("username");
        localStorage.removeItem("token");
        this.props.history.push('/signin');
    }


    formatDate = (oldDate) => {
        return oldDate.toString().split("-").reverse().join("-");
    }

    
    dateStateHandler = (event) => {
        let changedDate = this.formatDate(event.target.value);
        this.setState({dateOfBirth: changedDate});
        console.log(this.state.dateOfBirth);
    } 

    render(){        
        console.log('inside render state: ', this.state);

        const editdetailPage = (
            <div className="container">
                <div className="row">
                    <div className="col-lg-2 col-md-2"></div>
                    <div className="col-lg-8 col-md-8">
                        <div className="ui">
                            <h1 className="heading text-center" > Edit Details </h1>
                            <br/>
                            
                            <form className="form-group text-center">


                                <div className="row">
                                    <div className="col-lg-6">
                                        <label>First Name:</label>
                                        <input type='text' className='form-control' defaultValue={this.state.firstName} onChange={(event) => this.setState({firstName: event.target.value})}/>                                            
                                    </div>

                                    <div className="col-lg-6">
                                        <label>Last Name:</label>
                                        <input type='text' className="form-control" defaultValue={this.state.lastName} onChange={(event) => this.setState({lastName: event.target.value})}/> 
                                    </div>
                                </div>
                                <br/>


                                <label>E-mail</label>
                                <input type='email' className="form-control" defaultValue={this.state.email} onChange={(event) => this.setState({email: event.target.value})}/>
                                <br/>  


                                <div className="row">
                                    <div className="col-lg-6">
                                        <label>Gender: </label>
                                    </div>
                                    <div className="col-lg-6">
                                        <input type="radio" id="male" name="gender" defaultValue='male' checked={this.state.gender === 'male'} onChange={this.genderHandler}/> <label htmlFor="male">Male</label>
                                        <input type="radio" id="female" name="gender" defaultValue='female' checked={this.state.gender === 'female'} onChange={this.genderHandler}/> <label htmlFor="female">Female</label>
                                    </div>
                                </div>
                                <br/>


                                <label>Date of birth</label>
                                <input type='date' className="form-control" defaultValue={this.state.dateOfBirth} onChange={this.dateStateHandler}/>                                  
                                <br/>   
                        
                                <input type='button' className="btn btn-info btn-block btn-md" onClick={this.updateHandler} defaultValue='Update the Changes'/>                                   


                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
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

                {(this.state.loading)?<PageLoader/>:editdetailPage}  
                
                <br/><br/><br/>



                {/* <h1>Edit Details</h1>
                <p>First name: <input type='text' defaultValue={this.state.firstName} onChange={(event) => this.setState({firstName: event.target.value})}/></p>
                <p>Last Name: <input type='text' defaultValue={this.state.lastName} onChange={(event) => this.setState({lastName: event.target.value})}/> </p> 
                <p>Email: <input type='email' defaultValue={this.state.email} onChange={(event) => this.setState({email: event.target.value})}/></p>
                <p>Gender: 
                    <input type="radio" id="male" name="gender" defaultValue='male' checked={this.state.gender === 'male'} onChange={this.genderHandler}/> <label htmlFor="male">Male</label>
                    <input type="radio" id="female" name="gender" defaultValue='female' checked={this.state.gender === 'female'} onChange={this.genderHandler}/> <label htmlFor="female">Female</label> </p>                           
                <p>dateOfBirth: <input type='date' defaultValue={this.state.dateOfBirth} onChange={(event) => this.setState({dateOfBirth: event.target.value})}/> </p> 
                <button onClick={this.updateHandler}>Update the Changes</button> */}
            </Aux> 
        );
    }
}


export default Editdetail;
import React, {Component} from 'react';
import Aux from '../Components/Auxiliary';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Button} from 'react-bootstrap';
import './Signin.css';
import PageLoader from '../Components/PageLoader';

toast.configure();
class Signin extends Component{
    

    state = {
        email: '',
        password: '',
        loading: false
    }    
    

    notifySuccess = (mssg) => {
        toast.info(mssg, {position: toast.POSITION.TOP_CENTER, autoClose: 3000});        
    }


    notifyDanger = (mssg) => {        
        toast.error(mssg, {position: toast.POSITION.TOP_CENTER, autoClose: 3000});
    }


    onLoginHandler = () => {
        this.setState({loading: true});
        const methbody = {
            method: "POST",
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(this.state)
        }        
        fetch('https://springboot-users-crud-jwt.herokuapp.com/api/auth/signin', methbody)
            .then(response => response.json().then(result => {
                //console.warn("result signin_post", result);
                if(result.status === 'success'){
                    localStorage.setItem('token', 'Bearer '+ result.data.accessToken);
                    localStorage.setItem('username', result.data.username);
                    this.notifySuccess('logged in successfully');
                    this.setState({loading: false});
                    //console.log('display success mssg (signin_post)', result.message);
                    this.props.history.push('/userslisting');                    
                }   
                else{
                    this.notifyDanger(result.message);
                    if(result.status === 401) this.props.history.push('/signin');
                    //console.log('display error mssg (signin_post):', result.message);
                }  
            }));        
    }     


    onSignupHandler = () => {
        this.props.history.push('/signup');
    }


    

    render(){
        const signinPage = (
            <div className="container">
                <div className="row">
                    <div className="col-3 "></div>
                    <div className="col-6">
                        <div className="ui">

                            <h1 className="heading text-center" > Sign in </h1>
                            <br/>  

                            <form className="form-group text-center">
                                <div className="row">
                                    <div className="col">
                                        <input type='email' onChange={(event) => this.setState({email: event.target.value})} className='form-control' placeholder='Enter your email'/>
                                    </div>
                                </div>
                                <br/>

                                <div className="row">
                                    <div className="col">
                                    <input type='password' onChange={(event) => this.setState({password: event.target.value})} className='form-control' placeholder='Enter your password'/>
                                    </div>
                                </div>
                                <br/>

                                <div className="row">
                                    <div className="col-lg-6">
                                        <Button onClick={this.onLoginHandler} className="btn btn-info btn-block btn-md" >Login</Button> 
                                    </div>   
                                    <div className="col-lg-6">
                                        <Button onClick={this.onSignupHandler} className="btn btn-secondary btn-block btn-md" >Sign up</Button>
                                    </div>
                                </div>
                                <br/>

                            </form>

                        </div>
                    </div>
                </div>
            </div>
        );


        return(
            <Aux>              
                {(this.state.loading)?<PageLoader/>:signinPage}   
            </Aux>    
        );
    }
}


export default Signin;
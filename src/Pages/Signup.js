import React, {Component} from 'react';
import Aux from '../Components/Auxiliary';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Signup.css';
import PageLoader from '../Components/PageLoader';
import './SignupValidation.css';


toast.configure();
class Signup extends Component{


    state = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        gender: '',
        dateOfBirth:'',
        profilePhoto:'',
        loading: false,
        firstNameError: '', 
        lastNameError: '',
        emailError: '',
        passwordError: '',
        genderError: '',
        dateOfBirthError: '',
        profilePhotoError: ''
    }


    notifySuccess = (mssg) => {
        toast.info(mssg, {position: toast.POSITION.TOP_CENTER, autoClose: 3000});        
    }


    notifyDanger = (mssg) => {        
        toast.error(mssg, {position: toast.POSITION.TOP_CENTER, autoClose: 3000});
    }


    validate = () => {

        let firstNameError = ''; 
        let lastNameError =  '';
        let emailError =  '';
        let passwordError =  '';
        let genderError =  '';
        let dateOfBirthError =  '';
        let profilePhotoError = '';
        

        if(!this.state.firstName){
            firstNameError = 'firstName cannot be blank';
        }


        if(!this.state.lastName){
            lastNameError = 'lastName cannot be blank';
        }


        if(!this.state.email){
            emailError = 'email cannot be blank';
        }
        if(!this.state.email.includes('@')){
            emailError = 'invalid email'; 
        }


        if(!this.state.password){
            passwordError = 'password cannot be blank';
        }


        if(!this.state.gender){
            genderError = 'gender cannot be blank';
        }


        if(!this.state.dateOfBirth){
            dateOfBirthError = 'dateOfBirth cannot be blank';
        }


        if(!this.state.profilePhoto){
            profilePhotoError = 'profilePhoto cannot be blank';
        }


        if(firstNameError || lastNameError || emailError || passwordError || genderError || dateOfBirthError || profilePhotoError){               
            this.setState({firstNameError, lastNameError, emailError, passwordError, genderError, dateOfBirthError, profilePhotoError});  
            return false;
        }

        return true;

    }


    onRegisterHandler = () => {    
        const isValid = this.validate();
        if(isValid) {
            this.setState({loading: true});      
            console.log(this.state);
            const methbody = {
                method: "POST",
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state)
            }        
            fetch('https://springboot-users-crud-jwt.herokuapp.com/api/auth/signup', methbody)
                .then(response => response.json().then(result => {
                    console.warn("result signup_post", result);
                    if(result.status === 'success') {  
                        //console.log('display success mssg (signup_post):', result.message);   
                        this.notifySuccess('User has been successfully registered'); 
                        this.props.history.push('/signin');
                        this.setState({loading: false});                      
                    }
                    else {
                        this.notifyDanger(result.message);
                        this.props.history.push('/signin');
                        if(result.status === 401) this.props.history.push('/signin');
                        this.setState({loading: false});      
                        //console.log('display error mssg (signup_post):', result.message);
                    }
                }) );
        }        
    }


    onLoginHandler = () => {
        this.props.history.push('/signin');
    }


    genderHandler = (event) => {
        this.setState({gender: event.target.value});
    }


    selectFileHandler = (event) => {
        // console.log(event.target.files[0]);
        const reader = new FileReader();

        reader.onload = () => {
            const base64img = reader.result; 
            this.setState({profilePhoto: base64img});
            // console.log(base64img, this.state.profilePhoto);
        }

        reader.readAsDataURL(event.target.files[0]); 
    }


    formatDate = (oldDate) => {
        return oldDate.toString().split("-").reverse().join("-");
    }
    
    dateStateHandler = (event) => {
        let changedDate = this.formatDate(event.target.value);
        this.setState({dateOfBirth: changedDate});
        console.log(this.state.dateOfBirth);
    }   


    // handleFiles = (files) => {
    //     console.log(files.base64, files.fileList);
    //     this.setState({profilePhoto: files.base64});
    // }


    render(){
        const signupPage = (
            <div className="container">
                <div className="row">
                    <div className="col-lg-2 col-md-2"></div>
                    <div className="col-lg-8 col-md-8">
                        <div className="ui">

                            <h1 className="heading text-center" > Sign up </h1>
                            <br/>
                            
                            <form className="form-group text-center">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <label>First Name:</label>
                                        <input type='text' placeholder="Enter your First name..." className='form-control' onChange={(event) => this.setState({firstName: event.target.value})} />
                                        <div className='errormssg'>{this.state.firstNameError}</div>
                                    </div>
                                    <div className="col-lg-6">
                                        <label>Last Name:</label>
                                        <input type='text' placeholder="Enter your Last name..." className="form-control" onChange={(event) => this.setState({lastName: event.target.value})} />  
                                        <div className='errormssg'>{this.state.lastNameError}</div> 
                                    </div>
                                </div>
                                <br/>

                                <label>E-mail</label>
                                <input type='email' className="form-control" placeholder="Enter your Email..." onChange={(event) => this.setState({email: event.target.value})} />
                                <div className='errormssg'>{this.state.emailError}</div>
                                <br/>

                                <label>Password</label>
                                <input type='password' className="form-control" placeholder="Enter your Password..." onChange={(event) => this.setState({password: event.target.value})} /> 
                                <div className='errormssg'>{this.state.passwordError}</div>
                                <br/>       

                                <div className="row">
                                    <div className="col-lg-6">
                                        <label>Gender: </label>
                                    </div>
                                    <div className="col-lg-6">
                                        <input type="radio" id="male" name="gender" defaultValue='male' defaultChecked={this.state.gender === "male"} onChange={this.genderHandler}/> <label htmlFor="male">Male</label>
                                        <input type="radio" id="female" name="gender" defaultValue='female' defaultChecked={this.state.gender === "female"} onChange={this.genderHandler}/> <label htmlFor="female">Female</label>
                                    </div>                                    
                                </div>
                                <div className='errormssg' >{this.state.genderError}</div>
                                <br/>

                                <label>Date of birth</label>
                                <input type='date' className="form-control" onChange={this.dateStateHandler} /> 
                                <div className='errormssg'>{this.state.dateOfBirthError}</div>                                   
                                <br/>   

                                <label htmlFor="img">Profile photo </label>
                                <input type="file" id="img" onChange={this.selectFileHandler} className="form-control" name="img" accept="image/*"/>
                                <div className='errormssg'>{this.state.profilePhotoError}</div>      
                                <br/>                                                       

                                <div className="row">
                                    <div className="col-lg-6">
                                        <input type='button' className="btn btn-info btn-block btn-md" onClick={this.onRegisterHandler} defaultValue='Register'/>                                                                                      
                                    </div>
                                    <div className="col-lg-6">
                                        <input type='button' className="btn btn-secondary btn-block btn-md" onClick={this.onLoginHandler} defaultValue='Already have an account?'/>                                                                         
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
                {(this.state.loading)?<PageLoader/>:signupPage}  
            </Aux>
        );
    }
}


export default Signup;
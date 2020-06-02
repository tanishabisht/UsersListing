import React, {Component} from 'react';
import Aux from './Auxiliary';
import {withRouter} from 'react-router-dom';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Detail.css';
import PageLoader from './PageLoader';


toast.configure();
class Detail extends Component {



    state = {
        firstName: this.props.firstName,
        lastName: this.props.lastName,
        email: this.props.email,
        password: this.props.password,
        gender: this.props.gender,
        dateOfBirth: this.props.dateOfBirth,
        profilePhoto: this.props.profilePhoto,
        loading: false
    }


    notifySuccess = (mssg) => {
        toast.info(mssg, {position: toast.POSITION.TOP_CENTER, autoClose: 3000});        
    }


    notifyDanger = (mssg) => {        
        toast.error(mssg, {position: toast.POSITION.TOP_CENTER, autoClose: 3000});
    }
    

    deleteDetailHandler = () => {
        this.setState({loading: true});
        console.log("deleted detail state: ", this.state);
        const methbody = {
            method: "DELETE",
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token') 
            },
            body: JSON.stringify(this.state)
        }        
        fetch('https://springboot-users-crud-jwt.herokuapp.com/api/users/'+this.props.id , methbody)
            .then(response => {
                response.json().then(result => {
                    //console.log("result", result);
                    if(result.status === 'success'){
                        window.location.reload(true);
                        this.notifySuccess('User detail is deleted successfully'); 
                    }   
                    else{
                        this.notifyDanger(result.message);
                        if(result.status === 401) this.props.history.push('/signin');
                    }
                }) 
            });
    } 
    

    confirmDelete = () => {
        var r = window.confirm("Are you sure you want to delete!");
        if (r === true) {
        this.deleteDetailHandler();
        }
    }
    

    onEditHandler = () => {
        this.props.history.push('/editdetail/'+this.props.id);        
        localStorage.setItem('editId', this.props.id);
    }
    

    // componentDidMount = () => {
    //     base64img = this.state.profilePhoto;
    //     base64img.readDataAsURL
    //     let imgformat = btoa(this.state.profilePhoto);
    //     this.setState({profilePhoto: imgformat});
    // }

    render(){    
        
        const detailComponent = (
            <tr>
                <td></td>
                <td><iframe src={this.state.profilePhoto} title="profile_pic" frameBorder="0" height="80" width="80" scrolling="no"/></td>
                <td>{this.state.firstName}</td>
                <td>{this.state.lastName}</td>
                <td>{this.state.email}</td>
                <td>{this.state.gender}</td>
                <td>{this.state.dateOfBirth}</td>
                <td><input type='button' className='btn btn-primary btn-block btn-md' onClick={this.onEditHandler} defaultValue='Edit'/>
                    <input type='button' className='btn btn-danger btn-block btn-md' onClick={this.confirmDelete} defaultValue='Del'/>
                    {/* <button onClick={this.onEditHandler}>Edit</button>
                    <button onClick={this.confirmDelete}>Del</button> */}
                    </td>
            </tr>
        );

        return(
            <Aux>
                {(this.state.loading)?<PageLoader/>:detailComponent}  
            </Aux> 
        );
    }             
}


export default withRouter(Detail);
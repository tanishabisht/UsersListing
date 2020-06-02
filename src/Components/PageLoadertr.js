import React, {Component} from 'react';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from 'react-loader-spinner';
import './PageLoader.css';

export default class PageLoadertr extends Component {
    render() {
        return(
            <tr className='cssloader'>
                <td>
                    <Loader
                        type="Puff"
                        color="#00BFFF"
                        height={100}
                        width={100}
                        timeout={3000} 
                    />
                </td>                
            </tr>        
        );
    }
}
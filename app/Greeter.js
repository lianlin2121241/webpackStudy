/* var config = require("./config.json")
module.exports=function(){
    var greet=document.createElement("div");
    greet.textContent=config.greetText;
    return greet;
} */


import React,{Component} from 'react'
import config from './config.json'

import styles from './css/Greeter.css'
import less from './less/black.less'
import sass from './sass/black.scss'

class Greeter extends Component{
    render(){
        return (
            <div className={styles.root}>11
                {config.greetText}
                <div id="lessBox"></div>
                <div id="nav"></div>
            </div>
        )
    }
}
export default Greeter
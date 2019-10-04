import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Aux from '../../../hoc/Auxiliary';
import BackDrop from '../../UI/Backdrop/Backdrop';

const sidedrawer = (props) => {
    let attached = [classes.SideDrawer,classes.Close]
    if(props.open){
        attached = [classes.SideDrawer,classes.Open]
    }
    return (
        <Aux>
        <BackDrop show={props.open} clicked={props.closed}/>
        <div className={attached.join(' ')}>
            <div className={classes.Logo}>
                <Logo />
            </div>
            <nav>
                <NavigationItems />
            </nav>
        </div>
        </Aux>
    );
}

export default sidedrawer;
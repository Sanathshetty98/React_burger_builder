import React, {Component} from 'react';
import Aux from '../../hoc/Auxiliary';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import Sidedrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component{
    state={
        showSideDrawer:false
    }
    sideDrawerHandler = () => {
        this.setState( {showSideDrawer:false} );
    }
    sideDrawerToggleHandler = () =>{
        this.setState((prevState) => { 
            return{ showSideDrawer: !prevState.showSideDrawer};
        }
        );
    }
    render () {
        return(
            <Aux>
            <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
            <Sidedrawer 
            open = {this.state.showSideDrawer} 
            closed = {this.sideDrawerHandler}/>
            <main className={classes.Content}>
                    {this.props.children}
            </main>
            </Aux>
        );
    }
}

export default Layout;
import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { hashHistory } from 'react-router'
import { logout } from '../redux/modules';
import { connect } from 'react-redux';
export class AppHeader extends Component {
    
  constructor(props) {
        super(props);
        this.state = {
            active: 'dashboard'
        }
        this.handleItemClick = this.handleItemClick.bind(this);
    }

    handleItemClick(e, { name }) {
        this.setState({ activeItem: name })
        if(name === 'dashboard') {
          hashHistory.push(`/dashboard`)
        } else if (name === 'logout') {
          this.props.logout();
          hashHistory.push('/dashboard')
        } else {
          hashHistory.push(`/dashboard/${name}`)
        }
    }

    render() {
        const { user: { user } } = this.props;
        const { activeItem } = this.state;

        return (
            <Menu pointing secondary>
            {
              user && user !== '' && 
              <Menu.Item 
                name='dashboard' 
                active={activeItem === 'dashboard'} 
                onClick={this.handleItemClick} 
              />
            }
            {
              user && user !== '' &&
              <Menu.Item
                name='suppliers'
                active={activeItem === 'suppliers'}
                onClick={this.handleItemClick}
              />
            }
            {
              user && user !== '' &&
              <Menu.Item
                name='brands'
                active={activeItem === 'brands'}
                onClick={this.handleItemClick}
              />
            }
            {
              user && user !== '' &&
              <Menu.Item
                name='products'
                active={activeItem === 'products'}
                onClick={this.handleItemClick}
              />
            }
            {
              user && user !== '' &&
              <Menu.Item
                name='checkout'
                active={activeItem === 'checkout'}
                onClick={this.handleItemClick}
              />
            }
            {
              user && user !== '' &&
              <Menu.Item
                name='report'
                active={activeItem === 'report'}
                onClick={this.handleItemClick}
              />
            }
            {
              user && user !== '' &&
              <Menu.Menu position='right'>
                <Menu.Item
                  name='logout'
                  active={activeItem === 'logout'}
                  onClick={this.handleItemClick}
                />
              </Menu.Menu>
            }
        </Menu>
        )
    }
} 

const mapStateToProps = (state) => {
  return {
      user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      logout: () => dispatch(logout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppHeader);
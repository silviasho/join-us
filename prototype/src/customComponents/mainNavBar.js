import React from 'react';
import { useHistory } from 'react-router-dom';
import { cleareState } from '../redux/actions';
import { useDispatch } from 'react-redux';
import { Button, Dropdown, Menu,Icon } from 'semantic-ui-react';

export default function MainNavBarApp() {
    const history = useHistory()
    const dispatch = useDispatch()

   const handleLoguot=()=>{
    localStorage.removeItem('token');
    dispatch(cleareState())
    history.push("/")
   }

    return (
      <Menu size='large' color='teal' >
        <Menu.Item
          name='home'
          color='teal'
          icon='home'
          onClick={()=>{
            history.push('/mainScreen')
          }}
        />
        <Menu.Item color='teal'
          name='messages'
          icon='mail'
        />

        <Menu.Menu position='right' color='teal'>
          <Dropdown icon='align justify'  item text='Main' color='teal'>
            <Dropdown.Menu>
              <Dropdown.Item onClick={()=>{  history.push('/profileScreen')}}><Icon name='user outline'/>Profile</Dropdown.Item>
              <Dropdown.Item><Icon name='settings'/>Settings</Dropdown.Item>
              <Dropdown.Item onClick={handleLoguot}><Icon name='log out'/>Log Out</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Menu.Item>
            <Button color='teal'onClick={()=>{  history.push('/addJoinEventApp')}} ><Icon name='plus'/>Make A Join Event </Button>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    )
  
}
import { Component } from 'react'
import {Link} from "react-router-dom"
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

import HailRoundedIcon from '@mui/icons-material/HailRounded';
import ElectricMeterRoundedIcon from '@mui/icons-material/ElectricMeterRounded';
import PaidRoundedIcon from '@mui/icons-material/PaidRounded';
import EmojiPeopleRoundedIcon from '@mui/icons-material/EmojiPeopleRounded';

export default class Sidebar extends Component {
  render() {
    return (
    
        <Box sx={{ width: '100%', maxWidth: 180, height:"90vh", bgcolor: '#1B2430', color:"white", }}>
          <nav aria-label="main mailbox folders">
            <List>
              <ListItem disablePadding>
                <Link to="handeluser">
                <ListItemButton>
                  <ListItemIcon>
                  <EmojiPeopleRoundedIcon sx={{color:"white"}}/>
                  </ListItemIcon>
                  <ListItemText sx={{color:"white"}} primary="Customers" />
                </ListItemButton>
                </Link>
              </ListItem>
              <Divider />
              <ListItem disablePadding>
              <Link to="handelagent">
                <ListItemButton>
                  <ListItemIcon>
                 < HailRoundedIcon sx={{color:"white"}}/>
                  </ListItemIcon>
                  <ListItemText  sx={{color:"white"}} primary="Agents" />
                </ListItemButton>
                </Link>
              </ListItem>
              <Divider />
              <ListItem disablePadding>
              <Link to="metertype">
                <ListItemButton>
                  <ListItemIcon>
                  <ElectricMeterRoundedIcon sx={{color:"white"}}/>
                  </ListItemIcon>
                  <ListItemText  sx={{color:"white"}} primary="Meter Type" />
                </ListItemButton>
                </Link>
              </ListItem>
              
              <Divider />
              <ListItem disablePadding>
              <Link to="reports">
                <ListItemButton>
                  <ListItemIcon>
                 <PaidRoundedIcon sx={{color:"white"}}/>
                  </ListItemIcon>
                  <ListItemText  sx={{color:"white"}} primary="Reports" />
                </ListItemButton>
                </Link>
              </ListItem>
              <Divider />
              <ListItem disablePadding>
              <Link to="devices">
                <ListItemButton>
                  <ListItemIcon>
                 <PaidRoundedIcon sx={{color:"white"}}/>
                  </ListItemIcon>
                  <ListItemText  sx={{color:"white"}} primary="Devices" />
                </ListItemButton>
                </Link>
              </ListItem>
              <Divider />
            </List>
          </nav>
        </Box>
      );
  }
}


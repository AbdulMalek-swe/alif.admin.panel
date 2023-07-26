import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InfoIcon from '@mui/icons-material/Info';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';

import { Link, Outlet } from 'react-router-dom';
import { Avatar, Icon } from '@mui/material';
import { useSelector } from 'react-redux';
import img from 'assets/alef4final.PNG'
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
const drawerWidth = 240;
 
 const DashboardLayout = (props) => {
  const user = useSelector(state=>state.reducer.user)
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
const linkData = [ {links:'/dashboard',name:'Dashboard'},  {links:'/dashboard/uihome',name:'VeganData',},{links:'/dashboard/banner',name:'BannerData'},{links:'/dashboard/product',name:'Product',icons:<ShoppingCartIcon/>},{links:'/dashboard/made-order',name:'Made To Order',icons:<ListAltOutlinedIcon/>},{links:'/dashboard/inside-alif',name:'Inside Alif',icons:<InfoIcon/>}]
  const drawer = (
    <div className=' '>
        <img src={img} alt='loading...' className='w-full h-16 border'/>
      <List>
        {linkData.map((text, index) => (
          <ListItem key={index} as={Link} to={text.links} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                  {text.icons}
              </ListItemIcon>
              <ListItemText primary={text.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
  const container = window !== undefined ? () => window().document.body : undefined;
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
        className='border bg-white text-black'
      >
        <Toolbar  >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
           <div className=' w-full flex justify-end'>
           <IconButton  sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
              <div className='mx-2 text-center'>
                <h1>{user.first_name} {user.last_name}</h1>
                <h2>{user.role }</h2>
              </div>
              
           </div>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
        className='border-2'
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          className='black bg-black'
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
          className='black'
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Outlet/>
        
      </Box>
    </Box>
  );
}

DashboardLayout.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DashboardLayout;

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';
import List from 'material-ui/List';
import { MenuItem } from 'material-ui/Menu';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import ChevronRightIcon from 'material-ui-icons/ChevronRight';
import { mailFolderListItems, otherMailFolderListItems } from './tileData';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  appFrame: {
    height: 430,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  appBar: {
    position: 'absolute',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  'appBarShift-left': {
    marginLeft: drawerWidth,
  },
  // 'appBarShift-right': {
  //   marginRight: drawerWidth,
  // },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
   position: 'relative',
    width: drawerWidth,
  },
  //切换按钮
  drawerHeader: {   
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  'content-left': {
    marginLeft: -drawerWidth,
  },
  // 'content-right': {
  //   marginRight: -drawerWidth,
  // },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  'contentShift-left': {
    marginLeft: 0,
  },
  // 'contentShift-right': {
  //   marginRight: 0,
  // },
});
//  ---------------------
class PersistentDrawer extends React.Component {
  state = {
    open: false,
    anchor: 'left',
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  // handleChangeAnchor = event => {
  //   this.setState({
  //     anchor: event.target.value,
  //   });
  // };

  render() {
    const { classes, theme } = this.props;
    const {  open } = this.state;

    const drawer = (
      <Drawer
        variant="persistent"
       // anchor={anchor}
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>   
          <IconButton onClick={this.handleDrawerClose}>   {/*  切换为关闭 */}
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        {/* 分割线 */}
        <Divider />          
        <List>{mailFolderListItems}</List>
        <Divider />
        <List>{otherMailFolderListItems}</List>
      </Drawer>
    );

    let before = null;
    let after = null;

    // if (anchor === 'left') {
    //   before = drawer;
    // } else {
    //   after = drawer;
    // }

    return (
      <div
       className={classes.root}
      >
      {/* //切换左右 */}
        {/* <TextField
          id="persistent-anchor"
          select
          label="Anchor"
          value={anchor}
          onChange={this.handleChangeAnchor}          //改左右
          margin="normal"
        >
          <MenuItem value="left">left</MenuItem>
          <MenuItem value="right">right</MenuItem>
        </TextField> */}
        <div className={classes.appFrame}>
          <AppBar
            className={classNames(classes.appBar, {
             [classes.appBarShift]: open,                   
              [classes[`appBarShift-left`]]: open,               //可能不需要
            })}
          >
            <Toolbar disableGutters={!open}>
              <IconButton
              className={classes.menuButton}
                color="inherit"
                aria-label="open drawer"
                onClick={this.handleDrawerOpen}          //  切换隐藏为显示
                className={classNames(classes.menuButton, open && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="title" color="inherit" noWrap className={classes.flex}>
                title
              </Typography>
              <Button color="inherit">Login</Button>
            </Toolbar>
          </AppBar>
          {drawer}
          <main
            className={classNames(classes.content, classes[`content-left`], {
              [classes.contentShift]: open,
              [classes[`contentShift-left`]]: open,
            })}
          >
            <div className={classes.drawerHeader} />   
            <Typography>{'展示'}</Typography>
          </main>
         {/* {after} */}
        </div>
      </div>
    );
  }
}

PersistentDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(PersistentDrawer);
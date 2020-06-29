import React from 'react';
import { Button, Paper, Box, ButtonGroup, Popper, Grow, MenuItem, MenuList, ClickAwayListener, withStyles } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

const styles = theme => ({
  root: {
    position: 'absolute',
    top: 0, left: 0,
    width: '100%', height: '100%',
    backgroundColor: "#EEE",
  },
  header: {
    position: 'absolute',
    top: 0, left: 0,
    width: '100%', height: '50px',
    backgroundColor: theme.palette.primary.main,
    color: 'white'
  },
  headerLeft: {
    position: 'absolute',
    top: 0, left: 0,
    margin: theme.spacing(1),
    fontFamily: 'sans-serif',
    fontSize: '26px'
  },
  headerRight: {
    position: 'absolute',
    top: 0, right: 0,
    padding: 6
  },
  headerButtonGroup: {
    marginLeft: theme.spacing(1)
  },
  body: {
    position: 'absolute',
    top: 0, left: 0,
    width: '100%', height: '100%',
    backgroundColor: '#EEE',
    margin: 0,
    display: 'flex'
  },
  paper: {
    padding: theme.spacing(2),
    marginTop: '50px', marginRight: theme.spacing(1),
    fontFamily: 'sans-serif'
  },
  columnContainer: {
    position: 'relative',
    width: '100%',
    top: 0, bottom: 0,
    padding: theme.spacing(2),
    overflowX: 'scroll',
    whiteSpace: 'nowrap'
  },
  columnBox: {
    position: 'relative',
    width: '20%',
    display: 'inline-block',
    margin: theme.spacing(1),
    marginTop: 0
  },
  listName: {
    fontSize: '20px',
    display: 'block',
    marginBottom: '10px'
  }
});

class App extends React.Component {
  constructor () {
    super();
    this.state = {
      lists: [{name: '5/6B'}, {name: '5/6K'}, {name: '5/6C'}, {name: '5/6L'}, {name: '5/6J'}],
      headerMenuOpen: false
    };
    this.anchorRef = React.createRef();
  }
  toggleHeaderMenu () {
    this.setState({ headerMenuOpen: !this.state.headerMenuOpen });
  }
  handleClose (event) {
    if (this.anchorRef.current && this.anchorRef.current.contains(event.target)) {
      return;
    }
    this.toggleHeaderMenu();
  }
  render () {
    const { classes } = this.props;
    return (
      <Box className={classes.root}>
        <Box className={classes.body}>
          <Box className={classes.columnContainer}>
            {this.state.lists.map((list, index) => (
              <Box className={classes.columnBox} key={index}>
                <Paper className={classes.paper}>
                  <span className={classes.listName}>{list.name}</span>
                  <Button variant='contained' color='primary'>Test</Button>
                </Paper>
              </Box>
            ))}
          </Box>
        </Box>
        <Box className={classes.header}>
          <Box className={classes.headerLeft}>
            Class-ify | Class List Generator
          </Box>
          <Box className={classes.headerRight}>
            <ButtonGroup
              variant='contained' color='default'
              className={classes.headerButtonGroup}
            >
              <Button>Start over</Button>
              <Button>Keep working</Button>
            </ButtonGroup>
            <ButtonGroup
              variant='contained' color='default'
              className={classes.headerButtonGroup}
              ref={this.anchorRef}
            >
              <Button>Edit</Button>
              <Button>Save</Button>
              <Button size="small" onClick={this.toggleHeaderMenu.bind(this)}>
                <MoreHorizIcon />
              </Button>
            </ButtonGroup>
            <Popper open={this.state.headerMenuOpen} anchorEl={this.anchorRef.current} role={undefined} transition disablePortal>
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'}}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={this.handleClose.bind(this)}>
                      <MenuList id="split-button-menu">
                        <MenuItem onClick={(event) => console.log("hi")}>Open Saved Class List</MenuItem>
                        </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </Box>
        </Box>
      </Box>
    );
  }
}

export default withStyles(styles)(App);

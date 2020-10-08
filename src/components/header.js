import React from 'react';
import { Button, Box, ButtonGroup, Popper, Grow, MenuItem, MenuList,
         Paper, ClickAwayListener, makeStyles } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

export default function Header (props) {
  const classes = makeStyles(theme => ({
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
    }
  }))();

  const [menuOpen, setMenuOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const handleClose = event => {
    if (!anchorRef.current || !anchorRef.current.contains(event.target))
      setMenuOpen(!menuOpen);
  }

  return (
<Box className={classes.header + " cl-header"}>
  <Box className={classes.headerLeft}>
    Class Lists Generator App
  </Box>
  {!props.showOptions && (
    <a href='https://oliverbalfour.github.io/ClassListsGenerator/docs/instructions.html'
      style={{color:"white", fontSize:"20px", float: "right", fontFamily: "sans-serif", margin: "14px"}}
      target="_blank" rel="noopener noreferrer"
    >Instructions</a>
  )}
  { props.showOptions &&
  <Box className={classes.headerRight}>
    <Button
      onClick={props.viewIssues}
      color='default' variant='contained' style={{marginRight: "10px"}}
    >
      View issues ({props.issues.length})
    </Button>
    {props.state !== 'editing' &&
      <Button
        onClick={props.restart}
        color='default' variant='contained' style={{marginRight: "10px"}}
      >
        Restart
      </Button>
    }
    {props.state !== 'editing' &&
      <Button
        onClick={() => props.toggleState('working')}
        color='default' variant='contained'
      >
        {props.state === 'working' ? 'Stop' : 'Start'}
      </Button>
    }
    <ButtonGroup
      variant='contained' color='default'
      className={classes.headerButtonGroup}
      ref={anchorRef}
    >
      <Button onClick={() => props.toggleState('editing')}>
        {props.state === 'editing' ? 'Done Editing' : 'Edit'}
      </Button>
      {props.state !== 'editing' &&
        <Button onClick={props.undo}>Undo</Button>
      }
      {props.state !== 'editing' &&
        <Button onClick={props.save}>Save</Button>
      }
      {props.state !== 'editing' &&
        <Button size="small" onClick={() => setMenuOpen(!menuOpen)}>
          <MoreHorizIcon />
        </Button>
      }
    </ButtonGroup>
    <Popper open={menuOpen} anchorEl={anchorRef.current}
      transition disablePortal>
      {({ TransitionProps, place }) => (
        <Grow {...TransitionProps} style={{
          transformOrigin: place === 'bottom' ? 'center top' : 'center bottom'
        }}>
          <Paper>
            <ClickAwayListener onClickAway={handleClose}>
              <MenuList id="split-button-menu">
                <MenuItem component="label">
                  Import Spreadsheet (CSV)
                  <input type="file" style={{ display: "none" }}
                    onChange={e => {setMenuOpen(false); props.importCSV(e)}}/>
                </MenuItem>
                <MenuItem onClick={()=>{setMenuOpen(false); props.exportCSV()}}>
                  Export Spreadsheet (CSV)
                </MenuItem>
                <MenuItem onClick={()=>{
                  setMenuOpen(false); props.openListManager()
                }}>
                  See Saved Class Lists
                </MenuItem>
                <MenuItem onClick={props.reset}>
                  Clear saved data
                </MenuItem>
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  </Box>
  }
</Box>
  );
}

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

  const [headerMenuOpen, setHeaderMenuOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const handleClose = event => {
    if (!anchorRef.current || !anchorRef.current.contains(event.target))
      setHeaderMenuOpen(!headerMenuOpen);
  }

  return (
<Box className={classes.header}>
  <Box className={classes.headerLeft}>
    Class-ify | Class List Generator
  </Box>
  <Box className={classes.headerRight}>
    {props.state !== 'editing' &&
      <ButtonGroup
        variant='contained' color='default'
        className={classes.headerButtonGroup}
      >
        <Button onClick={props.restart}>Start over</Button>
        <Button onClick={() => props.toggleState('working')}>
          {props.state === 'working' ? 'Pause' : 'Keep working'}
        </Button>
      </ButtonGroup>
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
        <Button onClick={props.save}>Save</Button>
      }
      {props.state !== 'editing' &&
        <Button size="small" onClick={() => setHeaderMenuOpen(!headerMenuOpen)}>
          <MoreHorizIcon />
        </Button>
      }
    </ButtonGroup>
    <Popper open={headerMenuOpen} anchorEl={anchorRef.current}
      transition disablePortal>
      {({ TransitionProps, place }) => (
        <Grow {...TransitionProps} style={{
          transformOrigin: place === 'bottom' ? 'center top' : 'center bottom'
        }}>
          <Paper>
            <ClickAwayListener onClickAway={handleClose}>
              <MenuList id="split-button-menu">
                <MenuItem onClick={props.import}>
                  Import Spreadsheet (CSV)
                </MenuItem>
                <MenuItem onClick={props.export}>
                  Export Spreadsheet (CSV)
                </MenuItem>
                <MenuItem onClick={props.openListManager}>
                  See Saved Class Lists
                </MenuItem>
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  </Box>
</Box>
  );
}

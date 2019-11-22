import React from 'react';
import { fade, withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { Toolbar, AppBar, InputBase, Button} from '@material-ui/core';

const styles = (theme) => ({
    grow: {
      flexGrow: 1,
    },
    fab: {
        margin: theme.spacing(1),
        // marginLeft: '-'
        // marginLeft: theme.spacing(-10),
    },

    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
        position: 'relative',
        height: '8vh',
        margin: 'auto',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
    //   marginRight: theme.spacing(2),
    //   marginLeft: 0,
    // margin: '0 auto',
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
      width: theme.spacing(7),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
      width: '80vw',
      margin: '0 auto'
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 7),
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: 200,
      },
    },
    
  });
  

const search = (props) =>  {
    
    const { classes } = props;

    return(
        <div className={classes.grow}>
            <AppBar position="static">
                <Toolbar>
                    <form onSubmit={props.handleSearch} style={{
                        display: "flex",
                        margin: "0 auto"
                    }}>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                        <InputBase
                            placeholder="Search…"
                            id="search-field"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                
                        </div>
            
                        <Button 
                            variant="contained" 
                            aria-label="search" 
                            className={classes.fab}
                            onClick={props.handleSearch}
                        >   
                            Search
                        </Button>
                    </form>
                </Toolbar>
            </AppBar>
 
        </div>
    )
}

export default withStyles(styles)(search);
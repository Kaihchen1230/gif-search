import React from 'react';
import {CardActionArea, Card, CardActions, CardContent, CardMedia, Button, Typography, Grid } from '@material-ui/core';
import {  withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const styles = (theme) => ({
    root: {
        flexGrow: 1,
      },
      
      card: {
        margin: '2% auto',
        maxWidth: 400,
        padding: theme.spacing(2)
      },
      media: {
        height: '50vh'
      },
      tooltiptext: {
        visibility: 'hidden',
        width: '120px',
        backgroundColor: 'black',
        color: '#fff',
        textAlign: 'center',
        borderRadius: '6px',
        padding: '5px 0',
      
        /* Position the tooltip */
        position: 'absolute',
        zIndex: 1,
        '&:hover': {
          visibility: "visible",
        }
      }

  });


const displayGif = (props) => {

    const gifsData = [...props.gifsData]
    const { classes } = props;
        
        
    
    return(
        <div className={classes.root}>
            <Grid container spacing={2} >
            {gifsData.map(gif => (
                <Card className={classes.card} key={gif.id}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={gif.images.original.url}
                    title={gif.title}
                  />
                  <CardContent style={{width: "35vw", height:"100%"}}>
                  </CardContent>
                  <Typography gutterBottom variant="h5" component="h2" style={{maxWidth: "25vw", margin: "0 auto", fontSize: `${gif.title.length >= 25 ? "1.9em" : ''}`}}>
                      {gif.title ? gif.title : <br/>}
                    </Typography>
                </CardActionArea>
                <CardActions style={{display: 'flex', justifyContent: "space-around"}}>
                  <Tooltip title={props.copiedGifUrls[gif.id] ? "Paste the link in a new tab to view the GIF" : "Copy the gif link"} placement="bottom">
                    <CopyToClipboard text={`https://media.giphy.com/media/${gif.id}/giphy.gif`}>
                      <Button 
                        size="small" 
                        color="primary" 
                        onClick={props.handleCopiedUrl.bind(null, gif.id)}> 
                    {/* https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif */}
                        {/* {this.props.copied ? "Copied" : "Copy"} */}
                        {props.copiedGifUrls[gif.id] ? "Copied" : "Copy"}
                      </Button>
                    </CopyToClipboard>
                  
                  </Tooltip>
                  <Button size="small" color="primary" onClick={()=> window.open(`${gif.images.original.url}`, "_blank")}>
                    Learn More
                  </Button>
                </CardActions>
              </Card>
                
            ))}
        </Grid>
         
      </div>
    )
    
}

export default withStyles(styles)(displayGif)
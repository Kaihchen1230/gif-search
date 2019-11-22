import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import InfoIcon from '@material-ui/icons/Info';
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
                
                // <Grid item xs={6} sm={4} key={gif.id}>
                //   <Paper className={classes.paper}>
                //       <img src={gif.images.original.url} alt={gif.title} />
                //   </Paper>
                // </Grid>

                <Card className={classes.card}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={gif.images.original.url}
                    title={gif.title}
                  />
                  <CardContent style={{width: "35vw", height:"100%"}}>
                    
                    {/* <Typography variant="body2" color="textSecondary" component="p">
                      Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                      across all continents except Antarctica
                    </Typography> */}
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
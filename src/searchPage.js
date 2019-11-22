import React from 'react';
import axios from 'axios';
import { Grid, Paper, createMuiTheme } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import Search from './components/search';
import DisplayGif from './components/displayGif';
import './App.css'
const styles = () => ({
    
    paper: {
        margin: '0 20px',  
        padding: '20px',
        textAlign: 'center',
        color: 'black'
    },
    image: {
        width: '200px',
        height: '200px',
        padding: "20px"
    }
  });

class SearchPage extends React.Component{
    
    constructor(props){
        super(props);

        this.state = {
            API: 'wZsiqXhZwdKm3L3xrEXppxgtrxwKm0cK',
            keyword: '',
            gifs: [],
            loading: true,
            copiedUrl: {}
        }
        this.refList = {}
        
    }

    async componentDidMount() {
        
        const api_key = process.env.REACT_APP_GIPHY_API_KEY
        axios.get(`http://api.giphy.com/v1/gifs/trending?api_key=${api_key}&rating=g&limit=60`)
            .then(res => {
                console.log(res.data.data)
                let gifs = res.data.data;
                let copiedGifUrls = {}
                gifs.map(gif => {
                    const gifId = gif.id
                    copiedGifUrls[gifId] = false
                })
                this.setState({
                    gifs: gifs,
                    copiedUrl: {...copiedGifUrls}
                }, () => console.log('this is the state: ', this.state.gifs))
            })
    }    

    componentDidUpdate() {
        const images = document.querySelectorAll('.MuiPaper-root')

        console.log('this is images:', images)
    }
    
    handleSearch = async (event) => {
        event.preventDefault()
        const api_key = process.env.REACT_APP_GIPHY_API_KEY
        const searchKey = document.querySelector('#search-field').value
        console.log('this is searchkey: ', searchKey)
        axios.get(`http://api.giphy.com/v1/gifs/search?api_key=${api_key}&q=${searchKey}&rating=g&limit=60`)
            .then(res => {
                // console.log(res.data)
                let gifs = res.data.data;
                let copiedGifUrls = {}
                
                if(gifs.length){
                    gifs.map(gif => {
                        const gifId = gif.id
                        copiedGifUrls[gifId] = false
                    })
                    this.setState({
                        gifs: gifs,
                        copiedUrl: {...copiedGifUrls}
                    })
                }else{
                    this.setState({
                        gifs: [],
                        copiedGifUrls: {}
                    }, () => alert(`There is no gifs related to keyword: ${searchKey}`))
                    
                }
                
            })
    }

    handleCopyLink = (id, e) => {
        let currentCopiedGifUrls = this.state.copiedUrl
        currentCopiedGifUrls[id] = true
        this.setState({
            copiedUrl: {...currentCopiedGifUrls}
        })
    }



    render(){
        const { classes } = this.props;
        return(
            <div className={classes.root}>
                <div class="loader"></div>
                
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Search handleSearch={this.handleSearch}/>
                    </Grid>

                    <Grid item xs={12}>
                        
                        <DisplayGif 
                        gifsData={this.state.gifs}
                        handleCopiedUrl={this.handleCopyLink}
                        copiedGifUrls={this.state.copiedUrl}/>
                    </Grid>
                    
                </Grid>
            </div>
        )
    }
}

export default withStyles(styles)(SearchPage);
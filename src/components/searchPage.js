import React from 'react';
import axios from 'axios';
import { Grid, Paper, createMuiTheme } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import './style.css'
import CircularSpinner from "./circular";
import Search from './search';
import DisplayGif from './displayGif';

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
            loadingGifs: {},
            imageStatus: 'loading',
            topics: ['Animal', 'Holidays', 'Artists', 'Sports', 'Entertainment', 'Gaming', 'Food & Drink', 'Emotions', 'Reaction', 'Laugh', 'nah', '90s'],
            copiedUrl: {}
        }
        this.refList = {}
        
    }

    async componentDidMount() {
        

        axios.get(`http://api.giphy.com/v1/gifs/trending?api_key=${this.state.API}&rating=g&limit=60`)
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

    componentDidUpdate(){
        
    }

    creatRefList = () => {
        let gifs = this.state.gifs
        let loadingGifs = {}
        gifs.map(gif => {
            this.refList[gif.id] = React.createRef()
            loadingGifs[gif.id] = true

        })

        this.setState({
            loadingGifs: loadingGifs
        })
    }

    
    


    handleSearch = async (event) => {
        event.preventDefault()

        const searchKey = document.querySelector('#search-field').value
        console.log('this is searchkey: ', searchKey)
        axios.get(`http://api.giphy.com/v1/gifs/search?api_key=${this.state.API}&q=${searchKey}&rating=g&limit=60`)
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
                    }, () => {console.log('this is the gif after search: ', this.state.gifs)
                    this.creatRefList()
                })
                }else{
                    this.setState({
                        gifs: [],
                        copiedGifUrls: {}
                    })
                    alert('there is no data')
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
        <Grid container spacing={3}>
            <Grid item xs={12}>
                
                    <Search handleSearch={this.handleSearch}/>
            </Grid>
            <Grid item xs={12}>
                
            <DisplayGif 
                gifsData={this.state.gifs}
                handleCopiedUrl={this.handleCopyLink}
                copiedGifUrls={this.state.copiedUrl}

            />
            </Grid>
            
        </Grid>
        
    </div>
                   
        )
    }
}

export default withStyles(styles)(SearchPage);
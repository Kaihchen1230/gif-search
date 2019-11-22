import React from 'react';
import axios from 'axios';
import { Grid, Paper, createMuiTheme } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import './style.css'
import CircularSpinner from "./circular";
import Search from './search';


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

  function imagesLoaded(currentImg) {
    //   console.log('this is parentNode: ', currentImg)
      
      if(currentImg.current){
          const img = currentImg.current.childNodes
        // const img = currentImg.current
        // console.log('this is img info: ', img, '\n')
          if(!img.complete){
            //   console.log('here')
              return false
            }
            return true
        }
        console.log('this is the current: ', currentImg.current)
      return true
    // const imgElements = [...parentNode.querySelectorAll("img")];
    // for (let i = 0; i < imgElements.length; i += 1) {
    //   const img = imgElements[i];
    //   if (!img.complete) {
        // return false;
    //   }
    // }
    // return true;
  }

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
            topics: ['Animal', 'Holidays', 'Artists', 'Sports', 'Entertainment', 'Gaming', 'Food & Drink', 'Emotions', 'Reaction', 'Laugh', 'nah', '90s']
        }
        this.refList = {}
        
    }

    async componentDidMount() {
        

        axios.get(`http://api.giphy.com/v1/gifs/trending?api_key=${this.state.API}&rating=g&limit=5`)
            .then(res => {
                // console.log(res.data.data)
                const gifs = res.data.data;
                this.setState({
                    gifs: gifs
                }, () => this.creatRefList())
            })
    }

    componentDidUpdate(){
        // console.log('update')
        
        if(!this.state.loading){
            this.setState({
                loading: true
            }, () => console.log('this is loading: ', this.state.loading))
        }
        // console.log('this is refList:', this.refList)
    }

    creatRefList = () => {
        // console.log('this is the state: ', this.state.gifs)
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

    handleImageLoaded =  (id) => {
        // this.setState({ imageStatus: 'loaded' });
        // console.log('this is hadnleloaded: ')
        
        // console.log('this is count: ', this.count)

        // this.setState({
            // loading: imagesLoaded(this.refList[id])
            // loading: false
        //   });
        // console.log('this is the id: ', id)
        // console.log('this is the refList: ', this.refList)
        // const currentId = id
        // let currentLoadingGif = {}
        // currentLoadingGif[currentId] = !imagesLoaded(this.refList[currentId])
        // const currentStateLoadingGifs = {...currentLoadingGif, ...this.state.loadingGifs}
        let currentStateLoadingGifs = this.state.loadingGifs
        currentStateLoadingGifs[id] = false
        console.log('this is currentStateLoadingGifs: ', currentStateLoadingGifs)
        this.setState({
            loadingGifs : currentStateLoadingGifs
        })
        
      }
    
    handleImageErrored(id) {
        // this.setState({ imageStatus: "failed to load" });
      }

    handleSearchChange = (event) => {
        event.preventDefault()

        const keyword = event.target.value
        this.setState({
            keyword: keyword
        })
    }

    handleSearch = async () => {
        // axios.get(`http://api.giphy.com/v1/gifs/search?api_key=${this.state.API}&q=${this.state.keyword}&rating=g&limit=40`)
        //     .then(res => {
        //         console.log(res.data)
        //         const gifs = res.data.data;
        //         this.setState({
        //             gifs: gifs
        //         }, () => {console.log('this is the gif after search: ', this.state.gifs)
        //         this.creatRefList()
        //     })
        //     })
    }

    renderSpinner() {
        if (!this.state.loading) {
          // Render nothing if not loading
          return null;
        }
        return (
          <span className="loader" />
        );
      }


    render(){
        // const info = this.state.trandingGif
        // console.log('this is loading: ', this.state.loading)
        // console.log('this is this.state.loadingGifs: ', this.state.loadingGifs)
        const { classes } = this.props;
        return(
            <div className={classes.root}>
        <Grid container spacing={3}>
            <Grid item xs={12}>
                
                <form onSubmit={this.handleSearch}>
                    {/* <input 
                        type="text"
                        onChange={this.handleSearchChange}/>
                    <button type="submit"> Search</button> */}
                    <Search handleSearch={this.handleSearch}/>
                </form>
            {/* <Paper className={classes.paper}>xs=12</Paper> */}
            </Grid>
            {/* {this.state.topics.map((topic) => (
            <Grid item xs={3} sm={4} key={topic}>
                <Paper >{topic}</Paper>
            </Grid>
        ))} */}
            
            {this.state.gifs.length ? (
                
                this.state.gifs.map(gif => (
                    // <Grid>
                     
                    <Paper  key={gif.id}
                    style={{backgroundColor: "black"}}
                    > 
                    {/* {this.renderSpinner()} */}
                    
                    <img src={gif.images.original.url} className={classes.image}  
                    ref={this.refList[gif.id]}
                    onLoad={() => this.handleImageLoaded(gif.id)}/>
                    
                    {
                        this.state.loadingGifs[gif.id] && (
                            <div className="image-container-overlay">
                                <CircularSpinner />
                            </div>
                        )
                    }
                    </Paper>
                    
                    //  </Grid>
                ))
            ): null}
            
            
            {/* <Grid item xs={6} sm={3}>
            <Paper className={classes.paper}>xs=6 sm=3</Paper>
            </Grid>
            <Grid item xs={6} sm={3}>
            <Paper className={classes.paper}>xs=6 sm=3</Paper>
            </Grid>
            <Grid item xs={6} sm={3}>
            <Paper className={classes.paper}>xs=6 sm=3</Paper>
            </Grid> */}
        </Grid>
    </div>
        
        // if (info.length){
        //     console.log('this is info: ',info)
        //     console.log('this is length: ', info.length)
        // }
        // return(
        //     <div>
            
        //         {info.length? (
        //             <ul>
        //             {info.map((img, index)=>( 
                            
                        
        //                     <li key={img.id}>
        //                         <img src={img.images.original.url}
        //                             onLoad={this.handleImageLoaded.bind(this)}
        //                             onError={this.handleImageErrored.bind(this)}/>
        //                             {this.state.imageStatus}
        //                     </li>
                        
        //             ))}
        //         </ul>
            
        //         ):null}
                   
        )
    }
}

export default withStyles(styles)(SearchPage);
import React from 'react';
import axios from 'axios';

class searchPage extends React.Component{
    
    constructor(props){
        super(props);

        this.state = {
            trandingGif: [],
            imageStatus: 'loading'
        }
    }

    componentDidMount() {
        const API = 'wZsiqXhZwdKm3L3xrEXppxgtrxwKm0cK';

        axios.get(`http://api.giphy.com/v1/gifs/trending?api_key=${API}&rating=g&limit=20`)
            .then(res => {
                console.log(res.data.data)
                const tranding = res.data.data;
                this.setState({
                    trandingGif: tranding
                })
            })
    }

    handleImageLoaded() {
        this.setState({ imageStatus: 'loaded' });
      }
    
    handleImageErrored() {
        this.setState({ imageStatus: "failed to load" });
      }

    render(){
        const info = this.state.trandingGif
        
        if (info.length){
            console.log('this is info: ',info)
            console.log('this is length: ', info.length)
        }
        return(
            <div>
            
                {info.length? (
                    <ul>
                    {info.map((img, index)=>( 
                            
                        
                            <li key={img.id}>
                                <img src={img.images.original.url}
                                    onLoad={this.handleImageLoaded.bind(this)}
                                    onError={this.handleImageErrored.bind(this)}/>
                                    {this.state.imageStatus}
                            </li>
                        
                    ))}
                </ul>
            
                ):null}
                   
            </div>
        )
    }
}

export default searchPage;
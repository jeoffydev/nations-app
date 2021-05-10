import React, {Component} from 'react';   
import ReactDOM from 'react-dom'; 
import {authAdminAccess } from '../auth/authService'; 
import Form from './../form/form'; 
import Joi from 'joi-browser'; 
import AddCategory from './add-category'; 
import { createHtml } from './../config/codehelper';   

//Import these 2 for api and http post
import { apiEndPoint } from '../config/apiEndPoint'; 
import axiosApiInstance from '../auth/httpService';  

import {PopupHeader, EditButton, AddButton} from './popup/popup-helper';  
import swal from 'sweetalert'; 

class Songs extends  Form{

    state = {
        dataSongs: {},
        data: { 
            id: '',
            songName: '',
            artist: '' 
        }, 
        externalSongUrl: '',
        youtTubeIFrame: '',
        comment: '',
        errors : {},
        popupName: ''  
        
        
    }
 


    constructor(props){
        super(props);
        
    }  

    //Joi schema
    schema = { 
        id : Joi.number().required(), 
        songName:  Joi.string().required(), 
        artist:  Joi.string().required(),  
    }

   

    componentDidMount(){   

        //Only admin access only
        authAdminAccess(this.props.itemProps); 

        const { dataSongs } = this.state; 

        axiosApiInstance.get(apiEndPoint('get-songs') ) 
        .then(res => {
            //console.log(res.data);
             this.setState( { dataSongs : res.data });  
        })    
         
    }

   
    
    handleSongDetails(song, songPopName ){
             
        const { data, popupName, externalSongUrl, youtTubeIFrame, comment   } = this.state;

        data.id = song.id; 
        data.songName = song.songName;  
        data.artist = song.artist;  
       
        this.setState({
            data, 
            popupName: songPopName, 
            externalSongUrl : song.externalSongUrl, 
            youtTubeIFrame :  song.youtTubeIFrame, 
            comment : song.comment  

        });

   }


   //Do submit all the forms
   doSubmit = async () =>{ 
        const {   data, externalSongUrl, youtTubeIFrame, comment  } = this.state;  
        
        //Stringify to json
        const dataObj = {
            "songName" : data.songName,
            "id": data.id, 
            "artist": data.artist,
            "externalSongUrl" : externalSongUrl,
            "youtTubeIFrame": youtTubeIFrame,
            "comment" : comment 
        }  
 
        
        //Send update request
        axiosApiInstance.put(apiEndPoint('update-song'),  dataObj )
        .then(res => { 
            try{
                //get the users again
                axiosApiInstance.get(apiEndPoint('get-songs') ) 
                .then(res => { 
                    this.setState( { dataSongs : res.data });   
                }) 
            }
            catch(e){
                console.log(e);
                return null;
            }  
        })  
    
    }

    //Delete song
    deleteSong = (id) =>{
        const { dataSongs } = this.state; 

        //console.log(id);

        swal({
            title: "Are you sure you want to delete this song?",
            text: "Once deleted, you will not be able to recover this song!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {

                    const dataObj = { 
                        "id": id,
                    }   
                     
                    //Send delete request
                    axiosApiInstance.delete(apiEndPoint('delete-song') + "/" + id   )
                    .then(res => { 
                        try{
                            //console.log(res.data.value)
                             this.setState( { dataSongs : res.data.value});  
                        }
                        catch(e){
                            return null;
                        }  
                })  

                swal("Song has been deleted!", {
                    icon: "success",
                });
                 
            } else {
              swal("Song is safe!");
            }
          });

    }
    
    independentFormChange =(e)=>{
        const {  externalSongUrl, youtTubeIFrame, comment } = this.state;  
        const { currentTarget: input } = e;  
        const target = e.target;
        var value = target.value;
        var name = target.name; 

        if(name === 'externalSongUrl'){
            this.setState({ externalSongUrl: value })
        }

        if(name === 'youtTubeIFrame'){
            this.setState({ youtTubeIFrame: value })
        }

        if(name === 'comment'){
            this.setState({ comment: value })
        } 
    }
  

    render(){ 
        
        const { dataSongs, data, popupName, externalSongUrl, youtTubeIFrame, comment } = this.state; 
        //console.log(dataSongs, data, popupName);

        /* Filter here  */
 
        var songArray = [];
        for (let value of Object.values(dataSongs)) { 
            var arrayPush = {'id': value.id, 'songName': value.songName, 'artist': value.artist, 'externalSongUrl': value.externalSongUrl, 'youtTubeIFrame': value.youtTubeIFrame, 'comment': value.comment  }
            songArray.push(arrayPush);
        } 

        const songList = songArray.map( (song) => {
 
            var songPopName = song.songName.split(" ").join(""); 
            return (
                 

                    <div className="collapse-div-container" key={song.id}>
                        <a className="btn btn-primary btn-block teal" data-toggle="collapse" href={'#songCollapse'  + song.id} role="button" aria-expanded="false" aria-controls="songCollapse">
                            {song.songName} - {song.artist}   <span className="margin-right pull-right" onClick={()=>this.deleteSong(song.id)}><i className="fa fa-trash"></i></span>
                        </a>  
                        <div className="collapse" id={'songCollapse'  + song.id}>
                            <div className="card card-body">

                            <div className="row">
                                <div className="col-md-3">
                                    <span onClick={()=>this.handleSongDetails(song, songPopName)} >
                                        <EditButton idname={songPopName} id={song.id} label="Edit Song" /> <br />
                                    </span>
                                </div>
                                <div className="col-md-9">
                                    <p>Artist: {song.artist} </p>
                                    {song.externalSongUrl && <p> Link: <a href={song.externalSongUrl} target='_blank'>{song.externalSongUrl}</a> </p>}
                                    <div dangerouslySetInnerHTML={createHtml(song.youtTubeIFrame)} /> 
                                    {song.comment && <p> Additional comment:<br />  {song.comment} </p>}
                                    
                                </div>
                            </div>


                             <div className="modal fade" id={songPopName + 'Modal' + data.id}  tabIndex="-1" role="dialog" aria-labelledby="popModalLabel" aria-hidden="true">
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content"> 
                                        <PopupHeader idname="song" label={'Edit ' + data.songName} />  
                                        <div className="modal-body text-left">  
                                            <form className="form-signin" onSubmit={this.handleSubmit} noValidate> 
                                                {this.renderInputEdit('id', '', 'hidden',  data.id )}  
                                                {this.renderInputEdit('songName', 'Song Name', 'text', data.songName  )}
                                                {this.renderInputEdit('artist', 'Artist', 'text', data.artist  )}
                                                {this.renderInputIndependent('externalSongUrl', 'External Link', 'text', externalSongUrl )}
                                                {this.renderTextareaIndependent('youtTubeIFrame', 'Youtube IFrame', 'text', youtTubeIFrame )}
                                                {this.renderTextareaIndependent('comment', 'Additional Info', 'text', comment)}
                                                {this.renderButton('Update')}  
                                            </form>  
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button> 
                                        </div>
                                    </div>
                                </div>
                            </div>   


                              
                            </div>
                        </div>
                    </div> 
                
            )
        })
         
        return (  
            <React.Fragment> 
                   
                    <main className="container whitebg text-left body-content"> 
                        <div className="row">
                            <div className="col-md-12">
                                <h2> <i className="fa fa-sticky-note"></i> Songs </h2> 

                                <div className="row">
                                    <div className="col-md-3">
                                        
                                    </div> 
                                    <div className="col-md-9">  
                                        
                                    </div>
                                </div>
                                 

                                <div className="row">
                                    <div className="col-md-12">

                                     
                                        {songList} 
                                     
                                         
                                    </div>  
                                </div>
                                
                                 
                            </div>
                        </div> 
                    </main> 

                   


                   

           </React.Fragment>
        )
    }
}

export default  Songs;
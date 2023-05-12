const messagesContainer = document.querySelector('.chat-messages');
const input = document.querySelector('.chat-input input');
const button = document.querySelector('.chat-input button');
const token = "BQAHxltlL_RR5O0EKLmOvYJnugy8Ykk1XhWeXtjpyv7FloMc3TJ646FCkdTN1RtLwEIfy6oOY57AxZEQz2o4PXP4VG_7BOUa-CUT9GW5rKSx_Ea0FTp-";

function spotify_search_track(text){
  
var query1 = text
var url1 = "https://api.spotify.com/v1/search?q="+ query1+ "&type=track&limit=5" 

//const axios = require("axios");

axios.get(
  url1,
  {
    headers: {
           
        Authorization: `Bearer ${token}` ,
    },
  }
).then((result)=>
{
    // console.log(result.data);
    res= result.data;
    console.log("<-------TRACK SEARCH------>")
    var i = 0;
    do{
      var j= i+1;
    console.log("Album Name:" + res.tracks.items[i].album.name);
    var artname = (res.tracks.items[i].album.artists)
    console.log("Artist Name:"+ artname[0].name);
    var final_search= j + ")Album Name:" + res.tracks.items[i].album.name + "\nArtist Name:"+ artname[0].name
    addMessage(final_search,false)
    i++;
    }while(i<5);
    addMessage("Say Yes for main-menu or No for letting me off",false)
})

}

function spotify_search_album(text){
  var query2 = text
  var url2 = "https://api.spotify.com/v1/search?q="+ query2+ "&type=album&limit=5" 

// const axios = require("axios");

axios.get(
  url2,
  {
    headers: {
           
        Authorization: `Bearer ${token}` ,
    },
  }
).then((result)=>
{
    // console.log(result.data);
    res= result.data;
    console.log("<-------ALBUM SEARCH------>")
    console.log("Album Name:" + res.albums.items[0].name);
    addMessage("Album Name: "+ res.albums.items[0].name, false)
    var id = res.albums.items[0].id
    console.log("Album id:" + res.albums.items[0].id);

          axios.get(
           `https://api.spotify.com/v1/albums/${id}/tracks`,
            {
              headers: {
                    
                  Authorization: `Bearer ${token}` ,
              },
            }
          ).then((result)=>
          {
              // console.log(result.data);
              res= result.data;
              console.log("<-------ALBUM TRACKS------>")
              addMessage("<-------ALBUM TRACKS------->",false)
              //console.log(res.items)
              var i =0;
              do {
                var j = i +1;
                console.log(j + ")"+ res.items[i].name);
                addMessage(j + ")"+ res.items[i].name,false);
                i++;
              }while(i<res.items.length)
              addMessage("Say Yes for main-menu or No for letting me off",false)
              
          })
})
}

function spotify_playlist_genre(text){
  
 var query4 = text
var url4 = "https://api.spotify.com/v1/search?q="+ query4+ "&type=playlist&limit=5" 

//const axios = require("axios");

axios.get(
  url4,
  {
    headers: {
           
        Authorization: `Bearer ${token}` ,
    },
  }
).then((result)=>
{
    // console.log(result.data);
    res= result.data;
    console.log("<-------PLAYLIST SEARCH------>")
    console.log("Playlist Name:" + res.playlists.items[0].name)
    addMessage("Playlist Name: "+res.playlists.items[0].name, false);
    var playlist_id =  res.playlists.items[0].id
    console.log("Playlist id:" + res.playlists.items[0].id)


          axios.get(
            `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`,
            {
              headers: {
                    
                  Authorization: `Bearer ${token}` ,
              },
            }
          ).then((result)=>
          {
              // console.log(result.data);
              res= result.data;
              console.log("<-------PLAYLIST SONGS------>")
              var i =0;
              do {
                var j = i +1;
                console.log(j + ")SONG:"+ res.items[i].track.name);
                console.log("ARTIST: "+ res.items[i].track.album.artists[0].name)
                var finalplaylist = j + ")SONG:"+ res.items[i].track.name + "\nARTIST: "+ res.items[i].track.album.artists[0].name
                addMessage(finalplaylist,false)
                i ++;
              }while(i<res.items.length)
              addMessage("Say Yes for main-menu or No for letting me off",false)
          })
})
} 


function spotify_playlist_artist(text){
  var query3 = text
var url3 = "https://api.spotify.com/v1/search?q="+ query3+ "&type=playlist&limit=5" 

//const axios = require("axios");

axios.get(
  url3,
  {
    headers: {
           
        Authorization: `Bearer ${token}` ,
    },
  }
).then((result)=>
{
    // console.log(result.data);
    res= result.data;
    console.log("<-------PLAYLIST-ARTIST SEARCH------>")
    
    console.log("Playlist Name:" + res.playlists.items[0].name)
    addMessage("Playlist Name: "+res.playlists.items[0].name, false);
    var playlist_id =  res.playlists.items[0].id
    console.log("Playlist id:" + res.playlists.items[0].id)


          axios.get(
            `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`,
            {
              headers: {
                    
                  Authorization: `Bearer ${token}` ,
              },
            }
          ).then((result)=>
          {
              // console.log(result.data);
              res= result.data;
              console.log("<-------PLAYLIST SONGS------>")
              var i =0;
              do {
                var j = i +1;
                console.log(j + ")SONG:"+ res.items[i].track.name);
                var finalplaylist = j + ")SONG:"+ res.items[i].track.name;
                addMessage(finalplaylist,false)
                i++;
              }while(i<res.items.length)
              addMessage("Say Yes for main-menu or No for letting me off",false)
          })
})



}

function dialogflowmessage(text){
  const params = {
    msg : text
  }
  
 const result= fetch( 'http://localhost:3000/botmessage', 
                  {
                    method: 'POST',
                    body: new URLSearchParams(params),
                  }).then(res=>{return res.json()})

const printAddress = async () => {
          const a = await result;
          var res= JSON.stringify(a);
          var newres= JSON.parse(res)
          console.log(newres.Reply);
          addMessage(newres.Reply, false);
          //console.log(typeof(newres.Reply))
          var genre_playlist = 'Here are some playlists for you: Do you need anything else?'
                if(newres.Reply == 'Here are some playlists for you:')
                { 
                    spotify_playlist_genre(text);
                }
                if(newres.Reply == 'Here is the playlist of the Artist:')
                { 
                    spotify_playlist_artist(text);
                }
                if(newres.Reply == 'Here are some songs from the Album Name:')
                { 
                    spotify_search_album(text);
                }
                if(newres.Reply == 'Here are the songs from the Track Name:')
                { 
                    spotify_search_track(text);
                }


          console.log(a);
  };
  
printAddress();
}

function addMessage(text, fromUser) {
  $('#mylist').animate({scrollTop: $('#mylist').prop("scrollHeight")}, 100);
  const messageElement = document.createElement('div');
  messageElement.classList.add('chat-message');
  if (fromUser) {
    messageElement.classList.add('me');
  }
  messageElement.innerText = text;
  messagesContainer.appendChild(messageElement);
}

function sendMessage() {
  const text = input.value;
  if (text.trim() === '') {
    return;
  }
  addMessage(text, true);
  input.value = '';
  setTimeout(dialogflowmessage(text) , 1000);
}

button.addEventListener('click', sendMessage);
input.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    sendMessage();
  }
});

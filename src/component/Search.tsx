// https://rapidapi.com/deezerdevs/api/deezer-1

import { useEffect } from "react"
import { useState } from "react"
import axios from 'axios'
import Body from "./Body"
import { Container, Spinner } from "react-bootstrap"

export default  function Search () {
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(false)
    const [results, setResults] = useState([])
    const [error, setError] = useState('')
    const [searched, setSearched] = useState(false)
    const [play, setPlay] = useState(Boolean)
    const [pause, setPause] = useState(Boolean)
    const [currentsong, setCurrentSong] = useState('')
    const [isplaying , setIsPlaying] = useState(false)
    const [onHover, setOnHover] = useState(false)
    let count = 1


    useEffect(() => {
        if (!loading) return
        
        axios({
            method: 'GET',
            url: 'https://deezerdevs-deezer.p.rapidapi.com/search',
            params: {q: `${search}+ " " `},
            headers: {
              'X-RapidAPI-Key': 'ae4ed62fb5msh8644126332ad430p1751a7jsn7833fed069df',
              'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
            }
        })
        .then((response) => {
            setResults(response.data.data)
            console.log(results)
            setSearched(true)
            setLoading(false)
            
         
           })
        .catch((error) => {
            console.log(error)
            setError(error.message)
            setLoading(false)
        })
        .finally(() => {
            
            if (results.length===0){ 
                setError('No results found')
                setSearched(true)
                setLoading(false)
            } else {
                setError('')
                setSearched(true)
                setLoading(false)
                
            }
        })
    }, [loading])

    useEffect( () => {
        if (!search) return
        setLoading(true)
    }, [search])
    // useEffect(() => {
    //     if (results.length !== 0) {
    //         setArtist(results[0]['artist'])
    //         setAlbum(results[0]['album'])
    //         console.log(artist)
    //         console.log(album)
    //     }
    // }, [results])

   

    // const handlePlay = (preview:string) => {
    //     const audios = document.querySelectorAll('audio')
    //     const song = preview
        
    //     if (localStorage.getItem('playing')===song) {
    //         if (play) {
    //             setPlay(false)
    //             setPause(true)
    //             localStorage.setItem('playing', '')
    //             for (let i = 0; i < audios.length; i++) {
    //                 if (audios[i].src===song) {
    //                     audios[i].pause()
    //                 }
    //             }
    //             console.log('pause')
    //             console.log(localStorage.getItem('playing'))
    //         } else if (pause) {
    //             setPlay(true)
    //             setPause(false)
    //             localStorage.setItem('playing', song)
    //             for (let i = 0; i < audios.length; i++) {
    //                 if (audios[i].src===song) {
    //                     audios[i].play()
    //                 }
    //             }
    //             console.log('play')
    //             console.log(localStorage.getItem('playing'))
    //         }
    //     } else {
    //         setPlay(true)
    //         setPause(false)
    //         localStorage.setItem('playing', song)
    //         for (let i = 0; i < audios.length; i++) {
    //             if (audios[i].src===song) {
    //                 audios[i].play()
    //             }
    //         }
    //         console.log('play')
    //         console.log(localStorage.getItem('playing'))
    //     }
    // }

    const handlePlay = (preview:any, cover:any) => {
        const audios = document.querySelectorAll('audio')
        const song = preview

        if (localStorage.getItem('currentsong')===song) {
            if (play) {
                setPlay(false)
                setPause(true)
                localStorage.setItem('currentsong', song)
                localStorage.setItem('currentcover', cover)
                for (let i = 0; i < audios.length; i++) {
                        audios[i].pause()
                    
                }

            } else if (pause) {
                setPlay(true)
                setPause(false)
                localStorage.setItem('currentsong', song)
                localStorage.setItem('currentcover', cover)
                for (let i = 0; i < audios.length; i++) {
                    audios[i].pause()
                    if (audios[i].src===song) {
                        audios[i].play()
                    } 

                }

            }
        } else {
            setPlay(true)
            setPause(false)
            localStorage.setItem('currentsong', song)
            localStorage.setItem('currentcover', cover)

            for (let i = 0; i < audios.length; i++) {
                audios[i].pause()
                if (audios[i].src===song) {
                    audios[i].play()
                } 
                
            }

        }
    }
    let spanIconCountValue: string
    const playcircle = 'fa fa-play-circle'
    const pausecircle = 'fa fa-pause-circle'
    const stopcircle = 'fa fa-stop-circle'

    const convertToMin = (duration:number) => {
        const min = Math.floor(duration/60)
        const sec = duration%60
        if (sec<10) {
            return `${min}:0${sec}`
        }
        return `${min}:${sec}`
    }




    return (
        <Body navigation={true} sidebar={true} bottombar={true}>
            <div className="section">
                <input id="search-box" placeholder="Search" type="text" value={search} onChange={e => setSearch(e.target.value)} />
                
                
                <div id="search-wrapper">      

                    {loading && <p>Loading...</p>}
                    {error && <p>{error}</p>}
{/*                  
                 {results.length>0  &&  <table className="search-result-table" id="search-result-tabel">
                        <thead>
                            <tr>
                                <th scope="col"></th>
                                <th scope="col">Cover</th>
                                <th scope="col">Title</th>
                                <th scope="col">Album</th>
                                <th scope="col">Duration</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map((result: any) => (
                                <tr key={result.id}>
                                    <td>
                                <div className='control-button' onClick={()=>{
                                    const toBeRemoved = document.querySelector('.bottombar-playing')
                                    toBeRemoved?.remove()

                                    localStorage.setItem('currentsong', result.preview)
                                    localStorage.setItem('currentcover', result.album.cover_medium)
                                    const div = document.createElement('div')
                                    div.className = 'bottombar-playing'
                                    const track_details = document.createElement('div')
                                    track_details.className = 'track-details'
                                    const track_title = document.createElement('div')
                                    track_title.className = 'track-title'
                                    track_title.innerHTML = result.title
                                    const track_artist = document.createElement('div')
                                    track_artist.className = 'track-artist'
                                    track_artist.innerHTML = result.artist.name
                                    const track_title_artist = document.createElement('div')
                                    track_title_artist.className = 'track-title-artist'
                                    track_title_artist.appendChild(track_title)
                                    track_title_artist.appendChild(track_artist)
                                    const img = document.createElement('img')
                                    img.src = result.album.cover_medium
                                    track_details.appendChild(img)
                                    track_details.appendChild(track_title_artist)

                                    div.appendChild(track_details)
                                    const audio = document.createElement('audio')
                                    audio.src = localStorage.getItem('currentsong')!
                                    audio.id = localStorage.getItem(result.id)!
                                    audio.autoplay = true


                                   
                                    
                                    
                                    const track_controls = document.createElement('div')
                                    track_controls.className = 'track-controls'
                                    const previousicon = document.createElement('i')
                                    previousicon.innerHTML = '<i class="fa fa-step-backward" aria-hidden="true"></i>'
                                    previousicon.id = 'previousicon'
                                    const nexticon = document.createElement('i')
                                    nexticon.innerHTML = '<i class="fa fa-step-forward" aria-hidden="true"></i>'
                                    nexticon.id = 'nexticon'
                                    const playicon = document.createElement('i')
                                    playicon.innerHTML = '<i class="fa fa-play-circle" aria-hidden="true"></i>'
                                    playicon.id = 'playicon'
                                    const shuffleicon = document.createElement('i')
                                    shuffleicon.innerHTML = '<i class="fa fa-random" aria-hidden="true"></i>'
                                    shuffleicon.id = 'shuffleicon'
                                    const repeaticon = document.createElement('i')
                                    repeaticon.innerHTML = '<i class="fa fa-repeat" aria-hidden="true"></i>'
                                    repeaticon.id = 'repeaticon'
                                    track_controls.appendChild(audio)
                                    track_controls.appendChild(shuffleicon)
                                    track_controls.appendChild(previousicon)
                                    track_controls.appendChild(playicon)
                                    track_controls.appendChild(nexticon)
                                    track_controls.appendChild(repeaticon)
                                    div.appendChild(track_controls)
                                    console.log(track_controls  )




                                    playicon.addEventListener('click', ()=> {
                                        if (playicon.className===playcircle) {
                                            audio.play()
                                            setIsPlaying(true)
                                            playicon.className = pausecircle
                                        }
                                        else {
                                            audio.pause()
                                            setIsPlaying(false)
                                            playicon.className = playcircle
                                          
                                        }

                                    })
                                  
                                    const bottombar = document.querySelector('.bottombar')
                                    bottombar?.appendChild(div)
                                    const icon = document.getElementById(result.id)
                                    const icons = document.querySelectorAll('i')
                                    




                                    audio.onplay = () => {
                                        icons.forEach((icon)=> {
                                            if (icon.id !== 'playicon' && icon.id !== 'previousicon' && icon.id !== 'nexticon' && icon.id !== 'shuffleicon' && icon.id !== 'repeaticon') {
                                            icon.className = pausecircle
                                            }
                                        }
                                        )
                                        if (icon) {
                                            icon.className = stopcircle
                                            setIsPlaying(true)
                                        }

                                    }
                                    audio.onpause = () => {
                                        icons.forEach((icon)=> {
                                            if (icon.id !== 'playicon' && icon.id !== 'previousicon' && icon.id !== 'nexticon' && icon.id !== 'shuffleicon' && icon.id !== 'repeaticon') {
                                                icon.className = playcircle
                                                }
                                        }
                                        )
                                        if (icon) { 
                                            icon.className = playcircle
                                            setIsPlaying(false)
                                        }
                                    }

                                    if (icon?.className==='fa fa-play') {
                                        icons.forEach((icon)=>{
                                            if (icon.id !== 'playicon' && icon.id !== 'previousicon' && icon.id !== 'nexticon' && icon.id !== 'shuffleicon' && icon.id !== 'repeaticon') {
                                                icon.className = playcircle
                                                }
                                        })
                                        icon.className = playcircle
                                        setIsPlaying(true)
                                    } else if (icon?.className==='fa fa-stop-circle') {
                                        icons.forEach((icon)=>{
                                            if (icon.id !== 'playicon' && icon.id !== 'previousicon' && icon.id !== 'nexticon' && icon.id !== 'shuffleicon' && icon.id !== 'repeaticon') {
                                                icon.className = playcircle
                                                }                                         
                                        })
                                        icon.className = playcircle
                                        setIsPlaying(false)
                                        document.querySelectorAll('audio').forEach((audio)=>{
                                            audio.pause()
                                        }
                                        )                                     
                                     
                                    }
                                }}><i id={result.id} className={playcircle} aria-hidden="true"></i>


                                </div>
                                </td>
                                <td ><img src={result.album.cover_small}/></td>
                                <td id="title-artist" className="title-artist"><div className="title">{result.title}</div><div className="artist">{result.artist.name}</div></td>
                                <td id="album" className="album">{result.album.title}</td>
                                <td>{result.duration}</td>
                             
                            </tr>                    
                            ))}
                        </tbody>
                    </table>
                    } */}

                    {results.length>0  &&  
                    
                    <div className="search-result-table" id="search-result-tabel">
                        {results.map((result: any) => (
                           
                            <div className="search-result" key={result.id} onMouseOver={()=>{
                                const spanIconCount = document.getElementsByClassName(result.id)[0]
                                const spanIconHeart = document.getElementsByClassName(result.id)[1]
                            

                                spanIconCountValue = spanIconCount?.innerHTML
                                if (spanIconCount){
                                    spanIconCount.addEventListener('mouseover', ()=> {
                                        spanIconCount.setAttribute('style', 'cursor: pointer;')  
                                    }
                                    )
                                    spanIconCount.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>'
                                }
                                if (spanIconHeart){
                                    spanIconHeart.addEventListener('mouseover', ()=> {
                                        spanIconHeart.setAttribute('style', 'cursor: pointer;')
                                    }
                                    )
                                    spanIconHeart.innerHTML = '<i class="fa fa-heart-o" aria-hidden="true"></i>'}
                               
                           
                            }} onMouseOut={()=>{
                                const spanIconCount = document.getElementsByClassName(result.id)[0]
                                const spanIconHeart = document.getElementsByClassName(result.id)[1]
                                if (spanIconCount){
                                    spanIconCount.innerHTML = spanIconCountValue}
                                if (spanIconHeart){spanIconHeart.innerHTML = ''}

                            }}>


                                <div className="search-result-count" onClick={()=>{
                                    CreatPlayTrack(result, setIsPlaying)
                                    // const toBeRemoved = document.querySelector('.bottombar-playing')
                                    // toBeRemoved?.remove()

                                    // localStorage.setItem('currentsong', result.preview)
                                    // localStorage.setItem('currentcover', result.album.cover_medium)
                                    // const div = document.createElement('div')
                                    // div.className = 'bottombar-playing'
                                    // const track_details = document.createElement('div')
                                    // track_details.className = 'track-details'
                                    // const track_title = document.createElement('div')
                                    // track_title.className = 'track-title'
                                    // track_title.innerHTML = result.title
                                    // const track_artist = document.createElement('div')
                                    // track_artist.className = 'track-artist'
                                    // track_artist.innerHTML = result.artist.name
                                    // const track_title_artist = document.createElement('div')
                                    // track_title_artist.className = 'track-title-artist'
                                    // track_title_artist.appendChild(track_title)
                                    // track_title_artist.appendChild(track_artist)
                                    // const img = document.createElement('img')
                                    // img.src = result.album.cover_medium
                                    // track_details.appendChild(img)
                                    // track_details.appendChild(track_title_artist)

                                    // div.appendChild(track_details)
                                    // const audio = document.createElement('audio')
                                    // audio.src = result.preview
                                    // audio.id = localStorage.getItem(result.id)!
                                    // audio.autoplay = true


                                   
                                    
                                    
                                    // const track_controls = document.createElement('div')
                                    // track_controls.className = 'track-controls'
                                    // const previousicon = document.createElement('i')
                                    // previousicon.className = 'fa fa-step-backward'
                                    // previousicon.id = 'previousicon'
                                    // const nexticon = document.createElement('i')
                                    // nexticon.className = 'fa fa-step-forward'
                                    // nexticon.id = 'nexticon'
                                    // const playicon = document.createElement('i')
                                    // playicon.className = 'fa fa-pause-circle'
                                    // playicon.id = 'playicon'
                                    // const shuffleicon = document.createElement('i')
                                    // shuffleicon.className = 'fa fa-random'
                                    // shuffleicon.id = 'shuffleicon'
                                    // const repeaticon = document.createElement('i')
                                    // repeaticon.className = 'fa fa-repeat'
                                    // repeaticon.id = 'repeaticon'
                                    
                                    // track_controls.appendChild(audio)
                                    // track_controls.appendChild(shuffleicon)
                                    // track_controls.appendChild(previousicon)
                                    // track_controls.appendChild(playicon)
                                    // track_controls.appendChild(nexticon)
                                    // track_controls.appendChild(repeaticon)
                                    // div.appendChild(track_controls)
                                    // console.log(track_controls  )




                                    // playicon.addEventListener('click', ()=> {
                                    //     if (playicon.className===playcircle) {
                                    //         audio.play()
                                    //         setIsPlaying(true)
                                    //         playicon.className = pausecircle
                                    //     }
                                    //     else {
                                    //         audio.pause()
                                    //         setIsPlaying(false)
                                    //         playicon.className = playcircle
                                          
                                    //     }

                                    // })
                                  
                                    // const bottombar = document.querySelector('.bottombar')
                                    // bottombar?.appendChild(div)
                                    // const icon = document.getElementById(result.id)
                                    // const icons = document.querySelectorAll('i')
                                    




                                    // audio.onplay = () => {
                                    //     icons.forEach((icon)=> {
                                    //         if (icon.id !== 'playicon' && icon.id !== 'previousicon' && icon.id !== 'nexticon' && icon.id !== 'shuffleicon' && icon.id !== 'repeaticon') {
                                    //         icon.className = pausecircle
                                    //         }
                                    //     }
                                    //     )
                                    //     if (icon) {
                                    //         icon.className = stopcircle
                                    //         setIsPlaying(true)
                                    //     }

                                    // }
                                    // audio.onpause = () => {
                                    //     icons.forEach((icon)=> {
                                    //         if (icon.id !== 'playicon' && icon.id !== 'previousicon' && icon.id !== 'nexticon' && icon.id !== 'shuffleicon' && icon.id !== 'repeaticon') {
                                    //             icon.className = playcircle
                                    //             }
                                    //     }
                                    //     )
                                    //     if (icon) { 
                                    //         icon.className = playcircle
                                    //         setIsPlaying(false)
                                    //     }
                                    // }

                                    // if (icon?.className==='fa fa-play') {
                                    //     icons.forEach((icon)=>{
                                    //         if (icon.id !== 'playicon' && icon.id !== 'previousicon' && icon.id !== 'nexticon' && icon.id !== 'shuffleicon' && icon.id !== 'repeaticon') {
                                    //             icon.className = playcircle
                                    //             }
                                    //     })
                                    //     icon.className = playcircle
                                    //     setIsPlaying(true)
                                    // } else if (icon?.className==='fa fa-stop-circle') {
                                    //     icons.forEach((icon)=>{
                                    //         if (icon.id !== 'playicon' && icon.id !== 'previousicon' && icon.id !== 'nexticon' && icon.id !== 'shuffleicon' && icon.id !== 'repeaticon') {
                                    //             icon.className = playcircle
                                    //             }                                         
                                    //     })
                                    //     icon.className = playcircle
                                    //     setIsPlaying(false)
                                    //     document.querySelectorAll('audio').forEach((audio)=>{
                                    //         audio.pause()
                                    //     }
                                    //     )                                     
                                     
                                    // }
                                }}><span className={result.id}>{count++}</span> </div>
                                <div className="search-result-cover"><img src={result.album.cover_small} width={46}/></div>
                                <div className="search-result-title-artist"><div className="search-result-title">{result.title}</div><div className="search-result-artist">{result.artist.name}</div></div>
                                <div className="search-result-album">{result.album.title}</div>
                                <div className="search-result-heart" ><span className={result.id}></span></div>
                                <div className="search-result-duration">{convertToMin(result.duration)}</div>
                             

                            </div>
                            

                        ))}
                        
                    </div>
                    }
</div>
</div>
</Body>
    )
}
                
        




{/* interface SongCardProps {
    id:string;
    title:string;
    cover:string;
    preview:string;
    duration:number;
    rank :number;
    type:string;
    album :{
        id:string;
        title:string;
        cover:string;
        cover_small:string;
        cover_medium:string;
        type:string;
    }
    artist :{
        id:string;
        name:string;
        picture_medium:string;
        track_list:string;
        type:string;
    }
}
 */}


function CreatPlayTrack(result:any, setIsPlaying:any, ) {
    const playcircle = 'fa fa-play-circle'
    const pausecircle = 'fa fa-pause-circle'
    const stopcircle = 'fa fa-stop-circle'

    const toBeRemoved = document.querySelector('.bottombar-playing')
        toBeRemoved?.remove()

        localStorage.setItem('currentsong', result.preview)
        localStorage.setItem('currentcover', result.album.cover_medium)
        const div = document.createElement('div')
        div.className = 'bottombar-playing'
        const track_details = document.createElement('div')
        track_details.className = 'track-details'
        const track_title = document.createElement('div')
        track_title.className = 'track-title'
        track_title.innerHTML = result.title
        const track_artist = document.createElement('div')
        track_artist.className = 'track-artist'
        track_artist.innerHTML = result.artist.name
        const track_title_artist = document.createElement('div')
        track_title_artist.className = 'track-title-artist'
        track_title_artist.appendChild(track_title)
        track_title_artist.appendChild(track_artist)
        const img = document.createElement('img')
        img.src = result.album.cover_medium
        track_details.appendChild(img)
        track_details.appendChild(track_title_artist)

        div.appendChild(track_details)
        const audio = document.createElement('audio')
        audio.src = result.preview
        audio.id = localStorage.getItem(result.id)!
        audio.autoplay = true


        
        
        
        const track_controls = document.createElement('div')
        track_controls.className = 'track-controls'
        const previousicon = document.createElement('i')
        previousicon.className = 'fa fa-step-backward'
        previousicon.id = 'previousicon'
        const nexticon = document.createElement('i')
        nexticon.className = 'fa fa-step-forward'
        nexticon.id = 'nexticon'
        const playicon = document.createElement('i')
        playicon.className = 'fa fa-pause-circle'
        playicon.id = 'playicon'
        const shuffleicon = document.createElement('i')
        shuffleicon.className = 'fa fa-random'
        shuffleicon.id = 'shuffleicon'
        const repeaticon = document.createElement('i')
        repeaticon.className = 'fa fa-repeat'
        repeaticon.id = 'repeaticon'
        
        track_controls.appendChild(audio)
        track_controls.appendChild(shuffleicon)
        track_controls.appendChild(previousicon)
        track_controls.appendChild(playicon)
        track_controls.appendChild(nexticon)
        track_controls.appendChild(repeaticon)
        div.appendChild(track_controls)
        console.log(track_controls  )




        playicon.addEventListener('click', ()=> {
            if (playicon.className===playcircle) {
                audio.play()
                setIsPlaying(true)
                playicon.className = pausecircle
            }
            else {
                audio.pause()
                setIsPlaying(false)
                playicon.className = playcircle
                
            }

        })
        
        const bottombar = document.querySelector('.bottombar')
        bottombar?.appendChild(div)
        const icon = document.getElementById(result.id)
        const icons = document.querySelectorAll('i')
        




        audio.onplay = () => {
            icons.forEach((icon)=> {
                if (icon.id !== 'playicon' && icon.id !== 'previousicon' && icon.id !== 'nexticon' && icon.id !== 'shuffleicon' && icon.id !== 'repeaticon') {
                icon.className = pausecircle
                }
            }
            )
            if (icon) {
                icon.className = stopcircle
                setIsPlaying(true)
            }

        }
        audio.onpause = () => {
            icons.forEach((icon)=> {
                if (icon.id !== 'playicon' && icon.id !== 'previousicon' && icon.id !== 'nexticon' && icon.id !== 'shuffleicon' && icon.id !== 'repeaticon') {
                    icon.className = playcircle
                    }
            }
            )
            if (icon) { 
                icon.className = playcircle
                setIsPlaying(false)
            }
        }

        if (icon?.className==='fa fa-play') {
            icons.forEach((icon)=>{
                if (icon.id !== 'playicon' && icon.id !== 'previousicon' && icon.id !== 'nexticon' && icon.id !== 'shuffleicon' && icon.id !== 'repeaticon') {
                    icon.className = playcircle
                    }
            })
            icon.className = playcircle
            setIsPlaying(true)
        } else if (icon?.className==='fa fa-stop-circle') {
            icons.forEach((icon)=>{
                if (icon.id !== 'playicon' && icon.id !== 'previousicon' && icon.id !== 'nexticon' && icon.id !== 'shuffleicon' && icon.id !== 'repeaticon') {
                    icon.className = playcircle
                    }                                         
            })
            icon.className = playcircle
            setIsPlaying(false)
            document.querySelectorAll('audio').forEach((audio)=>{
                audio.pause()
            }
            )                                     
            
        }
}
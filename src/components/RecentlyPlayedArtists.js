import React, { useEffect, useState } from 'react'
import SpotifyWebApi from 'spotify-web-api-node'
import { useDataLayerValue } from '../DataLayer'
import { Link } from 'react-router-dom'

import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled'

import '../styles/styles.scss'

const spotifyApi = new SpotifyWebApi({
    clientId: "a4461782c5b040b2a456806c4d99258f",
});

function RecentlyPlayedArtists({ accessToken, track }) {
    const [{ user, playing, playingTrack }, dispatch] = useDataLayerValue();
    const [playingArtist, setPlayingArtist] = useState()
    const [artistInfo, setArtistInfo] = useState()

    useEffect(() => {
        if (!accessToken) return
        spotifyApi.setAccessToken(accessToken)
    }, [accessToken])
    
    useEffect( () => {
        if (!accessToken) return
        spotifyApi.getArtist(`${track?.artists[0].id}`)
        .then(res => {
            setArtistInfo(res.body)
        })
    }, [accessToken])

    function chooseTrack(track) {
        if (track) {
            setPlayingArtist(track)
            dispatch({
                type: "SET_PLAYING",
                playing: true
            })
            dispatch({ 
                type: "SET_PLAYING_TRACK",
                playingTrack: artistInfo?.uri
            })
        } else {
            dispatch({ 
                type: "SET_PLAYING_ARTIST",
                playing: null
            })
        }
    }

    function handlePlay() {
        chooseTrack(track)
    }

    function handlePause() {
        dispatch({
            type: 'SET_PLAYING_TRACK',
            playingTrack: null,
        })
        dispatch({
            type: 'SET_PLAYING',
            playing: false,
        })
    }

    return (
        <div className="recent__container">
                <div className="recent__artist" style={{ width: 150, height: 150, backgroundImage: `url(${artistInfo?.images[0]?.url})`, backgroundSize: 'cover', borderRadius: '50%'}}>
                {(artistInfo?.uri != playingTrack || !playing) ?
                    <PlayCircleFilledIcon onClick={handlePlay} className="play__icon"/>
                : 
                    <PauseCircleFilledIcon onClick={handlePause} className="play__icon"/>
                }
                </div>
                <Link to={`/artist/${track?.artists[0].id}`}>
                <p>{track?.artists[0].name}</p>
                </Link>
        </div>
    )
}

export default RecentlyPlayedArtists

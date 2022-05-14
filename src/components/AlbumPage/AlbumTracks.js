import React from 'react';
import { useDataLayerValue } from '../../DataLayer';
import { Link } from 'react-router-dom';

import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';

function AlbumTracks({ track, chooseTrack, index }) {
    const [{ playingTrack, playing }, dispatch] = useDataLayerValue();

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
    
    function convertTimestamp(ms) {
        const minutes = Math.floor(ms / 60000)
        const seconds = ((ms % 60000) / 1000).toFixed(0)
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds
    }

    return (
        <div className="album__track" onDoubleClick={handlePlay}>
            <div className="albumTrackInfo__left">
                <p>{index + 1}</p>
                <h1>{track.name}</h1>
                <Link to={`/artist/${track.artists[0].id}`} styles={{ background: 'none'}}>
                    <h2>{track.artists[0].name}</h2>
                </Link>
            </div>
            <div className="albumTrackInfo__right">
                <h3>{convertTimestamp(track.duration_ms)}</h3>
                {(track.uri != playingTrack || !playing) ?
                        <PlayCircleFilledIcon onClick={handlePlay} className="play__icon"/>
                    : 
                        <PauseCircleFilledIcon onClick={handlePause} className="play__icon"/>
                }
            </div>
        </div>
    )
}

export default AlbumTracks

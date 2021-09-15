import React from 'react'
import { SongArtist } from './SongArtist'
import { SongLyric } from './SongLyric'
import Message from "./Message";

export const SongDetails = ({search, lyric, bio}) => {
    return (
        <>
            {!lyric || lyric.error || lyric.err || lyric.name === "AbortError" ? (
            <Message
                msg={`Error: no existe la canción "${search.song}"`}
                bgColor="#dc3545"
            />
            ) : (
            <SongLyric title={search.song} lyrics={lyric.lyrics} />
            )}
            {bio && bio[0] && bio[0][0] ? (
            <SongArtist artist={bio[0][0]} />
            ) : (
            <Message
                msg={`Error: no existe el intérprete '<em>${search.artist}</em>'`}
                bgColor="#dc3545"
            />
            )}
       </>
    )
}

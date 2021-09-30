import { createContext } from 'react'

interface Episode {
  title: string
  members: string
  thumbnail: string
  duration: number
  url: string
}

interface PlayerContextData {
  episodeList: Episode[]
  currentEpisodeIndex: number
  isPlaying: boolean
  play: (episode: Episode) => void
  togglePlay: () => void
  setPayingState: (state: boolean) => void
}

const PlayerContext = createContext({} as PlayerContextData)

export default PlayerContext

import { GetStaticProps } from 'next'
import { format, parseISO } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import api from '../services/api'
import convertDurationToTimeString from '../utils/convertDurationToTimeString'

interface EpisodeProps {
  id: string
  title: string
  members: string
  published_at: string
}

interface Homeprops {
  episodes: EpisodeProps[]
}

// Client-side SPA
// Server-side SSR
// Static Site Generation SSG

const Home = (props: Homeprops) => {
  const { episodes } = props

  return <div>{JSON.stringify(episodes)}</div>
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get('episodes', {
    params: {
      _limit: 12,
      _sort: 'published_at',
      _order: 'desc',
    },
  })

  const episodes = data.map(episode => {
    return {
      id: episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
      members: episode.members,
      publishedAt: format(parseISO(episode.published_at), 'd MMM yy', {
        locale: ptBR,
      }),
      duration: Number(episode.file.duration),
      durationAsString: convertDurationToTimeString(
        Number(episode.file.duration)
      ),
      description: episode.description,
      url: episode.file.url,
    }
  })

  return {
    props: {
      episodes,
    },
    revalidate: 60 * 60 * 8, // 24 hours
  }
}

export default Home

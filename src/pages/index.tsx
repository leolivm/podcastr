import { GetStaticProps } from 'next'

// Client-side
// Server-side
// Static Site Generation

const Home = (props: any) => {
  const { episodes } = props
  console.log(episodes)

  return (
    <div>
      <h1>oi</h1>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch('http://localhost:3333/episodes')
  const data = await response.json()

  return {
    props: {
      episodes: data,
    },
    revalidate: 60 * 60 * 8, // 24 hours
  }
}

export default Home

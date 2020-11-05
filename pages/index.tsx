import ArticlesList from '@/components/articles-list'
import Head from '@/components/header'
import Hero from '@/components/hero'
import Navbar from '@/components/navbar'
import Work from '@/components/work'
import { BlogPosts } from '@/interfaces/blog'
import { WorkProps } from '@/interfaces/work'
import { fetchAPI } from '@/lib/datocms'
import { FEATURED_ARTICLES } from 'graphql/queries/posts'
import { RECENT_WORK } from 'graphql/queries/work'
import Container from '@/components/container'
import Footer from '@/components/footer'
import NextLink from '@/components/NextLink'
import { motion } from 'framer-motion'
import useResetScroll from 'hooks/useResetScroll'
import Thanks from '@/components/thanks'

const easing = [0.6, -0.05, 0.01, 0.99]
export const fadeInUp = {
  initial: {
    y: 20,
    opacity: 0,
    transition: { duration: 0.6, ease: easing },
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: easing,
    },
  },
}

export const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
}

export const Home = ({ recentWork, featuredArticles }): JSX.Element => {
  useResetScroll()
  return (
    <motion.div initial="initial" animate="animate" exit={{ opacity: 0 }}>
      <Head title="Adithya NR | A Full stack Designer based in Bengaluru, India." />
      <Navbar />
      <Hero />
      <Work data={recentWork} />
      <Container>
        <h1 className="mt-24 xl:mt-64 mb-6 text-2xl font-semibold">
          Featured articles
        </h1>
        <ArticlesList data={featuredArticles} />
        <NextLink href="/blog" text="Read more articles" />
        <Thanks />
      </Container>
      <div className="mt-24 lg:mt-32">
        <Footer />
      </div>
    </motion.div>
  )
}

export async function getStaticProps() {
  const recentWork: WorkProps = await fetchAPI(RECENT_WORK)
  const featuredArticles: BlogPosts = await fetchAPI(FEATURED_ARTICLES)
  return {
    props: {
      recentWork,
      featuredArticles,
    },
  }
}

export default Home

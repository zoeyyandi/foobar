import type { NextPage } from 'next'
import React from 'react';
import { useQuery } from 'react-query'
import Head from 'next/head'
import Image from 'next/image'
import { Card, BlogPost } from './ui/card';
import Button from './ui/button';

const Home: NextPage = () => {

  const { isLoading, error, data, isFetching } = useQuery("blogPosts", () =>
    fetch(
      "https://6144e843411c860017d256f0.mockapi.io/api/v1/posts"
    ).then((res) => res.json())
  );

  const usePagination = (posts: BlogPost[] = []) => {
    const MAX_POSTS_PER_PAGE = 5;
    const [currentPage, setCurrentPage] = React.useState(0);
    const [currentBlogPosts, setCurrentBlogPosts] = React.useState(posts);
    const totalPages = !posts.length ? 1 : Math.ceil((1 + posts.length) / MAX_POSTS_PER_PAGE);
    
    const nextPage = () => {
      const nextPageIndex = currentPage + 1 === totalPages ? currentPage : currentPage + 1;
      setCurrentPage(nextPageIndex);
    };

    const prevPage = () => {
      const prevPageIndex = currentPage === 0 ? currentPage : currentPage - 1;
      setCurrentPage(prevPageIndex);
    };

    const getItemsForPage = (page: number) => {
      const lastPostIndex = (page + 1) * MAX_POSTS_PER_PAGE;
      const firstPostIndex = lastPostIndex - MAX_POSTS_PER_PAGE;
      return posts.slice(firstPostIndex, lastPostIndex);
    };

    React.useEffect(
      () => {
        setCurrentBlogPosts(getItemsForPage(currentPage));
      },
      [currentPage, sortedData] //eslint-disable-line
    );

    return { currentBlogPosts, currentPage, totalPages, nextPage, prevPage };
  };  
      
  const sortedData = React.useMemo(() => data?.slice(0).sort((a: { createdAt: string }, b: { createdAt: string }) => {
      let dateA = new Date(a.createdAt).getTime();
      let dateB = new Date(b.createdAt).getTime();
      return dateB - dateA;
  }), [data])

  const pagination = usePagination(sortedData);

  return (
    <div>
      <Head>
        <title>B</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-white">
        <h1 className="text-black flex justify-start items-center border-b border-black h-20 text-7xl pl-28 font-extrabold">
          B
        </h1>
        <div className="grid grid-cols-2">
          {isFetching || isLoading ? (<span className="col-span-2 flex justify-center h-screen">
            <Image src="/spinner.svg" priority alt="loader" height={50} width={50}/>
          </span>) : error || !pagination.currentBlogPosts.length ? <span className="col-span-2 flex justify-center items-center h-screen"><p>Sorry, please check back later!</p></span> : pagination.currentBlogPosts.map((blogPost: BlogPost, index: number) => <Card key={`${blogPost.title}-${blogPost.id}`} blogPost={blogPost} isFirst={index === 0} />) }
        </div>
        <div className="flex justify-center mt-4 mb-4">
          {pagination.currentPage > 0 && <Button text="Prev" svg="/forward.svg" onClickHandler={async () => pagination.prevPage()}/>}
          {pagination.totalPages > pagination.currentPage + 1 && <Button text="Next" svg="/backward.svg" onClickHandler={async () => pagination.nextPage()}/>}
        </div>
      </main>

      <footer className="w-full h-8 flex justify-end items-center border-t border-black">
        <p className="text-xs mr-2">?? 2021, ZOEY</p>
      </footer>
    </div>
  )
}

export default Home

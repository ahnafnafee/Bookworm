import * as React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Head from "next/head";

export default function Library() {
    const [posts, setPosts] = React.useState([]);
    const [hasMore, setHasMore] = React.useState(true);

    const getMorePost = async () => {
        const res = await fetch(
            `https://jsonplaceholder.typicode.com/todos?_start=${posts.length}&_limit=10`
        );
        const newPosts = await res.json();
        setPosts((post) => [...post, ...newPosts]);
    };

    return (
        <div className="flex h-full">
            <Head>
                <title>Library - Bookworm</title>
            </Head>
            <InfiniteScroll
                dataLength={posts.length}
                next={getMorePost}
                hasMore={hasMore}
                loader={<h3> Loading...</h3>}
                endMessage={<h4>Nothing more to show</h4>}
            >
                {posts.map((data) => (
                    <div key={data.id}>
                        <div className="back">
                            <strong> {data.id}</strong> {data.title}
                        </div>
                        {data.completed}
                    </div>
                ))}
            </InfiniteScroll>
            <style jsx>
                {`
                    .back {
                        padding: 10px;
                        background-color: dodgerblue;
                        color: white;
                        margin: 10px;
                    }
                `}
            </style>
        </div>
    );
}

export const getStaticProps = async () => {
    const data = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=10"
    ).then((response) => response.json());
    return {
        props: { data },
    };
};

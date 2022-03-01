import * as React from "react";
import Head from "next/head";
import { Text } from "@chakra-ui/react";
import { Avatar, AvatarBadge, AvatarGroup } from "@chakra-ui/react";

export default function Settings() {
    const [posts, setPosts] = React.useState([]);
    const [hasMore, setHasMore] = React.useState(true);

    React.useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/todos?_limit=30").then(
            (response) => response.json().then((data) => setPosts(data))
        );
    }, []);

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
            <div className="flex flex-col flex-1 justify-start px-5">
                <div className="flex flex-row justify-between items-center content-center my-7">
                    <Text fontSize="2xl" fontWeight={"extrabold"}>
                        Welcome Alyssa
                    </Text>
                    <Avatar size="sm" bg="gray.600" onClick={() => null} />
                </div>

                <Text fontSize="xl" fontWeight={"semibold"}>
                    Library
                </Text>

                <div
                    className="flex flex-col flex-1"
                    style={{
                        maxHeight: "100vh",
                        paddingBottom: 90,
                        overflowY: "scroll",
                    }}
                >
                    {posts.map((data) => (
                        <div key={data.id}>
                            <div className="back">
                                <strong> {data.id}</strong> {data.title}
                            </div>
                            {data.completed}
                        </div>
                    ))}
                </div>
            </div>
            <style jsx>
                {`
                    .back {
                        padding: 10px;
                        background-color: dodgerblue;
                        color: white;
                        margin-top: 10px;
                        margin-bottom: 10px;
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

import React, { useState, useEffect } from 'react'
import styled from 'styled-components';

import InfiniteScroll from 'react-infinite-scroller';
import UserCard from './UserCard';
import Spinner from 'react-bootstrap/Spinner';

import http from '../http-common';

const SpinnerContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 50px;
`

const UsersScroll = (props) => {

    const [fetchedData, setFetchedData] = useState([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(false);

    useEffect(() => {
        fetchMoreData();
        // eslint-disable-next-line
    },[]);

    const PAGE_SIZE = 3;

    const fetchMoreData = async () => {

        const res = await http.get(`/users?limit=${PAGE_SIZE}&skip=${PAGE_SIZE*page}`);


        setHasMore(res.data.length >= PAGE_SIZE);

        setPage(page + 1);

        setFetchedData(prevState => {
            // Object.assign would also work
            return [...prevState, ...res.data];
        });

    };

    const style = {
        margin: "30px 20%",
        padding: "20px",
    }

    return (
        <div>
            <InfiniteScroll
                pageStart={0}
                loadMore={fetchMoreData}
                hasMore={hasMore}
                loader={
                    <SpinnerContainer key={0}>
                        <Spinner
                            animation="border"
                        />
                    </SpinnerContainer>
                }
                style={style}
                initialLoad={false}
            >
                {fetchedData.map((user) => (
                    <UserCard
                        key={user._id}
                        _id={user._id}
                        username={user.username}
                        address={user.address}
                    />
                ))}
            </InfiniteScroll>
        </div>
    );
}
 
export default UsersScroll;
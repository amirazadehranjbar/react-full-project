import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {userProfile} from "../../../redux/features/auth/authUserSlice.js";
import Page from "./Page.jsx";

function UserProfile() {

    const {data, isError, isLoading} = useSelector(state => state.authUserReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userProfile());
    }, [dispatch]);

    return (
        <div>
            {isError && (<div>Error...</div>)}
            {isLoading && (<div>Loading...</div>)}
            {data && (<Page/>)}
        </div>
    )
}

export default UserProfile

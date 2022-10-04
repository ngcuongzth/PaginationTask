import React, { useState, useEffect } from 'react'
import axios from 'axios'

// const url = 'https://api.github.com/users/john-smilga/followers?per_page=100'

axios.defaults.baseURL = "https://api.github.com/users/john-smilga/followers?per_page=100";
const useAxios = (url) => {
    const [error, setError] = useState(null);
    const [response, setResponse] = useState(null)

    const fetchData = async () => {
        try {
            const response = await axios.get(url);
            setResponse(response);
        }
        catch (error) {
            setError(error.message)
        }
    }
    useEffect(() => {
        fetchData();
    }, [url])

    return {
        response, error
    }
}

export default useAxios
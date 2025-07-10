import React, { useEffect, useReducer } from 'react';
import axios from 'axios';

const extractData = (data) => {
    return data.map((datum, idx) => {
        const tdList = Object.entries(datum)
            .filter(([key]) => key !== 'id')
            .map(([key, value], tdIdx) => (
                <td key={`${idx}-${tdIdx}`}>{value}</td>
            ));
        return <tr key={datum.id || idx}>{tdList}</tr>;
    });
};
const initialViewState = {
    data: [],
    error: null,
};
const viewReducer = (state, action) => {
    switch (action.type) {
        case "SUCCESS":
            return { ...state, data: action.payload.data, error: null };
        case "FAILURE":
            return { ...state, error: action.payload.error };
        default:
            return state;
    }
};
const View = () => {
    const [state, dispatch] = useReducer(viewReducer, initialViewState);

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/users`);
            dispatch({ type: "SUCCESS", payload: { data: response.data } });
        } catch (error) {
            dispatch({ type: "FAILURE", payload: { error } });
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const headers =
        state.data.length > 0
            ? Object.keys(state.data[0]).filter((key) => key !== 'id')
            : [];

    return (
        <>
            <h3>정보 보여주는 곳</h3>

            {state.error ? (
                <p style={{ color: "red" }}>
                    에러 발생: {state.error.message || "데이터를 불러올 수 없습니다."}
                </p>
            ) : state.data.length === 0 ? (
                <p>로딩 중...</p>
            ) : (
                <table border="1">
                    <thead>
                        <tr>
                            {headers.map((header, idx) => (
                                <th key={idx}>{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>{extractData(state.data)}</tbody>
                </table>
            )}
        </>
    );
};

export default View;

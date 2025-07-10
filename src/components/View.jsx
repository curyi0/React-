import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../redux/reducer'; // 경로 확인 필요

const extractData = (data) => {
  return data.map((datum, idx) => {
    const tdList = Object.entries(datum)
      .filter(([key]) => key !== 'id')
      .map(([key, value], tdIdx) => (
        <td key={`${idx}-${tdIdx}`}>
          {key === 'instock' ? (value ? "있음" : "없음") : value}
        </td>
      ));
    return <tr key={datum.id || idx}>{tdList}</tr>;
  });
};

const View = () => {
    const dispatch = useDispatch();
    const { loading, data, error } = useSelector((state) => state.view);
    const location = useLocation();

    useEffect(() => {
        const param = location.state;
        if (param && param.target) {
            dispatch(fetchData(param.target));
        } else {
            console.log(location.state)
            console.warn("location.state가 없습니다.");
        }
    }, [dispatch, location.state]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: 'red' }}>에러 발생: {error}</p>;
    if (!data || data.length === 0) return <p>데이터가 없습니다.</p>;

    const headers = Object.keys(data[0]).filter((key) => key !== 'id');

    return (
        <>
            <h3>정보 보여주는 곳</h3>
            <table border="1">
                <thead>
                    <tr>
                        {headers.map((header, idx) => (
                            <th key={idx}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>{extractData(data)}</tbody>
            </table>
        </>
    );
};

export default View;

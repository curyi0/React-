import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchInfoPost } from '../redux/reducer';


const Info = () => {
    const [obj, setObj] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange =(event)=>{
        setObj(prev=>(
            {...prev, [event.target.name]: event.target.value}
        ))
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        dispatch(fetchInfoPost(obj))
        // const fetch = async () => {
        //     try {
        //         const url = "http://localhost:3001/users";
        //         const response = await axios.post(url, obj);
        //         console.log(response.data);
        //     } catch (err) {
        //         console.error(err);
        //     }
        // };
        // fetch();
        navigate("/view", {state: {target: "users"}});
    }
  return (
    <>
        <h3>정보받는 곳</h3>
        <form onSubmit={handleSubmit}>
            <label>이름
                <input type='text' name='name' onChange={handleChange}/>
            </label>
            <label>나이
                <input type='number' name='age' onChange={handleChange}/>
            </label>
            <label>이메일
                <input type='text' name='email' onChange={handleChange}/>
            </label>
            <label>도시
                <input type='text' name='city' onChange={handleChange}/>
            </label>
            <button>제출</button>
        </form>
    </>
  )
}

export default Info;

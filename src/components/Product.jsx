import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchProductPost } from '../redux/reducer';

const Product = () => {
    const [obj, setObj] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (event) => {
    const { name, type, value, checked } = event.target;
        setObj(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value // ✅ boolean으로 저장
        }));
    };



    const handleSubmit=(e)=>{
        e.preventDefault();
        dispatch(fetchProductPost(obj));
        // const fetch = async () => {
        //     try {
        //         const url = "http://localhost:3001/products";
        //         const response = await axios.post(url, obj);
        //         console.log(response.data);
        //     } catch (err) {
        //         console.error(err);
        //     }
        // };
        // fetch();
        navigate("/view", {state: {target: "products"}});
    }
  return (
    <>
        <h3>정보받는 곳</h3>
        <form onSubmit={handleSubmit}>
            <label>이름
                <input type='text' name='name' onChange={handleChange}/>
            </label>
            <label>가격
                <input type='number' name='price' onChange={handleChange}/>
            </label>
            <label>범주
                <input type='text' name='category' onChange={handleChange}/>
            </label>
            <label>재고
                <input type='checkbox' name='inStock' onChange={handleChange}/>
            </label>
            <button>제출</button>
        </form>
    </>
  )
}

export default Product;

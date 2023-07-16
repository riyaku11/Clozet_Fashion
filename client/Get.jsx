import React,{useState,useEffect} from "react";
import axios from "axios";


const Pract = () => {
const [data, setData] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(()=>{
axios.get("https://getapi/posts")
.then((response)=>{
  setData(response.data);
  setLoading(false);
}).catch((error)=>{
 setError(error.message);
 setLoading(false);
})
},[])

if(loading){
    return(
        <div>...loading ....</div>
    )
}
if(error){
    return(
        <div>
            {error.message}
        </div>
    )
}
  return (
   <div>
{data.map((items)=>(
<div key={items.id}>
    {items.data}
</div>
))}
  </div> 
  )
}

export default Pract
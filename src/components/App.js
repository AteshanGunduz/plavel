import { useEffect, useState } from "react";
import Search from "./Search"


const App = () => {
const [datas, setDatas] = useState([])



useEffect(()=>{
    const fetchData = async()=>{
      try {
        const res = await fetch('/items.json');
        const data = await res.json();
        setDatas(data.data || []);
      } catch (error) {
        console.log("Bir sorunla karşılaştık 😱", error);
      }
    }
    fetchData()
  },[])


  return (
    <div>
      <div className="container flex flex-col justify-evenly items-center mt-10 p-5 rounded-lg bg-gray-50">
        <Search datas={datas}/>
      </div>
    </div>

  )
}
export default App
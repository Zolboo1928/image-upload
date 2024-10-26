"use client";

import { useState } from "react";

const Page = () => {
  const [didFileInserted,setDidFileInserted] = useState(true)
  const [file, setFile] = useState(null);
  const[data,setData] = useState(null)
  const handleUpload = async ()=>{
     if(file){
       const formedData = new FormData();
       formedData.append("file", file);
       formedData.append("upload_preset", "zolboo");
       formedData.append("cloud_name", "dm77t1dnd");
       const response = await fetch(
         "https://api.cloudinary.com/v1_1/dm77t1dnd/image/upload",
         {
           method: "POST",
           body: formedData,
         }
       );
       const json = await response.json();
       setData(json);
     } else {
      setDidFileInserted(false)
      }
     }
  console.log(file)
  return (
    <div className="container">
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      {file && ( <p className="ready">ready to upload!</p>)}
      <button onClick={handleUpload}>upload</button>
      {didFileInserted ? null : <p className="red">neccessary</p>}
      {data && (
        <div>
          <img src={data.secure_url} alt="" className="img" />
          <p className="text">UPLOADED SUCCESSFULLY!</p>
        </div>
      )}
    </div>
  );
};
export default Page;

import { useState } from "react";
import { deleteProducts } from "../api/products";

const DeleteProduct = () => {
  const [productId, setProductId] = useState('');

  const handleDelete = async () => {
    const response = await deleteProducts(productId);
    console.log(response);
  }

  return (
    <>
      <div className="w-screen h-screen bg-pink-300 p-5 flex justify-center items-center">
        <div className="rounded border border-blue-700 m-5 p-5 w-[500px] h-[200px]">

          <h1 className="text-7xl text-center text-blue-600 hover:cursor-pointer">Delete Product</h1>

          <div className="flex gap-5 m-10">
            <label className="text-md">Product ID: </label>
            <input value={productId} onChange={(e) => setProductId(e.target.value)} className="rounded border border-grey-400 text-black" type="text" />
          </div>

          <div className="flex justify-center">
            <button onClick={handleDelete} className="py-2 px-5 bg-red-500  text-black p-3 rounded hover:bg-red-700 hover:text-white">Delete</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default DeleteProduct;
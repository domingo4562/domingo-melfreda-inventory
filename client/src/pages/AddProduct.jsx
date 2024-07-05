import { useState } from "react";
import { addProducts } from "../api/products";

const AddProduct = () => {
  const [productId, setProductId] = useState('');
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('');
  const [price, setPrice] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleAdd = async () => {
    if (!productId ||!productName ||!quantity ||!unit ||!price) {
      setErrorMessage('Some fields are empty');
      return;
    }

    const response = await addProducts(productId, productName, quantity, unit, price);
    if (response.success) {
      setSuccessMessage('Product Added Successfully!');
      setErrorMessage('');
    } else {
      setErrorMessage('Error adding product');
    }
  };

  const handleCancel = () => {
    setProductId('');
    setProductName('');
    setQuantity('');
    setUnit('');
    setPrice('');
    setErrorMessage('');
    setSuccessMessage('');
  };

  return (
    <>
      <div className="h-[245px] flex mt-30 justify-center  items-center">
        <form class="w-[390px] mt-50 h-15 bg-orange-400" action="">
          <div className="rounded border border-blue-700 p-5 w-[390px] h-[370px]">
            <h1 className="text-3xl font-bold text-center text-white font-mono">Add Product</h1>

            <div className="flex gap-3  m-5">
              <label className="text-xs font-bold font-mono">Product ID: </label>
              <input value={productId} onChange={(e) => setProductId(e.target.value)} className="border-black-500 rounded border text-black font-mono" type="text" />
            </div>

            <div className="flex gap-3 m-5">
              <label className="text-xs font-bold font-mono">Product Name: </label>
              <input value={productName} onChange={(e) => setProductName(e.target.value)} className="rounded border border-black-900 text-black font-mono" type="text" />
            </div>

            <div className="flex gap-3 m-5">
              <label className="text-xs font-bold font-mono">Quantity: </label>
              <input value={quantity} onChange={(e) => setQuantity(e.target.value)} className="rounded border border-grey-400 text-black font-mono" type="text" />
            </div>

            <div className="flex gap-3 m-5">
              <label className="text-xs font-bold font-mono">Unit: </label>
              <input value={unit} onChange={(e) => setUnit(e.target.value)} className="rounded border border-grey-400 text-black font-mono" type="text" />
            </div>

            <div className="flex gap-3 m-5">
              <label className="text-xs font-bold font-mono">Price: </label>
              <input value={price} onChange={(e) => setPrice(e.target.value)} className="rounded border border-grey-400 text-black font-mono" type="text" />
            </div>

            <div className="flex justify-center">
              <button onClick={handleAdd} className="py-1 px-5 bg-blue-500 text-white p-5 rounded hover:bg-blue-400 hover:text-white m-2 font-mono">Add</button>
              <button onClick={handleCancel} className="py-1 px-5 bg-black text-white p-5 rounded hover:bg-red-400 hover:text-white m-2 ml-auto font-mono">Cancel</button>
            </div>

            {errorMessage && (
              <div className="text-red-600 text-lg text-center font-mono">{errorMessage}</div>
            )}

            {successMessage && (
              <div className="text-green-600 text-lg text-center font-mono">{successMessage}</div>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default AddProduct;
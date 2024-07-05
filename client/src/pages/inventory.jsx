import { useEffect, useState } from "react";
import { getProducts, updateProducts, deleteProducts, addProducts } from "../api/products";
import AddProduct from "./AddProduct";
import UpdateProduct from "./UpdateProduct";

const Inventory = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = async () => {
    setLoading(true);
    const response = await getProducts();
    setProducts(response);
    setLoading(false);
  };

  const handleUpdate = async (product) => {
    setLoading(true);
    const response = await updateProducts(product);
    console.log(response);
    setProducts(products.map((p) => (p.product_id === product.product_id? product : p)));
    setLoading(false);
  };

  const handleDelete = async (productId) => {
    setLoading(true);
    const response = await deleteProducts(productId);
    console.log(response);
    setProducts(products.filter((p) => p.product_id!== productId));
    setLoading(false);
  };

  const handleAddProduct = async (newProduct) => {
    setLoading(true);
    const response = await addProducts(newProduct);
    setProducts([...products, response]);
    setShowAddProduct(false); // Hide the AddProduct component after submission
    await getAllProducts(); // Refetch the products from the database
    setLoading(false);
  };

  const handleShowAddProduct = () => {
    setShowAddProduct(true);
  };

  const handleHideAddProduct = () => {
    setShowAddProduct(false);
  };

  const handleUpdateProduct = (product) => {
    setEditingProduct(product);
  };
  const handleHideUpdateProduct = () => {
    setEditingProduct(null);
  };

  return (
    <div className="h-screen bg-orange-400">
      <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
        <h1 className="text-3xl font-bold text-center mb-4 text-white">My Inventory</h1>

        {loading? (
          <div className="flex justify-center">
            <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200 overflow-x-auto shadow-md">
            <thead>
              <tr>
                <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-mono">Product Id</th>
                <th scope="col" className="px-6 py-3 text-left bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider font-mono">Product Name</th>
                <th scope="col" className="px-6 py-3 text-left bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider font-mono">Quantity</th>
                <th scope="col" className="px-6 py-3 text-left bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider font-mono">Unit</th>
                <th scope="col" className="px-6 py-3 text-left bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider font-mono">Price</th>
                <th scope="col" className="px-6 py-3 text-left bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider font-mono">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((element, index) => {
                return (
                  <tr key={index}>
                    <td>{element.product_id}</td>
                    <td>{element.product_name}</td>
                    <td>{element.quantity}</td>
                    <td>{element.unit}</td>
                    <td>{element.price}</td>
                    <td>
                      <button
                        className="p-2 rounded bg-blue-500 text-white hover:bg-gray-700"
                        onClick={() => {
                          setEditingProduct(element);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="p-2 rounded bg-blue-500 text-white hover:bg-gray-700"
                        onClick={() => handleDelete(element.product_id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        <div className="flex justify-center m-5">
          <button className="p-2 rounded bg-black text-white hover:bg-gray-700" onClick={handleShowAddProduct}>
            Add Product
          </button>
        </div>

        {showAddProduct && (
          <AddProduct
            onAddProduct={handleAddProduct}
            onHide={handleHideAddProduct}
          />
        )}
        {editingProduct && (
          <UpdateProduct
            product={editingProduct}
            onUpdate={handleUpdate}
            onHide={handleHideUpdateProduct}
          />
        )}
      </div>
    </div>
  );
};

export default Inventory;
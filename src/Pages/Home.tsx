import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import supabase from "../supabaseClient";

type category = {
  id: number;
  name: string;
};
type sorted = {
  id: number;
  img: string;
  name: string;
  price: number;
  category: { id: any; name: any };
  is_available: boolean;

};
type products = {
  id: number;
  img: string;
  name: string;
  price: number;
  category: { id: number; name: string };
  is_available: boolean;
};

export const Home = () => {
  const [cate, setCate] = useState<category[]>([]);
  const [sorted, setSorted] = useState<sorted[]>([]);
  const [products, setProducts] = useState<products[]>([]);
  const [loading, setLoading] = useState(false);
  const [ploading, setPloading] = useState(false);

  const [active, setActive] = useState<string | null>(null);

  // Modal state
  const [modalProduct, setModalProduct] = useState<products | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase.from("category").select(`*`);
        if (error) {
          console.log(error);
        }
        if (data) {
          setCate(data);
          setActive(data[0].name);
        }
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    setPloading(true);
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase.from("food_items").select(`
          id,
          name,
          price,
          img,
          is_available,
          category:category_id (
            id,
            name
          )
        `);
        if (error) {
          console.log(error);
        }
        if (data) {
          const mappedData = data.map((item: any) => ({
            id: item.id,
            img: item.img,
            name: item.name,
            price: item.price,
            is_available: item.is_available,
            category: Array.isArray(item.category)
              ? item.category[0]
              : item.category,
          }));
          setProducts(mappedData);
        }
      } catch (e) {
        console.log(e);
      } finally {
        setPloading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter(
      (item) => item.category?.name === active
    );
    setSorted(filtered);
  }, [active, products]);

  if (loading || ploading) {
    return <div className="text-white">loading.......</div>;
  }

  return (
    <>
     
      {modalProduct && (
        <>
          <div
            className="fixed inset-0   backdrop-blur-md z-50"
            onClick={() => setModalProduct(null)}
          />
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-[#1F1D2B] rounded-lg p-8 w-96 text-white relative">
              <button
                onClick={() => setModalProduct(null)}
                className="absolute top-2 right-2 text-white text-xl font-bold"
              >
                &times;
              </button>
              <img
                src={modalProduct.img}
                alt={modalProduct.name}
                className="w-full h-48 object-cover rounded"
              />
              <h2 className="text-2xl font-semibold mt-4">{modalProduct.name}</h2>
              <p className="mt-2 text-lg">Price: Rs {modalProduct.price}</p>

              <div className="mt-4 flex items-center gap-2">
                <label htmlFor="quantity" className="text-lg">
                  Quantity:
                </label>
               <div className="flex flex-row gap-2 items-center">
                <div className="text-white text-lg  px-2 py-0 bg-[#2D303E] hover:bg-[] cursor-pointer" onClick={()=>{
                 quantity>1 ? (setQuantity(quantity-1)): "" ;
                }}>-</div>
                <div className="text-white text-xl  px-3 py-1 bg-[#2D303E] cursor-pointer">{quantity}</div>
                <div className="text-white text-lg  px-2 py-0 bg-[#2D303E] cursor-pointer"  onClick={()=>{
                  (setQuantity(quantity+1)) 
                }}>+</div>
               </div>
              </div>

              <p className="mt-4  font-bold">
                <span className="text-gray-100 text-lg">Total Price: </span><span className="text-rose-500 text-2xl p-1">Rs {modalProduct.price * quantity}</span>
              </p>
              <div className="bg-[tomato] text-white px-3 py-2 rounded-3xl w-48 text-center mx-auto mt-4 cursor-pointer">Add to bill</div>
            </div>
          </div>
        </>
      )}

      <div className="flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <div className="text-gray-200 text-xl font-bold">
            {new Date().toLocaleDateString("en-CA")}
          </div>
          <div className="flex text-white gap-3 items-center">
            <Search size={24} />
            <input
              className="text-lg p-2 focus:"
              type="search"
              placeholder="Search Fooditems...."
            />
          </div>
        </div>
        <div className="w-full flex flex-row gap-6 mt-5 mb-4">
          {cate.map((item) => (
            <div
              key={item.id}
              className={`cursor-pointer text-lg  font-bold ${
                active === item.name
                  ? "text-[#EA7C69] border-b-4"
                  : "text-white"
              }`}
              onClick={() => setActive(item.name)}
            >
              {item.name}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 mx-12 mt-8 mb-4">
          {sorted.map((item) => (
            <div
              key={item.id}
              className="mb-8 z-40 mx-4 relative bg-[#1F1D2B] rounded-xl overflow-hidden w-80 h-96 text-white cursor-pointer"
              onClick={() => {
                setModalProduct(item);
                setQuantity(1);
              }}
            >
              <img
                src={item.img}
                className="w-80 h-80 object-cover -translate-y-9"
                alt="Food"
              />
              <div className="absolute z-10 bottom-0 justify-end left-0 w-full flex flex-col h-20 p-4">
                <div className="text-center text-lg font-semibold">
                  {item.name}
                </div>
                <div className="text-center text-md font-bold mt-1">
                  {item.price}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

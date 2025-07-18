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
};
type products = {
  id: number;
  img: string;
  name: string;
  price: number;
   category: { id: number; name: string }; 
  is_available:boolean;
};
export const Home = () => {
  const [cate, setCate] = useState<category[]>([]);
  const [sorted, setSorted] = useState<sorted[]>([]);
  const [products, setProducts] = useState<products[]>([]);
  const [loading, setLoading] = useState(false);
  const [ploading, setPloading] = useState(false);

  const [active, setActive] = useState<string | null>(null);

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
  `);;
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
    // If category is an array, pick the first element; otherwise keep object
    category: Array.isArray(item.category) ? item.category[0] : item.category,
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
    <div className="text-white">loading.......</div>;
  }
  return (
    <div className="flex flex-col ">
      <div className="flex flex-row justify-between items-center ">
        <div className="text-gray-200 text-xl font-bold">
          {new Date().toLocaleDateString("en-CA")}
        </div>
        <div className=" flex text-white gap-3 items-center">
          <Search size={24} />
          <input
            className="text-lg p-2 focus:"
            type="search"
            placeholder="Search Fooditems...."
          ></input>
        </div>
      </div>
      <div className="flex flex-row gap-6 mt-5 mb-4">
        {cate.map((item) => (
          <div key={item.id}
            className={`cursor-pointer text-lg font-bold ${
              active === item.name ? "text-[#EA7C69] border-b-4" : "text-white"
            }`}
            onClick={() => setActive(item.name)}
          >
            {item.name}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 mx-12  mt-8 mb-4 ">
        {
          sorted.map((item)=>(
       <div className=" mb-8 z-40 relative bg-[#1F1D2B] rounded-xl overflow-hidden w-72 h-80 text-white">
  <img
    src={item.img}
    className="w-80 h-80 object-cover -translate-y-9"
    alt="Food"
  />
  <div className="absolute z-10 bottom-0 justify-end left-0 w-full  flex flex-col h-20  p-4">
    <div className="text-center text-lg font-semibold">{item.name}</div>
    <div className="text-center text-md font-bold mt-1">{item.price}</div>
  </div>
</div>



          ))
        }















        
      </div>
    </div>
  );
};

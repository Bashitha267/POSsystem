import { useEffect, useState } from "react"
import supabase from "../supabaseClient"

type Product = {
  name:string,
  price:number,
  id:number,
  is_availble:boolean,
  img:string,
  category_id:string,
  created_at:string
}
export const ItemPage = () => {
  const [products,setProducts]=useState<Product[]>([])
  const[loading,setLoading]=useState(false)

  useEffect(()=>{
    const fetchProducts= async ()=>{
      setLoading(true);
      try{
  const {data,error}=await supabase
  .from('food_items')
  .select('*')
if(error){
  console.log(error)
}
if(data){
  setProducts(data)
}
        
      }
      catch(e){
        console.log(e)

      }
      finally{
        setLoading(false)
      }
    }
    fetchProducts()


  },[])
  return (
     <div>
      <h1>Item Page</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              {product.name} - ${product.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

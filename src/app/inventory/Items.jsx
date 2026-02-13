 'use client';
import {useState , useEffect} from "react";
import {getItems} from "@/lib/service/api";
export default function Items(){
    const [items , setItems] = useState([]);

    useEffect(
        ()=>{
          const   item =  getItems() ;
         local
        }
    , [])
}
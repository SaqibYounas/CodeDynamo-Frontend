import { url } from "./Port";

export async function getInvoicesData(){
    try{
        let res=await fetch(`${url}/user/invoices/all`, {
        method: "GET",
        credentials: "include",
      });
      let data=await res.json();
      if(res.ok){
        return data;
      }else{
        return 0
      }
    }catch(error){
        return 0;
    }
}
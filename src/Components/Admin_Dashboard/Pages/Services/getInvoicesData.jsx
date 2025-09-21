import { url } from "./Port";

export async function getInvoicesData(page){
    try{
        let res=await fetch(`${url}/admin/user/invoices/all?page=${page}&limit=10`, {
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
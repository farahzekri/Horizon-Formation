const BASE_URL = 'http://localhost:8000';



export const get_All_Users =async()=>{
    try{
      const response =await fetch('http://localhost:8000/user/get_All_Users',{
        method:'GET',
       
      });
      if(!response.ok){
        throw new Error('Failed to fetch users');
      }

      const data =await response.json();
      return data;
    }catch(error){
      throw new Error('Failed to fetch users');
    }
};
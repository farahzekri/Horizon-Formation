

export const get_All_Users =async()=>{
    try{
      const response =await fetch('http://localhost:3000/user/get_All_Users',{
        method:'GET',
       
      });
      if(!response.ok){
        throw new Error('Failed to fetch users');
      }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Failed to fetch users");
  }
};

export const Update_Status = async (userId, newStatus) => {
  try {
    const response = await fetch(`http://localhost:3000/user/Update_Status/${userId}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ newStatus }),
    });

    if (!response.ok) {
      throw new Error("Failed to update user status");
    }

    const data = await response.json();
    return data.user; // Retourne les données utilisateur mises à jour
  } catch (error) {
    console.error("Error updating user status:", error.message);
    throw error;
  }
};

export const get_User_By_Username =async(username)=>{
  try{
    const response =await fetch(`http://localhost:3000/user/Profil/${username}`,{
      method:'GET',
     
    });
    if(!response.ok){
      throw new Error('Failed to fetch user');
    }

    const data =await response.json();
    return data;
  }catch(error){
    throw new Error('Failed to fetch user');
  }
};

export const Update_User_By_Username = async (username, userData) => {
  try {
    const response = await fetch(`http://localhost:3000/user/updateProfil/${username}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userData }),
    });

    if (!response.ok) {
      throw new Error('Failed to update user status');
    }

    const data = await response.json();
    return data.user; // Retourne les données utilisateur mises à jour
  } catch (error) {
    console.error('Error updating user status:', error.message);
    throw error;
  }
};

export const get_User_By_Username =async(username)=>{
  try{
    const response =await fetch(`http://localhost:3000/user/Profil/${username}`,{
      method:'GET',
     
    });
    if(!response.ok){
      throw new Error('Failed to fetch user');
    }

    const data =await response.json();
    return data;
  }catch(error){
    throw new Error('Failed to fetch user');
  }
};

export const Update_User_By_Username = async (username, userData) => {
  try {
    const response = await fetch(`http://localhost:3000/user/updateProfil/${username}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userData }),
    });

    if (!response.ok) {
      throw new Error('Failed to update user status');
    }

    const data = await response.json();
    return data.user; // Retourne les données utilisateur mises à jour
  } catch (error) {
    console.error('Error updating user status:', error.message);
    throw error;
  }
};


export async function loadUser(id) {
  try {
    const response = await fetch('../json/users.json');
    
    if (!response.ok) {
      throw new Error("Failed to load file");
    }
    
    const users = await response.json();
    return users.find(user => user.id == id); ;
    
  } catch (error) {
    console.error("Error:", error);
    return []; 
  }
}


export async function loadBooks() {
  try {
    const response = await fetch('../json/books.json');
    
    if (!response.ok) {
      throw new Error("Failed to load file");
    }
    
    const booksArray = await response.json();
    
    return booksArray; 
    
  } catch (error) {
    console.error("Error:", error);
    return []; 
  }
}



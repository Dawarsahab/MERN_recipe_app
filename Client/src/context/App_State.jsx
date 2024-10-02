import React,{useEffect, useState} from 'react'
import { AppContext } from './App_Context'
import axios from 'axios'
const App_State = (props) => {
  const url="http://localhost:3000/api";
  const [token, setToken] = useState("");
  const [recipe, setrecipe] = useState([]);
  const [savedRecipe, setsavedRecipe] = useState([])
  const [user, setuser] = useState([])
  const [userId, setuserId] = useState("")
  const [userRecipe, setuserRecipe] = useState([])
  const [isAuthenticated, setisAuthenticated] = useState(false)
  const [reload, setreload] = useState(true)
  useEffect(()=>{
    const fetchRecipe=async()=>{
      const api=await axios.get(`${url}/`,{
        headers:{
          "Content-Type":"application/json"
        },
        withCredentials:true
      });
      setrecipe(api.data.recipe);
      
    }
    fetchRecipe();
    getsaveRecipeById();
    profile();
    recipeByUser(userId);
  },[token,userId,reload]);

  useEffect(()=>{
    if(token){
      localStorage.setItem("token",token)
    }
    const tokenFromLocalStorage=localStorage.getItem("token",token)
    if(tokenFromLocalStorage){
      setToken(tokenFromLocalStorage);
      setisAuthenticated(true)
    }
  },[token,reload])
  //register
  const register=async(name,gmail,password)=>{
    const api=await axios.post(`${url}/register`,{
      name,gmail,password
    },{
      headers:{
        "Content-Type":"application/json"
      },
      withCredentials:true
    })
    //setToken(api.data.token)
    return api;
  }
  //login
  const login=async(gmail,password)=>{
    const api=await axios.post(`${url}/login`,{
      gmail,password
    },{
      headers:{
        "Content-Type":"application/json"
      },
      withCredentials:true
    })
    setToken(api.data.token)
    setisAuthenticated(true)
    return api;
  }
  // add recipe
  const addRecipe=async(title,
    ist,
    ing1,
    ing2,
    ing3,
    ing4,
    qty1,
    qty2,
    qty3,
    qty4,
    imgurl)=>{
      const api=await axios.post(`${url}/add`,{
        title,
        ist,
        ing1,
        ing2,
        ing3,
        ing4,
        qty1,
        qty2,
        qty3,
        qty4,
        imgurl
      },{
        headers:{
          "Content-Type":"application/json",
          Auth:token
        },
        withCredentials:true
      })
      //setToken(api.data.token)
      setreload(!reload)
      return api;
    }
    //recipebyid
    const getRecipeById=async(id)=>{
      const api=await axios.get(`${url}/${id}`,{
        headers:{
          "Content-Type":"application/json"
        },
        withCredentials:true
      })
      //setToken(api.data.token)
      return api;
    }
    //save recipe by id
    const saveRecipeById=async(id)=>{
      const api=await axios.post(`${url}/${id}`,{},{
        headers:{
          "Content-Type":"application/json",
          Auth:token
        },
        withCredentials:true
      })
      //setToken(api.data.token)
      console.log(api);
      setreload(!reload)
      return api;
    }
    //getsave recipe by id
    const getsaveRecipeById=async()=>{
      const api=await axios.get(`${url}/saved`,{
        headers:{
          "Content-Type":"application/json",
          
        },
        withCredentials:true
      })
      //setToken(api.data.token)
      console.log("getting saved recipe",api.data.recipe);
      setsavedRecipe(api.data.recipe)
      //return api;
    }
    //profile
    const profile=async()=>{
      const api=await axios.post(`${url}/user`,{
        headers:{
          "Content-Type":"application/json",
          Auth:token
        },
        withCredentials:true
      })
      //setToken(api.data.token)
      //console.log("This is user profile",api.data.user)
      setuserId(api.data.user._id)
      setuser(api.data.user)
    }
    //get recipe by userid
    const recipeByUser=async(id)=>{
      const api=await axios.get(`${url}/user/${id}`,{
        headers:{
          "Content-Type":"application/json",
          
        },
        withCredentials:true
      })
      //setToken(api.data.token)
      //console.log("user specific recipe",api);
      setuserRecipe(api.data.recipe)
    }
    const logOut=()=>{
      localStorage.removeItem("token",token)
      setToken("")
      setisAuthenticated(false)
    }

  return (
    <AppContext.Provider value={{
      login,
      register,
      addRecipe,
      recipe,
      getRecipeById,
      saveRecipeById,
      savedRecipe,
      user,
      logOut,
      userRecipe,
      isAuthenticated,
      setisAuthenticated
    }}>
        {props.children}
    </AppContext.Provider>
  )
}

export default App_State
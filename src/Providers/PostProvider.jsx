import React from "react";
import { useState } from "react";
import { faker } from "@faker-js/faker";


const PostContext = React.createContext()

function createRandomPost() {
  return {
    title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
    body: faker.hacker.phrase(),
  };
}


const PostProvider = ({children}) => {

 
  const [posts, setPosts] = useState(() =>
    Array.from({ length: 30 }, () => createRandomPost())
  );
  const [searchQuery, setSearchQuery] = useState("");


  const searchedPosts =
  searchQuery.length > 0
    ? posts.filter((post) =>
        `${post.title} ${post.body}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      )
    : posts;


    function handleAddPost(post) {
      setPosts((posts) => [post, ...posts]);
    }
  
    function handleClearPosts() {
      setPosts([]);
    }



    
   return (

      <PostContext.Provider value = {{posts,searchQuery,setSearchQuery,handleAddPost,handleClearPosts}}>
      {children}
      </PostContext.Provider> 

   )


}


function usePosts()
{

  const posts = React.useContext(PostContext)

  if(!posts)
    throw new Error("The context is used outside the PostProvider")

  return posts

}

export {usePosts,PostContext,PostProvider}
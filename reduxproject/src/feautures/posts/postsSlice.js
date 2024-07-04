import { createSlice, createAsyncThunk, createSelector,createEntityAdapter } from "@reduxjs/toolkit";
// import { sub } from "date-fns";
import axios from "axios";
import { sub } from "date-fns";
const POST_URL="https://jsonplaceholder.typicode.com/posts"//DummyAPI
const postAdapter=createEntityAdapter({
    sortComparer:(a,b)=>b.date.localeCompare(a.date)//these sorting kinda things can be done by the createEntityAdapter itself
    //this createEntityAdapter will seperate the id and entities,here id is let to be autogenerated
})
const initialState=postAdapter.getInitialState({
    // posts:[],
    status:'idle',//idle/loading/succeeded/failed
    error:null,
    counter:0
})
export const fetchPosts=createAsyncThunk('posts/fetchPosts',async()=>{//createAsyncThunk is used here for fetching data from api calls.
    const response=await axios.get(POST_URL)
    return response.data//this async function will return 3 promises,pending,fulfilled,reject...
})
export const addNewPost=createAsyncThunk('posts/addNewPost',async(initialPost)=>{
    const response =await axios.post(POST_URL,initialPost) 
    return response.data
})
export const updatePost=createAsyncThunk("posts/updatePost",async(initialPost)=>{
    const{id}=initialPost//ObjectDestructuing to get that particular post's id to be edited/updated
    try{
        const response =await axios.put(`${POST_URL}/${id}`,initialPost)//this initalpost holds the updated information
        return response.data
        
    }

    catch(err){
        return initialPost
        //here we cant directly update the data in api since it is a public fake api it will not allow to add up multiple users trial datas,so for in this case it is better to return the initial post itself rather returning the error message
    }
})
export const deletePost=createAsyncThunk("posts/deletePost",async(initialPost)=>{
    const{id}=initialPost//ObjectDestructuing to get that particular post's id to be deleted
    try{
        const response =await axios.delete(`${POST_URL}/${id}`)
        if(response?.status===200) return initialPost//here returning inital post in the sense getting that particular id ,which is got deleted
        return `${response?.status}:${response?.statusText}`
    }

    catch(err){
        return err.message
    }
})
    
const postsSlice=createSlice({
    name:'posts',
    initialState,
    reducers:{
    //     postsAdded:{
    //         reducer(state,action){
    //         state.posts.push(action.payload)
    //     },
    // prepare(title,content,userId){
    //     return{
    //         payload:{
    //             id:nanoid(),
    //             title,
    //             content,///This is the place where we are getting the data /input from the users
    //             date:new Date().toISOString(),
    //             userId,
    //             reactions:{
    //                 thumbsUp:0,
    //                 wow:0,
    //                 heart:0,
    //                 rocket:0,
    //                 coffee:0///these reactions where not acquired from the users defaultly every posts will have zero reactions.
    //                }
    //             }
    //         }
    //     }
    // },
            reactionsAdded(state,action){
                const{postId,reaction}=action.payload
                // const exisitingpost=state.posts.find(post=>post.id===postId)
                const existingpost=state.entities[postId]//since enities are passed as object we gave[postId],ifwe pass this id it will fetch that particular existingpost
                if(existingpost){
                    existingpost.reactions[reaction]++
                }
            },
        increaseCount(state,action){
            state.counter=state.counter+1
        }
    },
        extraReducers(builder){//here builder is a object...
            builder
            .addCase(fetchPosts.pending,(state,action)=>{//this action's promise is pending promise
                state.status='loading'

            })
            .addCase(fetchPosts.fulfilled,(state,action)=>{//this action's promise is fulfilled promise
                state.status='succeeded'
                //Adding date and reactions in the acquired data
                let min=1;
                const loadedPosts=action.payload.map(post=>{
                    post.date=sub(new Date(),{minutes:min++}).toISOString()
                    post.reactions={
                        thumbsUp:0,
                        wow:0,
                        heart:0,
                        rocket:0,
                        coffee:0
                    }
                    return post;
                })
                //Adding loadedposts to the  fetched posts inital array from api call
                // state.posts=state.posts.concat(loadedPosts)//it will internally implement the immer package only,i.e creating a shallow copy only
                postAdapter.upsertMany(state,loadedPosts)//read operation using entityadapter
            })
            .addCase(fetchPosts.rejected,(state,action)=>{//this action's promise is rejected promise
                state.status='failed'
                state.error=action.error.message 
            })
            .addCase(addNewPost.fulfilled,(state,action)=>{
                const sortedPosts=state.posts.sort((a,b)=>{
                    if(a.id>b.id) return 1//a should come after b
                    if(a.id<b.id) return -1//a should come before b
                    return 0//in equal terms
                })
                action.payload.id=sortedPosts[sortedPosts.length-1].id+1;
                action.payload.userId=Number(action.payload.userId)
                action.payload.date=new Date().toISOString()
                action.payload.reactions={
                    thumbsUp:0,
                    wow:0,
                    heart:0,
                    rocket:0,
                    coffee:0
                }
                console.log(action.payload)
                // state.posts.push(action.payload)
                postAdapter.addOne(state,action.payload)//adding  using entityadapter

            })
            .addCase(updatePost.fulfilled,(state,action)=>{
                if(!action.payload?.id){
                    console.log("Update couldn't be completed,it has some issues ")
                    console.log(action.payload)
                    return;
                }
                // const{id}=action.payload//updated post's id, This is the edited post's acquired id
                action.payload.date=new Date().toISOString()
                // const posts=state.posts.filter((post)=>post.id!==id)//here this will filter out the current updated post,(i.e) the existing post befre editing
                // //Edited post is deleted here int ht above line
                // state.posts=[...posts,action.payload]
                postAdapter.upsertOne(state,action.payload)//update operation using entityadapter

            })
            .addCase(deletePost.fulfilled,(state,action)=>{
                if(!action.payload?.id){//here if id is not there in action.payload in the sense ,it has errormessage
                    console.log("Delete Action Could not be completed")
                    console.log(action.payload)
                    return;
                }
                 const{id}=action.payload
                // const posts=state.posts.filter((post)=>post.id!==id)
                // state.posts=posts
                postAdapter.removeOne(state,id)//delete operation using entityadapter,since it only accepts single entity entire payload cant be passed
                

            })
        }
}) 
//getSelectors create these selectors and we rename them with aliases using destructuring
export const{
    selectAll:selectAllPosts,
    selectById:selectPostById,
    selectIds:selectPostIds
}=postAdapter.getSelectors(state=>state.posts)
//entity adapters will also provide selector functions...so..
// export const  selectAllPosts=(state)=>state.posts.posts; 
export const getPostsStatus=(state)=>state.posts.status
export const getPostsError=(state)=>state.posts.error
export const getCount=(state)=>state.posts.counter
// export const selectPostById=(state,postId)=>state.posts.posts.find((post)=>post.id===postId)
 export const selectPostsByUser=createSelector([selectAllPosts,(state,userId)=>userId]//this array is the dependency array and it should only take functions as input
 ,(posts,userId)=>posts.filter((post)=>post.userId===userId))//This is used for memoization
//this will trigger only when posts and userId,this is much effective because filter condition ised in the slice itself
 //Memoization is used as caching technique if same arguments is passed for a function continously in the sense this technique will let you render the action for the first time only.
export const{increaseCount}=postsSlice.actions
export const{reactionsAdded}=postsSlice.actions
export default postsSlice.reducer
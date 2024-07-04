import AddPostForm from "./feautures/posts/AddPostForm";
import PostsList from "./feautures/posts/PostsList";
import { Routes,Route,Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import EditPostsForm from "./feautures/posts/EditPostsForm";
import SinglePostPage from "./feautures/posts/SinglePostPage";
import UsersList from "./feautures/users/UsersList";
import Userpage from "./feautures/users/Userpage";



function App() {
  return (
    // <main>
    //   <AddPostForm />
    //   <PostsList />
    // </main>
    <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<PostsList />} />
      <Route path="post">
        <Route index element={<AddPostForm />} />
        <Route path="edit/:postId" element={<EditPostsForm />} />
        <Route path=":postId" element={<SinglePostPage />} />
      </Route>
      <Route path="user">
      <Route index element={<UsersList />}/>
      <Route path=":userId" element={<Userpage />}/>
    </Route>
    <Route path="*" element={<Navigate to="/" replace/>}/>
    </Route>
  </Routes>
    
  );
}

export default App;

import './App.css';
import { Route, Routes } from 'react-router-dom'
import LoginController from './features/auth/LoginController';
import RegisterController from './features/auth/register.component';
import CreatePost from './features/posts/Create';
import { Read } from './features/posts/Read';
import Posts from './features/posts/Posts';
import Layout from './components/shared/DefaultLayout';
import AuthLayout from './components/shared/AuthLayout';
import Dashboard from './components/dashboard/Dashboard';
import Statistics from './components/dashboard/Statistics';
import UsersList from './features/users/UsersList';
import EditPost from './features/posts/EditPost';
import EditUser from './features/users/EditUser';
import Prefetch from './features/users/Prefetch';
import PersistLogin from './features/auth/persistLogin';
import RequiredAuth from './features/auth/RequiredAuth';
import { roles } from './config/roles'
import Unauthorized from './features/auth/unauthorized';
import NotFound from './components/NotFound';
import AdminLayout from './components/admin/AdminLayout';
import ShowPosts from './features/posts/ShowPosts';
import PrefetchPosts from './features/posts/PrefetchPosts';
import ApprovePosts from './components/admin/ApprovePosts';
import Editor from './components/editor';
import AboutAuthor from './components/author/about';
import CreateAuthor from './components/author/create';

function App() {
  return (
    <div className="App">
        <Routes>
          <Route element={<PersistLogin />}>
            <Route element={<PrefetchPosts />} >

              {/* Non Authenticated User Routes */}
              <Route path='/' element={<Layout/>} >
                <Route index element={<ShowPosts />} />
                <Route path='read/:id' element={<Read />} />
                <Route path='about-developer' element={<AboutAuthor />} />
              </Route>
              {/* Non Authenticated User Routes Ends */}

              {/* Author Routes */}
              <Route path='/author' element={<Layout/>} >
                <Route index element={<CreateAuthor />} />
              </Route>
              {/* Author Routes Ends */}

              {/* Auth Routes */}
              <Route path='/auth' element={<AuthLayout />} >
                  <Route path='login' element={<LoginController />} />
                  <Route path='register' element={<RegisterController />} />
                  <Route path='update/:id' element={<EditUser />} />
                  <Route path='unauthorized' element={<Unauthorized />} />
                </Route>
              {/* Auth Routes Ends */}

              {/* Authenticated User Routes */}
                <Route element={<RequiredAuth allowedRoles={[...Object.values(roles)]} />}>
                  <Route path='dashboard' element={<Dashboard />}>
                    <Route index element={<Statistics />} />
                    <Route path="posts" element={<Posts />} />
                    <Route path='posts/create' element={<CreatePost />} />
                    <Route path='posts/:id' element={<EditPost />} />
                  </Route>
                </Route>
              {/* Authenticated User Routes Ends */}

              {/* Admin Routes */}
                <Route element={<RequiredAuth allowedRoles={[roles.admin]} />} >
                  <Route element={<Prefetch />}>
                    <Route path='/admin' element={<AdminLayout />} >
                      <Route index element={<Statistics />} />
                      <Route path='posts' element={<Posts />} />
                      <Route path='posts/create' element={<CreatePost />} />
                      <Route path='posts/:id' element={<EditPost />} />
                      <Route path='posts/approve' element={<ApprovePosts />} />
                      <Route path='userslist' element={<UsersList />} />
                    </Route>
                  </Route>
                </Route>
              </Route>

            {/* Admin Routes Ends */}
          </Route>
          <Route path='*' element={<NotFound />} />
        </Routes>
    </div>
  );
}

export default App;

import {Route, RouterProvider, createBrowserRouter, createRoutesFromElements} from 'react-router-dom';
import {Layout} from './components/Layout';
import {HomePage} from "./pages/HomePage";
import {NotFoundPage} from "./pages/NotFoundPage";
import {listAllResLoader, listAllVacLoader, ListPage} from "./pages/ListPage";
import {RegPage, regAction} from "./pages/RegPage";
import {logAction, LogPage} from "./pages/LogPage";
import {useDispatch} from 'react-redux';
import {infoLoader, ProfilePage} from "./pages/ProfilePage";
import {CardPage, resumeLoader, vacancyLoader} from "./pages/CardPage";

const Index = () => {
    const dispatch = useDispatch();
    // const user = useSelector((state) => state.user)
    const router = createBrowserRouter(createRoutesFromElements(
        <Route path='/' element={<Layout/>}>
            <Route path='*' element={<NotFoundPage/>}/>
            <Route index element={<HomePage/>}/>
            <Route path='/reg' element={<RegPage/>} action={regAction}/>
            <Route path='/log' element={<LogPage/>} action={
                ({request}) => logAction(request, dispatch)
            }/>
            <Route path='/prof' element={<ProfilePage/>} loader={infoLoader}/>
            <Route path='/vac' element={<ListPage type={"allVac"}/>} loader={listAllVacLoader}/>
            <Route path='/vac/:id' element={<CardPage type={"vac"}/>} loader={vacancyLoader}/>
            <Route path='/res' element={<ListPage type={"allRes"}/>} loader={listAllResLoader}/>
            <Route path='/res/:id' element={<CardPage type={"res"}/>} loader={resumeLoader}/>
        </Route>
    ))
    return <RouterProvider router={router}/>
}

const App = () => {
    return (
        <Index/>
    );
}

export default App;
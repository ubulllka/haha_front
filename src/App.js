import {Route, RouterProvider, createBrowserRouter, createRoutesFromElements} from 'react-router-dom';
import {Layout} from './components/Layout';
import {HomePage} from "./pages/HomePage";
import {NotFound} from "./pages/NotFound";
import {listAllResLoader, listAllVacLoader, ListPage} from "./pages/ListPage";
import {RegPage, regAction} from "./pages/RegPage";
import {logAction, LogPage} from "./pages/LogPage";
import {useDispatch} from 'react-redux';

const Index = () => {
    const dispatch = useDispatch();
    // const user = useSelector((state) => state.user)
    const router = createBrowserRouter(createRoutesFromElements(
        <Route path='/' element={<Layout/>}>
            <Route path='*' element={<NotFound/>}/>
            <Route index element={<HomePage/>}/>
            <Route path='/reg' element={<RegPage/>} action={regAction}/>
            <Route path='/log' element={<LogPage/>} action={
                ({request}) => logAction(request, dispatch)
            }/>
            <Route path='/vac' element={<ListPage type={"allVac"}/>} loader={listAllVacLoader}/>
            <Route path='/res' element={<ListPage type={"allRes"}/>} loader={listAllResLoader}/>
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
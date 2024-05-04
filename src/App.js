import {Route, RouterProvider, createBrowserRouter, createRoutesFromElements} from 'react-router-dom';
import {Layout} from './components/Layout';
import {HomePage} from "./pages/HomePage";
import {NotFound} from "./pages/NotFound";
import {listAllVacLoader, ListPage} from "./pages/ListPage";

const Index = () => {
    // const dispatch = useDispatch();
    // const user = useSelector((state) => state.user)
    const router = createBrowserRouter(createRoutesFromElements(
        <Route path='/' element={<Layout/>}>
            <Route path='*' element={<NotFound/>}/>
            <Route index element={<HomePage/>}/>
            <Route path='/vac' element={<ListPage type={"allVac"}/>} loader={listAllVacLoader}/>
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
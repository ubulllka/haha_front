import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import {useSelector} from "react-redux";
import {FilterTab} from "./FilterTab";
import RespondService from "../../services/RespondService";
import {VacProfile} from "../vacancies/VacProfile";
import {ResProfile} from "../resumes/ResProfile";

export const UserTabs = () => {
    const role = useSelector((state) => state.user.role)
    const getTitle = () => {
        return (role === "APPLICANT") ?
            "Мои резюме" : "Мои вакансии"
    }
    return (
        <Tabs
            defaultActiveKey="mylist"
            className="mb-3 mt-3"
        >
            <Tab eventKey="mylist" title={getTitle()}>
                {
                    (role === "EMPLOYER")
                        ? <VacProfile/>
                        : <ResProfile/>
                }
            </Tab>
            <Tab eventKey="myrespond" title="Мои отклики">
                <FilterTab type={"my"} funcForGetData={RespondService.getMyAllResponds}/>
            </Tab>
            <Tab eventKey="otherrespond" title="Отклики мне">
                <FilterTab type={"other"} funcForGetData={RespondService.getOtherAllResponds}/>
            </Tab>
        </Tabs>
    )
}
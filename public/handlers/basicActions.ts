import {auth} from "@queries/user";
import User from "@entities/User";
import {data} from "../main";

const saveUser = async function () {
    try {
        const response = await auth();
        console.log(response);
        data.user = response as User;
    } catch (error) {
        data.user = null;
    }
};

export {saveUser}
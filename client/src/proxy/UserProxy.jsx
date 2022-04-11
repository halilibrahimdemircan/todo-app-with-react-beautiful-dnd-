import Repository from "./Repository";

export default class UserProxy {


    // login with mail and password
    login(email, password) {
        return Repository.post("http://localhost:8000/api/login", {
            email: email,
            password: password,
        });
    };

    // save user to db
    saveUser(email, password) {
        return Repository.post("http://localhost:8000/api/register", {
            email: email,
            password: password,
        });
    }


}
import axios from "axios";

export default axios.create({
    headers: {
        token: JSON.parse(localStorage.getItem("token"))
    },
});

import axios from "axios";
import appConfig from "Constants/AppConfig";

export default axios.create({
    baseURL: `${appConfig.baseUrl}api/`
});

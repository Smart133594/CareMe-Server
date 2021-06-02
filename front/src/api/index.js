import axios from 'axios';
import appConfig from 'Constants/AppConfig'

export default
    axios.create({
        baseURL: appConfig.testMode?`${appConfig.localhost}api/`:"http://157.175.103.0/api"
    });

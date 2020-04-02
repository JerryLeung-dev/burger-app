import axios from 'axios';
// the endpoint API is from firebase, go to firecase create a project and 
// choose database => realtime database, for testing purpose change the rules to all true
const instance = axios.create({

    baseURL : 'https://react-my-bugger-7b8f8.firebaseio.com/'
});

export default instance
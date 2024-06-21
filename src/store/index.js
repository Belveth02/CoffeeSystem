import { createStore } from 'vuex';

export default createStore({
    state: {
        loggedIn: false,
        userid: '',
        username:'',
        password:'',
        phone: '',
        email: '',
        address: '',
        clerkid: '',
    },
    mutations: {
        SET_USER_INFO(state, user) {
            state.userid = user.userid;
            state.username = user.username;
            state.password =user.password;
            state.phone = user.phone;
            state.email = user.email;
            state.address = user.address;
            state.loggedIn = true;
        },
        SET_CLERK_INFO(state, clerk) {
            state.clerkid = clerk.clerkid;
        }
    },
    actions: {
        setUserInfo({ commit }, user) {
            commit('SET_USER_INFO', user);
        },
        setClerkInfo({ commit }, clerk) {
            commit('SET_CLERK_INFO', clerk);
        }
    },
    getters: {
        getUserInfo: state => ({
            loggedIn: state.loggedIn,
            userid: state.userid,
            username:state.username,
            password:state.password,
            phone: state.phone,
            email: state.email,
            address: state.address
        }),
        getClerkInfo: state => ({
            clerkid: state.clerkid,
        })
    }
});

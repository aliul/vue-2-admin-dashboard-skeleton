import VuexPersist from 'vuex-persist';

const vuexLocalStorage = new VuexPersist({
    key: 'vuex', // The key to store the state on in the storage provider.
    storage: window.localStorage, // or window.sessionStorage or localForage
    // Function that passes the state and returns the state with only the objects you want to store.
    // reducer: state => state,
    // Function that passes a mutation and lets you decide if it should update the state in localStorage.
    // filter: mutation => (true)
})


export const storage = {
    state: {
        authUser: null,
        authUserProfile: null,
        lang: ''
    },
    getters: {
        user: (state) => {
            return state.authUser
        },
        isAuthenticated: (state) => {
            return state.authUser && state.authUser.token !== null
        }
    },
    mutations: {
        setAuthUser: (state, payload) => {
            localStorage.setItem('auth', JSON.stringify(payload));
            state.authUser = payload;
        },
        setAuthUserName: (state, payload) => {
            let user = JSON.parse(localStorage.getItem('auth'));
            user.name = payload;
            state.authUser = user;
            localStorage.setItem('auth', JSON.stringify(user));
        },
        setAuthUserProfile: (state, payload) => {
            let user = JSON.parse(localStorage.getItem('auth'));
            user.userProfile = payload;
            state.authUser = user;
            localStorage.setItem('auth', JSON.stringify(user));
        }
    },
    actions: {
        saveAuthUser: (context, data) => {
            context.commit('setAuthUser', data);
        },
        updateAuthUserName: (context, data) => {
            context.commit('setAuthUserName', data);
        },
        updateAuthUserProfile: (context, data) => {
            context.commit('setAuthUserProfile', data);
        },
    },
    plugins: [vuexLocalStorage.plugin]
}

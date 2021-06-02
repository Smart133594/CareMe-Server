/**
 * Sidebar Module
 */

import { admins } from './admin.js';
import { providers } from './provider';
import { clients } from './client';
import { none } from './none';

const state = {
    menus : none,
}

const getters = {
    menus: state => {
        return state.menus;
    },
}

const actions = {
    setActiveMenuGroup(context, payload) {
        context.commit('setActiveMenuGroupHandler', payload);
    },

    setRoleMenus(context, payload) {
        context.commit('setMenus', payload);
    },
}

const mutations = {
    setActiveMenuGroupHandler(state, router) {
        let fullPath = '';
        if(router.pathURL){
            fullPath = router.pathURL;
        }else{
            fullPath = router.history.current.fullPath;
        }
        let path = fullPath.split('/');
        let matchedPath = '/' + path[2] + '/' + path[3];
        for (const category in state.menus) {
            for(const menuGroup in state.menus[category]) {
                if(state.menus[category][menuGroup].items !== null) {
                    for(const matched in state.menus[category][menuGroup].items){
                        if(state.menus[category][menuGroup].items[matched].path == matchedPath || state.menus[category][menuGroup].items[matched].path == fullPath ){
                           state.menus[category][menuGroup].active = true;
                        }
                    }
                }
            }
        }
    },

    setMenus(state, role){
        if(role.role == 'admin'){
            state.menus = admins;
        }else if(role.role == 'provider'){
            state.menus = providers
        }else if(role.role == 'client'){
            state.menus = clients
        }
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}

'use strict';

import Vue from 'vue'
import Vuex from 'vuex'
import request1 from '@/utils/request.js'
Vue.use(Vuex);

export const store = new Vuex.Store({
    // modules: {
    //     request
    //   },
    state: {
        firstTitle: '', // 主标题
        secondTitle: '', // 副标题
        documentsType: sessionStorage.getItem('documentsType') ? sessionStorage.getItem('documentsType') : '1',// 医疗单证的类型单证
        isScroll: true,//初始化可以滚动 
        isHoliday: '',//是否休假,
        beSureState: localStorage.getItem('beSureState'),
        aaa: "1111",
        scrollTop: 0,
        generalMedicalType: sessionStorage.getItem('generalMedicalType') ? sessionStorage.getItem('generalMedicalType') : '1',// 医疗单证的类型单证
        titleshow:'',
        titleclose:''
    },
    getters: {
        getBeSureState(state) {
            if (!state.beSureState) {
                state.beSureState = localStorage.getItem('beSureState')
            }
        },
        getA(state) {
            if (!state.aaa) {
                state.aaa = localStorage.getItem("aaa")
            }
        },
        getFirstTitle(state) {
            if (!state.firstTitle) {
                state.firstTitle = sessionStorage.getItem('firstTitle')
            }
            return state.firstTitle
        },
        getSecondTitle(state) {
            if (!state.secondTitle) {
                state.secondTitle = sessionStorage.getItem('secondTitle')
            }
            return state.secondTitle
        },
        getDocumentType(state) {
            if (!state.documentsType) {
                state.documentsType = sessionStorage.getItem('documentsType')
            }
            return state.documentsType
        },
        getgeneralMedicalType(state) {
            if (!state.generalMedicalType) {
                state.generalMedicalType = sessionStorage.getItem('generalMedicalType')
            }
            return state.generalMedicalType
        },
        getScroll(state) {
            state.isScroll = sessionStorage.getItem('isScroll')
            return state.isScroll
        },
        getHoliday(state) {
            if (!state.isHoliday) {
                state.isHoliday = sessionStorage.getItem('isHoliday')
                return state.isHoliday
            }
        },
        titleshow(state){
            return state.titleshow
        },
        titleclose(state){
            return state.titleclose
        }
    },
    mutations: {
        handleScroll(state, value) {
            state.scrollTop = value
        },
        setFirstTitle(state, data) {
            state.firstTitle = data
            sessionStorage.setItem('firstTitle', data);
        },
        setSecondTitle(state, data) {
            state.secondTitle = data
            sessionStorage.setItem('secondTitle', data);
        },
        setDocumentsType(state, data) {
            state.documentsType = data
            sessionStorage.setItem('documentsType', data);
        },
        setgeneralMedicalType(state, data) {
            state.generalMedicalType = data
            sessionStorage.setItem('generalMedicalType', data);
        },
        setScroll(state, data) {
            state.isScroll = data
            sessionStorage.setItem('isScroll', data);
        },
        setHoliday(state, data) {
            state.isHoliday = data
            sessionStorage.setItem('isHoliday', data);
        },
        titleshow(state,payload){
            state.titleshow=payload
        },
        titleclose(state,payload){
            state.titleclose = payload
        }

    },
    actions: {
        titleshow(context,payload){
            context.commit('titleshow',payload)
        },
        titleclose(context,payload){
            context.commit('titleclose',payload)
        }
    },
    modules: {
        // request1
    }
});
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export const store = new Vuex.Store({
    state: {
        todo: [
            {
                taskname: 'hello',
                completed: true,

            },
            {
                taskname: 'hello',
                completed: false,
            },
            {
                taskname: 'hello',
                completed: false,

            }
        ],
        globalindex: '1',
        lineNone: "text-decoration:none",
        lineThrough: "text-decoration:line-through",
    },
    mutations: {
        completeTodo(state, payload) {
            console.log(state.todo[payload].completed)
            state.globalindex = payload
            state.todo[payload].completed = !state.todo[payload].completed
            console.log(state.todo[payload].completed)
        },
        Save(state,payload){
            state[payload.index].taskname=payload.text
            state[payload.index].completed=false
        },
        pushNewTask(state, payload) {
            console.log(payload)
            state.todo.push({
                taskname: payload,
                completed: false,
            })
            console.log(payload)
        },
        DeleteInp(state, payload) {
            state.todo.splice(payload, 1)
        },
        ClearAll(state) {
            state.todo = []
        },
        EditBtn(state, payload) {
            console.log("IN str arg", payload.arg)
            console.log("IN str prop", payload.propInp)
            state.todo[payload.arg].taskname = payload.propInp
        }
    },
    getters: {
        todo(state) {
            return state.todo
        }
        ,
        getToDoLength(state) {
            return state.todo.length
        },
        getforcomplete(state) {
            console.log("Read compl", state.todo[state.globalindex].completed)
            if (state.todo[state.globalindex].completed) {
                return state.lineNone

            } else {
                return state.lineThrough

            }
        },
        getGlobalIndex(state) {
            console.log(state.globalindex)
            return state.globalindex
        }
    }
})

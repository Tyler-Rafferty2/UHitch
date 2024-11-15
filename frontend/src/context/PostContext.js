import { createContext, useReducer } from 'react'
export const PostsContext = createContext()

export const postsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_POSTS':
            return {
                posts: action.payload
            }
        case 'CREATE_POSTS':
            return {
                posts: [action.payload, ...state.posts]
            }
        case 'DELETE_POSTS':
            return {
                posts: state.posts.filter((p) => p._id !== action.payload._id)
            }
        default:
            return state
    }
}

export const PostContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(postsReducer, {
        posts: []
    })
    
    return (
        <PostsContext.Provider value={{state, dispatch}}>
            { children }
        </PostsContext.Provider>
    )
}
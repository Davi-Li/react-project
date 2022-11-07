/*
 * @Author: Flockmaster
 * @Date: 2022-11-05 23:44:09
 * @LastEditTime: 2022-11-07 09:40:25
 * @Language: JavaScript | TypeScript
 */

type Detail = {
    art_id: string;
    title: string;
    pubdate: string;
    aut_id: string;
    content: string;
    aut_name: string;
    aut_photo: string;
    is_followed: boolean;
    is_collected: boolean;
    attitude: number;
    comm_count: number;
    read_count: number;
    like_count: number;
}

export type ArticleAction = {
    type: 'article/saveDetail',
    payload: Detail
} | {
    type: 'article/saveComment'
    payload: CommentType
} | {
    type: 'article/saveMoreComment'
    payload: CommentType
} | {
    type: 'article/saveNewComment'
    payload: Comment
} | {
    type: 'article/updateComment'
    payload: Comment
}

export type Comment = {
    com_id: string;
    content: string;
    reply_count: number;
    pubdate: string;
    is_followed: boolean;
    is_liking: boolean;
    like_count: number;
    aut_id: string;
    aut_name: string;
    aut_photo: string;
}

export type CommentType = {
    end_id: string
    last_id: string
    total_count: number
    results: Comment[]
}

type InitType = {
    detail: Detail
    comment: CommentType
}

const initialValue: InitType = {
    detail: {},
    comment: {}
} as InitType

export default function reducer(state = initialValue, action: ArticleAction) {
    if (action.type == 'article/saveDetail') {
        return {
            ...state,
            detail: action.payload
        }
    }
    if (action.type == 'article/saveComment') {
        return {
            ...state,
            comment: action.payload
        }
    }
    if (action.type == 'article/saveMoreComment') {
        return {
            ...state,
            comment: {
                ...action.payload,
                results: [...state.comment.results, ...action.payload.results]
            }
        }
    }
    if (action.type == 'article/saveNewComment') {
        return {
            ...state,
            comment: {
                ...state.comment,
                results: [action.payload, ...state.comment.results]
            }
        }
    }
    if (action.type == 'article/updateComment') {
        return {
            ...state,
            comment: {
                ...state.comment,
                results: state.comment.results.map(item => {
                    if (item.com_id == action.payload.com_id) {
                        return { ...action.payload }
                    } else {
                        return item
                    }
                })
            }
        }
    }
    return state
}
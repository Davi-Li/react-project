/*
 * @Author: Flockmaster
 * @Date: 2022-11-05 23:44:09
 * @LastEditTime: 2022-11-05 23:53:48
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
}

type InitType = {
    detail: Detail
}

const initialValue: InitType = {
    detail: {}
} as InitType

export default function reducer(state = initialValue, action: ArticleAction) {
    if (action.type == 'article/saveDetail') {
        return {
            ...state,
            detail: action.payload
        }
    }
    return state
}
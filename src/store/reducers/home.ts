/*
 * @Author: webcc
 * @Date: 2022-10-31 19:33:43
 * @LastEditTime: 2022-11-04 16:31:00
 * @email: webcc.coder@qq.com
 */
export type Channel = {
    id: number
    name: string
}

export type MoreAction = {
    visible: boolean
    article_Id: string
    channelId: number
}

export type Article = {
    art_id: string
    title: string
    aut_id: string
    aut_name: string
    comm_count: string
    pubdate: string
    cover: {
        type: string
        images: string[]
    }
}

export type Articles = {
    [index: number]: {
        timestamp: string
        list: Article[]
    }
}

export type ArticlePayload = {
    channelId: number
    timestamp: string
    list: Article[]
    loadMore: boolean
}

export type HomeAction = {
    type: 'home/saveChannel'
    payload: Channel[]
} | {
    type: 'home/saveAllChannel'
    payload: Channel[]
} | {
    type: 'home/saveArticleInfo'
    payload: MoreAction
} | {
    type: 'home/saveArticle'
    payload: ArticlePayload
}

type HomeType = {
    userChannel: Channel[]
    allChannels: Channel[]
    moreAction: MoreAction
    article: Articles
}

let initialState: HomeType = {
    userChannel: [],
    allChannels: [],
    article: {},
    moreAction: {
        visible: false,
        article_Id: '',
        channelId: -1
    }
}

export default function home(state = initialState, action: HomeAction) {
    if (action.type == 'home/saveChannel') {
        return {
            ...state,
            userChannel: action.payload
        }
    }
    if (action.type == 'home/saveAllChannel') {
        return {
            ...state,
            allChannels: action.payload
        }
    }
    if (action.type == 'home/saveArticle') {
        const { list, timestamp, channelId, loadMore } = action.payload
        return {
            ...state,
            article: {
                ...state.article,
                [channelId]: {
                    timestamp: timestamp,
                    list: loadMore ? [...state.article[channelId].list, ...list] : list
                }
            }
        }
    }
    if (action.type == 'home/saveArticleInfo') {
        return {
            ...state,
            moreAction: action.payload
        }
    }
    return state;
}

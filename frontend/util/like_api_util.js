import { isEmpty } from "./general_api_util";

export const createLike = (like) => {
    debugger
    return $.ajax({
        method: "POST",
        url: "/api/likes",
        data: { like },
        // contentType: false,
        // processData: false,
    });
};

export const fetchLikes = () => {
    debugger
    return $.ajax({
        method: "GET",
        url: "/api/likes",
    });
};

export const likesOf = (likeableType, likeableId, likes) => {
    debugger
    if (isEmpty(likes)) return [];
    const likeIds = Object.keys(likes).reverse();
    let output = [];
    debugger
    likeIds.forEach((likeId) => {
        const id = parseInt(likeId);
        const like = likes[id];
        debugger
        if (like.likeableType === likeableType && like.likeableId === likeableId) {
            debugger
            output.push(likes[likeId]);
        }
    })
    debugger
    return output;
}

export const liked = (currentUser, likes) => {
    debugger
    return likes.some((like) => {
        return like.likerId === currentUser.id;
    })
}

export interface IYoutubeSearch {
    contents : IYoutubeVideo[],
    estimatedResults : string,
    next : string
}

export interface IYoutubeVideo {
    video : {
        channelId : string,
        channelName : string,
        description : string,
        lenghtText : string;
        publishedTimeText : string;
        thumbnails : IYoutubeThumbnail[];
        title : string;
        videoId : string ;
        viewCountText :string;

    }
}

export interface IYoutubeThumbnail {
    height : string;
    url : string;
    width : string
}
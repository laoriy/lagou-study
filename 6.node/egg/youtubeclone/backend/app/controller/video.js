const Controller = require('egg').Controller;

class VideoController extends Controller {
  async createVideo() {
    const body = this.ctx.request.body;
    const { Video } = this.app.model;
    this.ctx.validate(
      {
        title: { type: 'string' },
        description: { type: 'string' },
        vodVideoId: { type: 'string' },
        // cover: { type: 'string' }
      },
      body
    );

    // 默认视频封面
    body.cover = 'http://vod.lipengzhou.com/image/default/A806D6D6B0FD4D118F1C824748826104-6-2.png';

    body.user = this.ctx.user._id;
    const video = await new Video(body).save();
    this.ctx.status = 201;
    this.ctx.body = {
      video,
    };
  }
  async getVideo() {
    const { Video, VideoLike, Subscription } = this.app.model;
    const { videoId } = this.ctx.params;
    let video = await Video.findById(videoId).populate(
      'user',
      '_id username avatar subscribersCount'
    );

    if (!video) {
      this.ctx.throw(404, 'Video Not Found');
    }

    video = video.toJSON();

    video.isLiked = false; // 是否喜欢
    video.isDisliked = false; // 是否不喜欢
    video.user.isSubscribed = false; // 是否已订阅视频作者

    if (this.ctx.user) {
      const userId = this.ctx.user._id;
      if (await VideoLike.findOne({ user: userId, video: videoId, like: 1 })) {
        video.isLiked = true;
      }
      if (await VideoLike.findOne({ user: userId, video: videoId, like: -1 })) {
        video.isDisliked = true;
      }
      if (await Subscription.findOne({ user: userId, channel: video.user._id })) {
        video.user.isSubscribed = true;
      }
    }

    this.ctx.body = {
      video,
    };
  }
  async getVideos() {
    const { Video } = this.app.model;
    let { pageNum = 1, pageSize = 10 } = this.ctx.query;
    pageNum = Number.parseInt(pageNum);
    pageSize = Number.parseInt(pageSize);
    const getVideos = Video.find()
      .populate('user')
      .sort({
        createdAt: -1,
      })
      .skip((pageNum - 1) * pageSize)
      .limit(pageSize);
    const getVideosCount = Video.countDocuments();
    const [videos, videosCount] = await Promise.all([getVideos, getVideosCount]);
    this.ctx.body = {
      videos,
      videosCount,
    };
  }
  async getUserVideos() {
    const { Video } = this.app.model;
    let { pageNum = 1, pageSize = 10 } = this.ctx.query;
    const userId = this.ctx.params.userId;
    pageNum = Number.parseInt(pageNum);
    pageSize = Number.parseInt(pageSize);
    const getVideos = Video.find({
      user: userId,
    })
      .populate('user')
      .sort({
        createdAt: -1,
      })
      .skip((pageNum - 1) * pageSize)
      .limit(pageSize);
    const getVideosCount = Video.countDocuments({
      user: userId,
    });
    const [videos, videosCount] = await Promise.all([getVideos, getVideosCount]);
    this.ctx.body = {
      videos,
      videosCount,
    };
  }
}

module.exports = VideoController;

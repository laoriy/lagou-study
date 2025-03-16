# 前端性能

## 性能指标

### Rail 性能指标

https://web.developers.google.cn/articles/rail?hl=zh_cn

RAIL 表示 Web 应用生命周期的四个不同方面：响应、动画、空闲和加载。

### 基于用户体验的性能指标

https://web.dev/articles/user-centric-performance-metrics?hl=zh-cn

- INP 替代了[FID(First Input Delay)](https://web.dev/articles/fid?hl=zh_cn)
- [TTI(Time To Interactive)](https://web.dev/articles/tti?hl=zh-cn) 已从指标中移除

| 指标                            | 描述                                                                                                                                                                   |
| ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 首次内容渲染 (FCP)              | 衡量从网页开始加载到网页任何一部分内容呈现在屏幕上的时间                                                                                                               |
| Largest Contentful Paint (LCP)  | 衡量从网页开始加载到屏幕上渲染最大文本块或图片元素所用的时间                                                                                                           |
| Interaction to Next Paint (INP) | 衡量与网页进行的每一次点按、点击或键盘互动的延迟时间，并根据互动次数，选择网页最长的互动延迟时间（或接近最长的互动延迟时间）作为单个代表性值，以描述网页的总体响应速度 |
| Total Blocking Time (TBT)       | 衡量从 FCP 到 TTI 之间的总时长，在此期间，主线程处于屏蔽状态的时间够长，足以阻止输入响应                                                                               |
| 累积布局偏移 (CLS)              | 衡量网页开始加载到其生命周期状态更改为"隐藏"之间发生的所有意外布局偏移的累计得分                                                                                       |
| 首字节时间 (TTFB)               | 衡量网络响应用户请求并发送资源第一个字节所需的时间                                                                                                                     |

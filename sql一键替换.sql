-- 替换 comments 表的 content 字段
UPDATE comments 
SET content = REPLACE(content, 'https://m-api.song3060.top/', 'https://vip.666707.xyz:23080/')
WHERE content LIKE '%https://m-api.song3060.top/%';

-- 替换 post_images 表的 image_url 字段
UPDATE post_images 
SET image_url = REPLACE(image_url, 'https://m-api.song3060.top/', 'https://vip.666707.xyz:23080/')
WHERE image_url LIKE '%https://m-api.song3060.top/%';

-- 替换 post_videos 表的 video_url 字段
UPDATE post_videos 
SET video_url = REPLACE(video_url, 'https://m-api.song3060.top/', 'https://vip.666707.xyz:23080/')
WHERE video_url LIKE '%https://m-api.song3060.top/%';

-- 替换 post_videos 表的 cover_url 字段
UPDATE post_videos 
SET cover_url = REPLACE(cover_url, 'https://m-api.song3060.top/', 'https://vip.666707.xyz:23080/')
WHERE cover_url LIKE '%https://m-api.song3060.top/%';

-- 替换 users 表的 avatar 字段（假设是avatar字段，如果不是请修正字段名）
UPDATE users 
SET avatar = REPLACE(avatar, 'https://m-api.song3060.top/', 'https://vip.666707.xyz:23080/')
WHERE avatar LIKE '%https://m-api.song3060.top/%';



https://m-api.song3060.top/

https://vip.666707.xyz:23080/
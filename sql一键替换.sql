-- 替换 comments 表的 content 字段
UPDATE comments 
SET content = REPLACE(content, 'https://vip.666707.xyz:23080/', 'https://m-api.song3060.top/')
WHERE content LIKE '%https://vip.666707.xyz:23080/%';

-- 替换 post_images 表的 image_url 字段
UPDATE post_images 
SET image_url = REPLACE(image_url, 'https://vip.666707.xyz:23080/', 'https://m-api.song3060.top/')
WHERE image_url LIKE '%https://vip.666707.xyz:23080/%';

-- 替换 post_videos 表的 video_url 字段
UPDATE post_videos 
SET video_url = REPLACE(video_url, 'https://vip.666707.xyz:23080/', 'https://m-api.song3060.top/')
WHERE video_url LIKE '%https://vip.666707.xyz:23080/%';

-- 替换 post_videos 表的 cover_url 字段
UPDATE post_videos 
SET cover_url = REPLACE(cover_url, 'https://vip.666707.xyz:23080/', 'https://m-api.song3060.top/')
WHERE cover_url LIKE '%https://vip.666707.xyz:23080/%';

-- 替换 users 表的 avatar 字段（假设是avatar字段，如果不是请修正字段名）
UPDATE users 
SET avatar = REPLACE(avatar, 'https://vip.666707.xyz:23080/', 'https://m-api.song3060.top/')
WHERE avatar LIKE '%https://vip.666707.xyz:23080/%';
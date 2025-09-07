# 小石榴圖文社區 API 文檔

## 項目信息
- **項目名稱**: 小石榴圖文社區
- **版本**: v1.0.4
- **基礎 URL**: `http://localhost:3001`
- **資料庫**: xiaoshiliu (MySQL)
- **最後更新**: 2025-09-07

## 通用信息

### 回應格式
所有 API 端點都返回 JSON 格式，結構如下：

```json
{
  "code": 200,
  "message": "success",
  "data": {}
}
```

### 狀態碼
- `200`: 請求成功
- `400`: 請求參數錯誤
- `401`: 未授權，需要登入
- `403`: 禁止存取
- `404`: 資源不存在
- `500`: 伺服器內部錯誤

### 身份驗證
需要身份驗證的端點需要在請求標頭中包含 JWT 令牌：
```
Authorization: Bearer <your_jwt_token>
```

### 分頁參數
支援分頁的端點通用參數：
- `page`: 頁碼，預設為 1
- `limit`: 每頁項目數，預設為 20

---

## 身份驗證端點

### 1. 使用者註冊
**端點**: `POST /api/auth/register`

**請求參數**:
| 參數 | 類型 | 必需 | 描述 |
|------|------|------|------|
| user_id | string | 是 | 使用者 ID（唯一） |
| nickname | string | 是 | 暱稱 |
| password | string | 是 | 密碼（6-20 字元） |
| avatar | string | 否 | 頭像 URL |
| bio | string | 否 | 個人簡介 |
| location | string | 否 | 地理位置（如未提供，系統將根據 IP 自動偵測） |

**功能說明**:
- 系統透過第三方 API 自動獲取使用者地理位置信息
- 如使用者手動提供 location 參數，則優先使用
- 本地環境下，地理位置將顯示為「本地」
- 系統不儲存使用者 IP 位址，僅獲取地理位置用於顯示

**回應範例**:
```json
{
  "code": 200,
  "message": "註冊成功",
  "data": {
    "user": {
      "id": 1,
      "user_id": "user_001",
      "nickname": "小石榴",
      "avatar": "https://example.com/avatar.jpg",
      "bio": "這是個人簡介",
      "location": "北京"
    },
    "tokens": {
      "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "expires_in": 3600
    }
  }
}
```

### 2. 使用者登入
**端點**: `POST /api/auth/login`

**請求參數**:
| 參數 | 類型 | 必需 | 描述 |
|------|------|------|------|
| user_id | string | 是 | 小石榴 ID |
| password | string | 是 | 密碼 |

**回應範例**:
```json
{
  "code": 200,
  "message": "登入成功",
  "data": {
    "user": {
      "id": 1,
      "user_id": "xiaoshiliu123",
      "nickname": "小石榴使用者",
      "avatar": "http://example.com/avatar.jpg",
      "bio": "這是我的個人簡介",
      "location": "北京",
      "follow_count": 10,
      "fans_count": 20,
      "like_count": 100
    },
    "tokens": {
      "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "expires_in": 3600
    }
  }
}
```

### 3. 刷新令牌
**端點**: `POST /api/auth/refresh`

**請求參數**:
| 參數 | 類型 | 必需 | 描述 |
|------|------|------|------|
| refresh_token | string | 是 | 刷新令牌 |

**回應範例**:
```json
{
  "code": 200,
  "message": "令牌刷新成功",
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expires_in": 3600
  }
}
```

### 4. 登出
**端點**: `POST /api/auth/logout`
**需要身份驗證**: 是

**回應範例**:
```json
{
  "code": 200,
  "message": "登出成功"
}
```

### 5. 獲取當前使用者信息
**端點**: `GET /api/auth/me`
**需要身份驗證**: 是

**回應範例**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "id": 1,
    "user_id": "user_001",
    "nickname": "小石榴",
    "avatar": "https://example.com/avatar.jpg",
    "bio": "這是個人簡介",
    "location": "北京",
    "follow_count": 10,
    "fans_count": 20,
    "like_count": 100,
    "is_active": 1,
    "created_at": "2025-08-30T00:00:00.000Z"
  }
}
```

---

## 使用者端點

### 1. 獲取使用者列表
**端點**: `GET /api/users`

**請求參數**:
| 參數 | 類型 | 必需 | 描述 |
|------|------|------|------|
| page | int | 否 | 頁碼，預設 1 |
| limit | int | 否 | 每頁項目數，預設 20 |

**回應範例**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "users": [
      {
        "id": 1,
        "user_id": "user_001",
        "nickname": "小石榴",
        "avatar": "https://example.com/avatar.jpg",
        "bio": "這是個人簡介",
        "location": "北京",
        "follow_count": 10,
        "fans_count": 20,
        "like_count": 100,
        "created_at": "2025-08-30T00:00:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 100,
      "pages": 5
    }
  }
}
```

### 2. 獲取使用者詳情
**端點**: `GET /api/users/:id`

**路徑參數**:
| 參數 | 類型 | 必需 | 描述 |
|------|------|------|------|
| id | int | 是 | 使用者 ID |

**回應範例**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "id": 1,
    "user_id": "user_001",
    "nickname": "小石榴",
    "avatar": "https://example.com/avatar.jpg",
    "bio": "這是個人簡介",
    "location": "北京",
    "follow_count": 10,
    "fans_count": 20,
    "like_count": 100,
    "created_at": "2025-08-30T00:00:00.000Z"
  }
}
```

### 3. 獲取使用者收藏
**端點**: `GET /api/users/:id/collections`

**路徑參數**:
| 參數 | 類型 | 必需 | 描述 |
|------|------|------|------|
| id | int | 是 | 使用者 ID |

**請求參數**:
| 參數 | 類型 | 必需 | 描述 |
|------|------|------|------|
| page | int | 否 | 頁碼，預設 1 |
| limit | int | 否 | 每頁項目數，預設 20 |

### 4. 關注使用者
**端點**: `POST /api/users/:id/follow`
**需要身份驗證**: 是

**路徑參數**:
| 參數 | 類型 | 必需 | 描述 |
|------|------|------|------|
| id | int | 是 | 要關注的使用者 ID |

**回應範例**:
```json
{
  "code": 200,
  "message": "關注成功"
}
```

### 5. 取消關注使用者
**端點**: `DELETE /api/users/:id/follow`
**需要身份驗證**: 是

**路徑參數**:
| 參數 | 類型 | 必需 | 描述 |
|------|------|------|------|
| id | int | 是 | 要取消關注的使用者 ID |

**回應範例**:
```json
{
  "code": 200,
  "message": "取消關注成功"
}
```

### 6. 獲取關注列表
**端點**: `GET /api/users/:id/following`

**路徑參數**:
| 參數 | 類型 | 必需 | 描述 |
|------|------|------|------|
| id | int | 是 | 使用者 ID |

**請求參數**:
| 參數 | 類型 | 必需 | 描述 |
|------|------|------|------|
| page | int | 否 | 頁碼，預設 1 |
| limit | int | 否 | 每頁項目數，預設 20 |

**回應範例**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "following": [
      {
        "id": 2,
        "user_id": "user_002",
        "nickname": "使用者 2",
        "avatar": "https://example.com/avatar2.jpg",
        "bio": "個人簡介",
        "follow_count": 5,
        "fans_count": 10,
        "followed_at": "2025-08-30T00:00:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 10,
      "pages": 1
    }
  }
}
```

### 7. 獲取粉絲列表
**端點**: `GET /api/users/:id/followers`

**路徑參數**:
| 參數 | 類型 | 必需 | 描述 |
|------|------|------|------|
| id | int | 是 | 使用者 ID |

**請求參數**:
| 參數 | 類型 | 必需 | 描述 |
|------|------|------|------|
| page | int | 否 | 頁碼，預設 1 |
| limit | int | 否 | 每頁項目數，預設 20 |

**回應範例**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "followers": [
      {
        "id": 3,
        "user_id": "user_003",
        "nickname": "使用者 3",
        "avatar": "https://example.com/avatar3.jpg",
        "bio": "個人簡介",
        "follow_count": 8,
        "fans_count": 15,
        "followed_at": "2025-08-30T00:00:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 20,
      "pages": 1
    }
  }
}
```

### 8. 搜尋使用者
**端點**: `GET /api/users/search`

**請求參數**:
| 參數 | 類型 | 必需 | 描述 |
|------|------|------|------|
| keyword | string | 是 | 搜尋關鍵字（支援暱稱和小石榴 ID 搜尋） |
| page | int | 否 | 頁碼，預設 1 |
| limit | int | 否 | 每頁項目數，預設 20 |

**回應範例**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "users": [
      {
        "id": 1,
        "user_id": "user_001",
        "nickname": "小石榴",
        "avatar": "https://example.com/avatar.jpg",
        "bio": "這是個人簡介",
        "location": "北京",
        "follow_count": 10,
        "fans_count": 20,
        "like_count": 100,
        "post_count": 5,
        "isFollowing": false,
        "isMutual": false,
        "buttonType": "follow",
        "created_at": "2025-08-30T00:00:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 1,
      "pages": 1
    }
  }
}
```

### 9. 獲取使用者個性標籤
**端點**: `GET /api/users/:id/personality-tags`

**路徑參數**:
| 參數 | 類型 | 必需 | 描述 |
|------|------|------|------|
| id | int | 是 | 使用者 ID |

**回應範例**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "tags": [
      {
        "id": 1,
        "name": "攝影愛好者",
        "color": "#FF6B6B"
      },
      {
        "id": 2,
        "name": "旅行達人",
        "color": "#4ECDC4"
      }
    ]
  }
}
```

### 10. 獲取使用者貼文
**端點**: `GET /api/users/:id/posts`

**路徑參數**:
| 參數 | 類型 | 必需 | 描述 |
|------|------|------|------|
| id | int | 是 | 使用者 ID |

**請求參數**:
| 參數 | 類型 | 必需 | 描述 |
|------|------|------|------|
| page | int | 否 | 頁碼，預設 1 |
| limit | int | 否 | 每頁項目數，預設 20 |

**回應範例**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "posts": [
      {
        "id": 1,
        "title": "美麗風景",
        "content": "今天拍到了美麗的風景",
        "images": ["https://example.com/image1.jpg"],
        "category": "攝影",
        "tags": ["風景", "攝影"],
        "like_count": 10,
        "comment_count": 5,
        "collection_count": 3,
        "view_count": 100,
        "isLiked": false,
        "isCollected": false,
        "created_at": "2025-08-30T00:00:00.000Z",
        "user": {
          "id": 1,
          "user_id": "user_001",
          "nickname": "小石榴",
          "avatar": "https://example.com/avatar.jpg"
        }
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 5,
      "pages": 1
    }
  }
}
```

### 11. 獲取使用者按讚的貼文
**端點**: `GET /api/users/:id/likes`

**路徑參數**:
| 參數 | 類型 | 必需 | 描述 |
|------|------|------|------|
| id | int | 是 | 使用者 ID |

**請求參數**:
| 參數 | 類型 | 必需 | 描述 |
|------|------|------|------|
| page | int | 否 | 頁碼，預設 1 |
| limit | int | 否 | 每頁項目數，預設 20 |

**回應範例**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "posts": [
      {
        "id": 2,
        "title": "美好時光",
        "content": "記錄生活中的美好時光",
        "images": ["https://example.com/image2.jpg"],
        "category": "生活",
        "tags": ["生活", "記錄"],
        "like_count": 15,
        "comment_count": 8,
        "collection_count": 5,
        "view_count": 150,
        "isLiked": true,
        "isCollected": false,
        "liked_at": "2025-01-02T00:00:00.000Z",
        "created_at": "2025-08-30T00:00:00.000Z",
        "user": {
          "id": 2,
          "user_id": "user_002",
          "nickname": "使用者 2",
          "avatar": "https://example.com/avatar2.jpg"
        }
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 3,
      "pages": 1
    }
  }
}
```

### 12. 獲取關注狀態
**端點**: `GET /api/users/:id/follow-status`
**需要身份驗證**: 是

**路徑參數**:
| 參數 | 類型 | 必需 | 描述 |
|------|------|------|------|
| id | int | 是 | 目標使用者 ID |

**回應範例**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "isFollowing": true,
    "isMutual": false,
    "buttonType": "unfollow"
  }
}
```

### 13. 獲取互相關注列表
**端點**: `GET /api/users/:id/mutual-follows`

**路徑參數**:
| 參數 | 類型 | 必需 | 描述 |
|------|------|------|------|
| id | int | 是 | 使用者 ID |

**請求參數**:
| 參數 | 類型 | 必需 | 描述 |
|------|------|------|------|
| page | int | 否 | 頁碼，預設 1 |
| limit | int | 否 | 每頁項目數，預設 20 |

**回應範例**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "mutualFollows": [
      {
        "id": 3,
        "user_id": "user_003",
        "nickname": "使用者 3",
        "avatar": "https://example.com/avatar3.jpg",
        "bio": "個人簡介",
        "follow_count": 8,
        "fans_count": 15,
        "followed_at": "2025-08-30T00:00:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 5,
      "pages": 1
    }
  }
}
```

### 14. 獲取使用者統計
**端點**: `GET /api/users/:id/stats`

**路徑參數**:
| 參數 | 類型 | 必需 | 描述 |
|------|------|------|------|
| id | int | 是 | 使用者 ID |

**回應範例**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "posts_count": 25,
    "likes_count": 150,
    "collections_count": 80,
    "comments_count": 45,
    "followers_count": 120,
    "following_count": 85,
    "views_count": 2500
  }
}
```

### 15. 更新使用者信息
**端點**: `PUT /api/users/:id`
**需要身份驗證**: 是

**路徑參數**:
| 參數 | 類型 | 必需 | 描述 |
|------|------|------|------|
| id | int | 是 | 使用者 ID |

**請求參數**:
| 參數 | 類型 | 必需 | 描述 |
|------|------|------|------|
| nickname | string | 否 | 暱稱 |
| avatar | string | 否 | 頭像 URL |
| bio | string | 否 | 個人簡介 |
| location | string | 否 | 地理位置 |

**回應範例**:
```json
{
  "code": 200,
  "message": "使用者信息更新成功",
  "data": {
    "id": 1,
    "user_id": "user_001",
    "nickname": "新暱稱",
    "avatar": "https://example.com/new_avatar.jpg",
    "bio": "新的個人簡介",
    "location": "上海",
    "updated_at": "2025-01-02T00:00:00.000Z"
  }
}
```

---

## 貼文端點

### 1. 獲取貼文列表
**端點**: `GET /api/posts`

**請求參數**:
| 參數 | 類型 | 必需 | 描述 |
|------|------|------|------|
| page | int | 否 | 頁碼，預設 1 |
| limit | int | 否 | 每頁項目數，預設 20 |
| category | string | 否 | 分類篩選 |

**回應範例**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "posts": [
      {
        "id": 1,
        "user_id": 1,
        "title": "貼文標題",
        "content": "貼文內容",
        "category": "生活",
        "view_count": 100,
        "like_count": 10,
        "comment_count": 5,
        "collect_count": 3,
        "created_at": "2025-08-30T00:00:00.000Z",
        "nickname": "小石榴",
        "user_avatar": "https://example.com/avatar.jpg",
        "images": [
          "https://example.com/image1.jpg",
          "https://example.com/image2.jpg"
        ],
        "tags": [
          {
            "id": 1,
            "name": "標籤名稱"
          }
        ]
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 100,
      "pages": 5
    }
  }
}
```

### 2. 獲取貼文詳情
**端點**: `GET /api/posts/:id`

**路徑參數**:
| 參數 | 類型 | 必需 | 描述 |
|------|------|------|------|
| id | int | 是 | 貼文 ID |

**注意**: 存取貼文詳情會自動增加瀏覽次數

### 3. 建立貼文
**端點**: `POST /api/posts`
**需要身份驗證**: 是

**請求參數**:
| 參數 | 類型 | 必需 | 描述 |
|------|------|------|------|
| title | string | 是 | 貼文標題 |
| content | string | 是 | 貼文內容 |
| category | string | 否 | 分類 |
| images | array | 否 | 圖片 URL 陣列 |
| tags | array | 否 | 標籤 ID 陣列 |

**請求範例**:
```json
{
  "title": "分享美好的下午時光",
  "content": "今天天氣很好，在公園裡散步...",
  "category": "生活",
  "images": [
    "https://example.com/image1.jpg",
    "https://example.com/image2.jpg"
  ],
  "tags": [1, 2, 3]
}
```

### 4. 獲取貼文留言
**端點**: `GET /api/posts/:id/comments`

**路徑參數**:
| 參數 | 類型 | 必需 | 描述 |
|------|------|------|------|
| id | int | 是 | 貼文 ID |

**請求參數**:
| 參數 | 類型 | 必需 | 描述 |
|------|------|------|------|
| page | int | 否 | 頁碼，預設 1 |
| limit | int | 否 | 每頁項目數，預設 20 |

### 5. 收藏貼文
**端點**: `POST /api/posts/:id/collect`
**需要身份驗證**: 是

**路徑參數**:
| 參數 | 類型 | 必需 | 描述 |
|------|------|------|------|
| id | int | 是 | 貼文 ID |

**回應範例**:
```json
{
  "code": 200,
  "message": "收藏成功"
}
```

### 6. 搜尋貼文
**端點**: `GET /api/posts/search`

**請求參數**:
| 參數 | 類型 | 必需 | 描述 |
|------|------|------|------|
| keyword | string | 是 | 搜尋關鍵字（支援標題和內容搜尋） |
| page | int | 否 | 頁碼，預設 1 |
| limit | int | 否 | 每頁項目數，預設 20 |
| category | string | 否 | 分類篩選 |

**回應範例**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "posts": [
      {
        "id": 1,
        "title": "美麗風景",
        "content": "今天拍到了美麗的風景",
        "images": ["https://example.com/image1.jpg"],
        "category": "攝影",
        "tags": ["風景", "攝影"],
        "like_count": 10,
        "comment_count": 5,
        "collection_count": 3,
        "view_count": 100,
        "isLiked": false,
        "isCollected": false,
        "created_at": "2025-08-30T00:00:00.000Z",
        "user": {
          "id": 1,
          "user_id": "user_001",
          "nickname": "小石榴",
          "avatar": "https://example.com/avatar.jpg"
        }
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 1,
      "pages": 1
    }
  }
}
```

### 7. 更新貼文
**端點**: `PUT /api/posts/:id`
**需要身份驗證**: 是

**路徑參數**:
| 參數 | 類型 | 必需 | 描述 |
|------|------|------|------|
| id | int | 是 | 貼文 ID |

**請求參數**:
| 參數 | 類型 | 必需 | 描述 |
|------|------|------|------|
| title | string | 否 | 貼文標題 |
| content | string | 否 | 貼文內容 |
| category | string | 否 | 分類 |
| images | array | 否 | 圖片 URL 陣列 |
| tags | array | 否 | 標籤 ID 陣列 |

**請求範例**:
```json
{
  "title": "更新後的標題",
  "content": "更新後的內容",
  "category": "生活",
  "images": [
    "https://example.com/new_image1.jpg"
  ],
  "tags": [1, 3, 5]
}
```

**回應範例**:
```json
{
  "code": 200,
  "message": "貼文更新成功",
  "data": {
    "id": 1,
    "title": "更新後的標題",
    "content": "更新後的內容",
    "category": "生活",
    "updated_at": "2025-01-02T00:00:00.000Z"
  }
}
```

### 8. 刪除貼文
**端點**: `DELETE /api/posts/:id`
**需要身份驗證**: 是

**路徑參數**:
| 參數 | 類型 | 必需 | 描述 |
|------|------|------|------|
| id | int | 是 | 貼文 ID |

**回應範例**:
```json
{
  "code": 200,
  "message": "貼文刪除成功"
}
```

### 9. 取消收藏貼文
**端點**: `DELETE /api/posts/:id/collect`
**需要身份驗證**: 是

**路徑參數**:
| 參數 | 類型 | 必需 | 描述 |
|------|------|------|------|
| id | int | 是 | 貼文 ID |

**回應範例**:
```json
{
  "code": 200,
  "message": "取消收藏成功"
}
```

### 10. 獲取草稿列表
**端點**: `GET /api/posts/drafts`
**需要身份驗證**: 是

**請求參數**:
| 參數 | 類型 | 必需 | 描述 |
|------|------|------|------|
| page | int | 否 | 頁碼，預設 1 |
| limit | int | 否 | 每頁項目數，預設 20 |
| keyword | string | 否 | 搜尋關鍵字 |

**回應範例**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "drafts": [
      {
        "id": 1,
        "title": "草稿標題",
        "content": "草稿內容",
        "category": "生活",
        "images": ["image1.jpg", "image2.jpg"],
        "tags": ["標籤1", "標籤2"],
        "created_at": "2025-01-16T00:00:00.000Z",
        "updated_at": "2025-01-16T00:00:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 5,
      "pages": 1
    }
  }
}
```

### 11. 儲存草稿
**端點**: `POST /api/posts/drafts`
**需要身份驗證**: 是

**請求參數**:
| 參數 | 類型 | 必需 | 描述 |
|------|------|------|------|
| title | string | 否 | 草稿標題 |
| content | string | 否 | 草稿內容 |
| category | string | 否 | 分類 |
| images | array | 否 | 圖片 URL 陣列 |
| tags | array | 否 | 標籤陣列 |

**回應範例**:
```json
{
  "code": 200,
  "message": "草稿儲存成功",
  "data": {
    "id": 1,
    "title": "草稿標題",
    "content": "草稿內容",
    "created_at": "2025-01-16T00:00:00.000Z"
  }
}
```

### 12. 更新草稿
**端點**: `PUT /api/posts/drafts/:id`
**需要身份驗證**: 是

**路徑參數**:
| 參數 | 類型 | 必需 | 描述 |
|------|------|------|------|
| id | int | 是 | 草稿 ID |

**請求參數**:
| 參數 | 類型 | 必需 | 描述 |
|------|------|------|------|
| title | string | 否 | 草稿標題 |
| content | string | 否 | 草稿內容 |
| category | string | 否 | 分類 |
| images | array | 否 | 圖片 URL 陣列 |
| tags | array | 否 | 標籤陣列 |

**回應範例**:
```json
{
  "code": 200,
  "message": "草稿更新成功",
  "data": {
    "id": 1,
    "title": "更新後的草稿標題",
    "content": "更新後的草稿內容",
    "updated_at": "2025-01-16T00:00:00.000Z"
  }
}
```

### 13. 刪除草稿
**端點**: `DELETE /api/posts/drafts/:id`
**需要身份驗證**: 是

**路徑參數**:
| 參數 | 類型 | 必需 | 描述 |
|------|------|------|------|
| id | int | 是 | 草稿 ID |

**回應範例**:
```json
{
  "code": 200,
  "message": "草稿刪除成功"
}
```

### 14. 發佈草稿
**端點**: `POST /api/posts/drafts/:id/publish`
**需要身份驗證**: 是

**路徑參數**:
| 參數 | 類型 | 必需 | 描述 |
|------|------|------|------|
| id | int | 是 | 草稿 ID |

**回應範例**:
```json
{
  "code": 200,
  "message": "草稿發佈成功",
  "data": {
    "id": 1,
    "title": "已發佈的貼文標題",
    "content": "已發佈的貼文內容",
    "is_draft": 0,
    "created_at": "2025-01-16T00:00:00.000Z"
  }
}
```

---

## 按讚端點

### 1. 按讚貼文
**端點**: `POST /api/likes`
**需要身份驗證**: 是

**請求參數**:
| 參數 | 類型 | 必需 | 描述 |
|------|------|------|------|
| target_type | int | 是 | 目標類型（1-貼文，2-留言） |
| target_id | int | 是 | 目標 ID |

**回應範例**:
```json
{
  "code": 200,
  "message": "按讚成功"
}
```

### 2. 取消按讚
**端點**: `DELETE /api/likes`
**需要身份驗證**: 是

**請求參數**:
| 參數 | 類型 | 必需 | 描述 |
|------|------|------|------|
| target_type | int | 是 | 目標類型（1-貼文，2-留言） |
| target_id | int | 是 | 目標 ID |

**回應範例**:
```json
{
  "code": 200,
  "message": "取消按讚成功"
}
```

---

## 留言端點

### 1. 建立留言
**端點**: `POST /api/comments`
**需要身份驗證**: 是

**請求參數**:
| 參數 | 類型 | 必需 | 描述 |
|------|------|------|------|
| post_id | int | 是 | 貼文 ID |
| content | string | 是 | 留言內容 |
| parent_id | int | 否 | 父留言 ID（用於回覆） |

**回應範例**:
```json
{
  "code": 200,
  "message": "留言建立成功",
  "data": {
    "id": 1,
    "post_id": 1,
    "user_id": 1,
    "content": "這是一則留言",
    "parent_id": null,
    "like_count": 0,
    "created_at": "2025-01-16T00:00:00.000Z",
    "user": {
      "id": 1,
      "nickname": "小石榴",
      "avatar": "https://example.com/avatar.jpg"
    }
  }
}
```

### 2. 獲取留言
**端點**: `GET /api/comments`

**請求參數**:
| 參數 | 類型 | 必需 | 描述 |
|------|------|------|------|
| post_id | int | 是 | 貼文 ID |
| page | int | 否 | 頁碼，預設 1 |
| limit | int | 否 | 每頁項目數，預設 20 |

**回應範例**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "comments": [
      {
        "id": 1,
        "post_id": 1,
        "user_id": 1,
        "content": "這是一則留言",
        "parent_id": null,
        "like_count": 5,
        "isLiked": false,
        "created_at": "2025-01-16T00:00:00.000Z",
        "user": {
          "id": 1,
          "nickname": "小石榴",
          "avatar": "https://example.com/avatar.jpg"
        },
        "replies": [
          {
            "id": 2,
            "post_id": 1,
            "user_id": 2,
            "content": "這是一則回覆",
            "parent_id": 1,
            "like_count": 2,
            "isLiked": false,
            "created_at": "2025-01-16T00:00:00.000Z",
            "user": {
              "id": 2,
              "nickname": "使用者 2",
              "avatar": "https://example.com/avatar2.jpg"
            }
          }
        ]
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 10,
      "pages": 1
    }
  }
}
```

### 3. 刪除留言
**端點**: `DELETE /api/comments/:id`
**需要身份驗證**: 是

**路徑參數**:
| 參數 | 類型 | 必需 | 描述 |
|------|------|------|------|
| id | int | 是 | 留言 ID |

**回應範例**:
```json
{
  "code": 200,
  "message": "留言刪除成功"
}
```

---

## 標籤端點

### 1. 獲取標籤列表
**端點**: `GET /api/tags`

**請求參數**:
| 參數 | 類型 | 必需 | 描述 |
|------|------|------|------|
| page | int | 否 | 頁碼，預設 1 |
| limit | int | 否 | 每頁項目數，預設 20 |
| keyword | string | 否 | 搜尋關鍵字 |

**回應範例**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "tags": [
      {
        "id": 1,
        "name": "攝影",
        "use_count": 100,
        "created_at": "2025-01-16T00:00:00.000Z"
      },
      {
        "id": 2,
        "name": "旅行",
        "use_count": 80,
        "created_at": "2025-01-16T00:00:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 50,
      "pages": 3
    }
  }
}
```

### 2. 獲取熱門標籤
**端點**: `GET /api/tags/popular`

**請求參數**:
| 參數 | 類型 | 必需 | 描述 |
|------|------|------|------|
| limit | int | 否 | 標籤數量，預設 10 |

**回應範例**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "tags": [
      {
        "id": 1,
        "name": "攝影",
        "use_count": 100
      },
      {
        "id": 2,
        "name": "旅行",
        "use_count": 80
      }
    ]
  }
}
```

### 3. 搜尋標籤
**端點**: `GET /api/tags/search`

**請求參數**:
| 參數 | 類型 | 必需 | 描述 |
|------|------|------|------|
| keyword | string | 是 | 搜尋關鍵字 |
| limit | int | 否 | 結果數量，預設 10 |

**回應範例**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "tags": [
      {
        "id": 1,
        "name": "攝影",
        "use_count": 100
      }
    ]
  }
}
```

---

## 搜尋端點

### 1. 全域搜尋
**端點**: `GET /api/search`

**請求參數**:
| 參數 | 類型 | 必需 | 描述 |
|------|------|------|------|
| keyword | string | 是 | 搜尋關鍵字 |
| type | string | 否 | 搜尋類型（posts, users, tags, all），預設 all |
| page | int | 否 | 頁碼，預設 1 |
| limit | int | 否 | 每頁項目數，預設 20 |

**回應範例**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "posts": {
      "items": [
        {
          "id": 1,
          "title": "美麗風景",
          "content": "今天拍到了美麗的風景",
          "images": ["https://example.com/image1.jpg"],
          "like_count": 10,
          "comment_count": 5,
          "created_at": "2025-08-30T00:00:00.000Z",
          "user": {
            "id": 1,
            "nickname": "小石榴",
            "avatar": "https://example.com/avatar.jpg"
          }
        }
      ],
      "total": 5
    },
    "users": {
      "items": [
        {
          "id": 1,
          "user_id": "user_001",
          "nickname": "小石榴",
          "avatar": "https://example.com/avatar.jpg",
          "bio": "這是個人簡介",
          "follow_count": 10,
          "fans_count": 20
        }
      ],
      "total": 2
    },
    "tags": {
      "items": [
        {
          "id": 1,
          "name": "攝影",
          "use_count": 100
        }
      ],
      "total": 3
    }
  }
}
```

---

## 通知端點

### 1. 獲取通知
**端點**: `GET /api/notifications`
**需要身份驗證**: 是

**請求參數**:
| 參數 | 類型 | 必需 | 描述 |
|------|------|------|------|
| page | int | 否 | 頁碼，預設 1 |
| limit | int | 否 | 每頁項目數，預設 20 |
| type | int | 否 | 通知類型篩選（1-按讚，2-留言，3-關注） |
| is_read | int | 否 | 已讀狀態篩選（0-未讀，1-已讀） |

**回應範例**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "notifications": [
      {
        "id": 1,
        "user_id": 1,
        "sender_id": 2,
        "type": 1,
        "title": "使用者 2 按讚了您的貼文",
        "target_id": 1,
        "comment_id": null,
        "is_read": 0,
        "created_at": "2025-01-16T00:00:00.000Z",
        "sender": {
          "id": 2,
          "nickname": "使用者 2",
          "avatar": "https://example.com/avatar2.jpg"
        }
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 15,
      "pages": 1
    },
    "unread_count": 5
  }
}
```

### 2. 標記通知為已讀
**端點**: `PUT /api/notifications/:id/read`
**需要身份驗證**: 是

**路徑參數**:
| 參數 | 類型 | 必需 | 描述 |
|------|------|------|------|
| id | int | 是 | 通知 ID |

**回應範例**:
```json
{
  "code": 200,
  "message": "通知已標記為已讀"
}
```

### 3. 標記所有通知為已讀
**端點**: `PUT /api/notifications/read-all`
**需要身份驗證**: 是

**回應範例**:
```json
{
  "code": 200,
  "message": "所有通知已標記為已讀"
}
```

### 4. 獲取未讀數量
**端點**: `GET /api/notifications/unread-count`
**需要身份驗證**: 是

**回應範例**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "unread_count": 5
  }
}
```

---

## 上傳端點

### 1. 上傳圖片
**端點**: `POST /api/upload/image`
**需要身份驗證**: 是
**Content-Type**: `multipart/form-data`

**請求參數**:
| 參數 | 類型 | 必需 | 描述 |
|------|------|------|------|
| image | file | 是 | 圖片文件（支援 jpg, jpeg, png, gif, webp） |
| type | string | 否 | 上傳類型（avatar, post），預設 post |

**回應範例**:
```json
{
  "code": 200,
  "message": "上傳成功",
  "data": {
    "url": "https://example.com/uploads/image_123456.jpg",
    "filename": "image_123456.jpg",
    "size": 1024000,
    "type": "image/jpeg"
  }
}
```

### 2. 上傳多張圖片
**端點**: `POST /api/upload/images`
**需要身份驗證**: 是
**Content-Type**: `multipart/form-data`

**請求參數**:
| 參數 | 類型 | 必需 | 描述 |
|------|------|------|------|
| images | file[] | 是 | 圖片文件（最多 9 個文件） |
| type | string | 否 | 上傳類型（post），預設 post |

**回應範例**:
```json
{
  "code": 200,
  "message": "上傳成功",
  "data": {
    "urls": [
      "https://example.com/uploads/image_123456.jpg",
      "https://example.com/uploads/image_123457.jpg"
    ],
    "files": [
      {
        "url": "https://example.com/uploads/image_123456.jpg",
        "filename": "image_123456.jpg",
        "size": 1024000,
        "type": "image/jpeg"
      },
      {
        "url": "https://example.com/uploads/image_123457.jpg",
        "filename": "image_123457.jpg",
        "size": 2048000,
        "type": "image/png"
      }
    ]
  }
}
```

---

## 統計端點

### 1. 獲取平台統計
**端點**: `GET /api/stats/platform`

**回應範例**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "total_users": 1000,
    "total_posts": 5000,
    "total_comments": 15000,
    "total_likes": 25000,
    "active_users_today": 150,
    "new_posts_today": 50,
    "new_users_today": 10
  }
}
```

### 2. 獲取使用者統計
**端點**: `GET /api/stats/user/:id`

**路徑參數**:
| 參數 | 類型 | 必需 | 描述 |
|------|------|------|------|
| id | int | 是 | 使用者 ID |

**回應範例**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "posts_count": 25,
    "likes_received": 150,
    "comments_received": 80,
    "collections_received": 45,
    "followers_count": 120,
    "following_count": 85,
    "total_views": 2500,
    "posts_this_month": 5,
    "likes_this_month": 20
  }
}
```

---

## 管理員端點

### 1. 管理員登入
**端點**: `POST /api/admin/login`

**請求參數**:
| 參數 | 類型 | 必需 | 描述 |
|------|------|------|------|
| username | string | 是 | 管理員使用者名稱 |
| password | string | 是 | 管理員密碼 |

**回應範例**:
```json
{
  "code": 200,
  "message": "登入成功",
  "data": {
    "admin": {
      "id": 1,
      "username": "admin"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expires_in": 3600
  }
}
```

### 2. 獲取儀表板資料
**端點**: `GET /api/admin/dashboard`
**需要身份驗證**: 是（管理員）

**回應範例**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "overview": {
      "total_users": 1000,
      "total_posts": 5000,
      "total_comments": 15000,
      "total_likes": 25000
    },
    "recent_activity": {
      "new_users_today": 10,
      "new_posts_today": 50,
      "new_comments_today": 200,
      "active_users_today": 150
    },
    "charts": {
      "user_growth": [
        {"date": "2025-01-01", "count": 900},
        {"date": "2025-01-02", "count": 920},
        {"date": "2025-01-03", "count": 950}
      ],
      "post_activity": [
        {"date": "2025-01-01", "count": 45},
        {"date": "2025-01-02", "count": 52},
        {"date": "2025-01-03", "count": 48}
      ]
    }
  }
}
```

### 3. 管理使用者
**端點**: `GET /api/admin/users`
**需要身份驗證**: 是（管理員）

**請求參數**:
| 參數 | 類型 | 必需 | 描述 |
|------|------|------|------|
| page | int | 否 | 頁碼，預設 1 |
| limit | int | 否 | 每頁項目數，預設 20 |
| keyword | string | 否 | 搜尋關鍵字 |
| status | string | 否 | 使用者狀態篩選（active, inactive） |

**回應範例**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "users": [
      {
        "id": 1,
        "user_id": "user_001",
        "nickname": "小石榴",
        "avatar": "https://example.com/avatar.jpg",
        "bio": "這是個人簡介",
        "location": "北京",
        "follow_count": 10,
        "fans_count": 20,
        "like_count": 100,
        "post_count": 25,
        "is_active": 1,
        "created_at": "2025-08-30T00:00:00.000Z",
        "last_login_at": "2025-01-16T00:00:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 1000,
      "pages": 50
    }
  }
}
```

### 4. 管理貼文
**端點**: `GET /api/admin/posts`
**需要身份驗證**: 是（管理員）

**請求參數**:
| 參數 | 類型 | 必需 | 描述 |
|------|------|------|------|
| page | int | 否 | 頁碼，預設 1 |
| limit | int | 否 | 每頁項目數，預設 20 |
| keyword | string | 否 | 搜尋關鍵字 |
| category | string | 否 | 分類篩選 |
| status | string | 否 | 狀態篩選（published, draft） |

**回應範例**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "posts": [
      {
        "id": 1,
        "title": "貼文標題",
        "content": "貼文內容預覽...",
        "category": "生活",
        "is_draft": 0,
        "view_count": 100,
        "like_count": 10,
        "comment_count": 5,
        "collect_count": 3,
        "created_at": "2025-08-30T00:00:00.000Z",
        "user": {
          "id": 1,
          "nickname": "小石榴",
          "avatar": "https://example.com/avatar.jpg"
        }
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 5000,
      "pages": 250
    }
  }
}
```

---

## 錯誤處理

### 常見錯誤回應

#### 400 錯誤請求
```json
{
  "code": 400,
  "message": "請求參數無效",
  "errors": {
    "email": ["電子郵件格式無效"],
    "password": ["密碼至少需要 6 個字元"]
  }
}
```

#### 401 未授權
```json
{
  "code": 401,
  "message": "未授權存取，請登入"
}
```

#### 403 禁止存取
```json
{
  "code": 403,
  "message": "存取被拒絕，權限不足"
}
```

#### 404 找不到資源
```json
{
  "code": 404,
  "message": "找不到資源"
}
```

#### 422 驗證錯誤
```json
{
  "code": 422,
  "message": "驗證失敗",
  "errors": {
    "title": ["標題為必填項目"],
    "content": ["內容不能為空"]
  }
}
```

#### 500 伺服器內部錯誤
```json
{
  "code": 500,
  "message": "伺服器內部錯誤"
}
```

---

## 速率限制

API 實施速率限制以防止濫用：

- **一般端點**: 每個 IP 每分鐘 100 次請求
- **身份驗證端點**: 每個 IP 每分鐘 10 次請求
- **上傳端點**: 每個已驗證使用者每分鐘 20 次請求

當超過速率限制時，API 返回：

```json
{
  "code": 429,
  "message": "請求過於頻繁，請稍後再試",
  "retry_after": 60
}
```

---

## 資料驗證規則

### 使用者註冊
- **user_id**: 3-20 字元，僅限字母數字和底線
- **nickname**: 1-50 字元
- **password**: 6-20 字元
- **bio**: 最多 500 字元
- **location**: 最多 100 字元

### 貼文建立
- **title**: 1-200 字元
- **content**: 1-10000 字元
- **category**: 必須是預定義分類之一
- **images**: 最多 9 張圖片，每張小於 10MB
- **tags**: 每個貼文最多 10 個標籤

### 留言建立
- **content**: 1-1000 字元

---

## 分頁

所有列表端點都支援分頁，參數如下：

- `page`: 頁碼（從 1 開始）
- `limit`: 每頁項目數（預設：20，最大：100）

分頁回應格式：
```json
{
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "pages": 5,
    "has_next": true,
    "has_prev": false
  }
}
```

---

## 排序和篩選

### 貼文排序
`/api/posts` 支援的排序參數：
- `sort=latest`（預設）：按建立時間排序
- `sort=popular`：按按讚數排序
- `sort=trending`：按最近活動排序

### 貼文篩選
支援的篩選參數：
- `category`：按分類篩選
- `tag`：按標籤 ID 篩選
- `user_id`：按使用者 ID 篩選
- `date_from`：篩選此日期之後的貼文（YYYY-MM-DD）
- `date_to`：篩選此日期之前的貼文（YYYY-MM-DD）

---

## WebSocket 事件

應用程式透過 WebSocket 連接支援即時功能：

### 連接
```javascript
const socket = io('http://localhost:3001', {
  auth: {
    token: 'your_jwt_token'
  }
});
```

### 事件

#### 新通知
```javascript
socket.on('notification', (data) => {
  console.log('新通知:', data);
});
```

#### 新留言
```javascript
socket.on('new_comment', (data) => {
  console.log('貼文新留言:', data);
});
```

#### 使用者線上狀態
```javascript
socket.on('user_online', (data) => {
  console.log('使用者上線:', data.user_id);
});

socket.on('user_offline', (data) => {
  console.log('使用者離線:', data.user_id);
});
```

---

## API 版本控制

目前 API 版本為 v1。未來版本將透過以下方式存取：
- `/api/v1/...`（目前）
- `/api/v2/...`（未來）

版本信息也包含在回應標頭中：
```
API-Version: 1.0
```

---

## 安全考量

### HTTPS
生產環境中所有 API 端點都應透過 HTTPS 存取。

### CORS
API 支援跨來源資源共享（CORS）用於網頁應用程式。

### 輸入清理
所有使用者輸入都經過清理以防止 XSS 攻擊。

### SQL 注入防護
所有資料庫查詢都使用參數化語句。

### 文件上傳安全
- 文件類型驗證
- 文件大小限制
- 病毒掃描（建議用於生產環境）
- 安全文件儲存

---

## 開發和測試

### 基礎 URL
- **開發環境**: `http://localhost:3001`
- **測試環境**: `https://staging-api.xiaoshiliu.com`
- **生產環境**: `https://api.xiaoshiliu.com`

### 測試帳號
用於開發和測試目的：
- **測試使用者**: `test_user` / `password123`
- **管理員使用者**: `admin` / `admin123`

### API 文檔
互動式 API 文檔可在以下位置取得：
- **Swagger UI**: `http://localhost:3001/api-docs`
- **Postman 集合**: 可在項目儲存庫中取得

---

## 支援和聯絡

如需 API 支援和問題諮詢：
- **電子郵件**: api-support@xiaoshiliu.com
- **文檔**: [項目文檔](README_zh-Hant.md)
- **GitHub Issues**: [回報問題](https://github.com/xiaoshiliu/community/issues)

---

*最後更新: 2025年1月16日*
*API 版本: 1.0.4*
# XiaoShiLiu Image Community API Documentation

## Project Information
- **Project Name**: XiaoShiLiu Image Community
- **Version**: v1.0.4
- **Base URL**: `http://localhost:3001`
- **Database**: xiaoshiliu (MySQL)
- **Last Updated**: 2025-09-07

## General Information

### Response Format
All API endpoints return JSON format with the following structure:

```json
{
  "code": 200,
  "message": "success",
  "data": {}
}
```

### Status Codes
- `200`: Request successful
- `400`: Bad request parameters
- `401`: Unauthorized, login required
- `403`: Forbidden access
- `404`: Resource not found
- `500`: Internal server error

### Authentication
Endpoints requiring authentication need JWT token in request headers:
```
Authorization: Bearer <your_jwt_token>
```

### Pagination Parameters
Common parameters for endpoints supporting pagination:
- `page`: Page number, default is 1
- `limit`: Items per page, default is 20

---

## Authentication Endpoints

### 1. User Registration
**Endpoint**: `POST /api/auth/register`

**Request Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| user_id | string | Yes | User ID (unique) |
| nickname | string | Yes | Nickname |
| password | string | Yes | Password (6-20 characters) |
| avatar | string | No | Avatar URL |
| bio | string | No | Personal bio |
| location | string | No | Location (if not provided, system will auto-detect based on IP) |

**Feature Description**:
- System automatically obtains user location information through third-party API
- If user manually provides location parameter, it takes priority
- For local environment, location will display as "Local"
- System does not store user IP addresses, only obtains location for display

**Response Example**:
```json
{
  "code": 200,
  "message": "Registration successful",
  "data": {
    "user": {
      "id": 1,
      "user_id": "user_001",
      "nickname": "XiaoShiLiu",
      "avatar": "https://example.com/avatar.jpg",
      "bio": "This is a personal bio",
      "location": "Beijing"
    },
    "tokens": {
      "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "expires_in": 3600
    }
  }
}
```

### 2. User Login
**Endpoint**: `POST /api/auth/login`

**Request Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| user_id | string | Yes | XiaoShiLiu ID |
| password | string | Yes | Password |

**Response Example**:
```json
{
  "code": 200,
  "message": "Login successful",
  "data": {
    "user": {
      "id": 1,
      "user_id": "xiaoshiliu123",
      "nickname": "XiaoShiLiu User",
      "avatar": "http://example.com/avatar.jpg",
      "bio": "This is my personal bio",
      "location": "Beijing",
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

### 3. Refresh Token
**Endpoint**: `POST /api/auth/refresh`

**Request Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| refresh_token | string | Yes | Refresh token |

**Response Example**:
```json
{
  "code": 200,
  "message": "Token refresh successful",
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expires_in": 3600
  }
}
```

### 4. Logout
**Endpoint**: `POST /api/auth/logout`
**Authentication Required**: Yes

**Response Example**:
```json
{
  "code": 200,
  "message": "Logout successful"
}
```

### 5. Get Current User Info
**Endpoint**: `GET /api/auth/me`
**Authentication Required**: Yes

**Response Example**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "id": 1,
    "user_id": "user_001",
    "nickname": "XiaoShiLiu",
    "avatar": "https://example.com/avatar.jpg",
    "bio": "This is a personal bio",
    "location": "Beijing",
    "follow_count": 10,
    "fans_count": 20,
    "like_count": 100,
    "is_active": 1,
    "created_at": "2025-08-30T00:00:00.000Z"
  }
}
```

---

## User Endpoints

### 1. Get User List
**Endpoint**: `GET /api/users`

**Request Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| page | int | No | Page number, default 1 |
| limit | int | No | Items per page, default 20 |

**Response Example**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "users": [
      {
        "id": 1,
        "user_id": "user_001",
        "nickname": "XiaoShiLiu",
        "avatar": "https://example.com/avatar.jpg",
        "bio": "This is a personal bio",
        "location": "Beijing",
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

### 2. Get User Details
**Endpoint**: `GET /api/users/:id`

**Path Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | int | Yes | User ID |

**Response Example**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "id": 1,
    "user_id": "user_001",
    "nickname": "XiaoShiLiu",
    "avatar": "https://example.com/avatar.jpg",
    "bio": "This is a personal bio",
    "location": "Beijing",
    "follow_count": 10,
    "fans_count": 20,
    "like_count": 100,
    "created_at": "2025-08-30T00:00:00.000Z"
  }
}
```

### 3. Get User Collections
**Endpoint**: `GET /api/users/:id/collections`

**Path Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | int | Yes | User ID |

**Request Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| page | int | No | Page number, default 1 |
| limit | int | No | Items per page, default 20 |

### 4. Follow User
**Endpoint**: `POST /api/users/:id/follow`
**Authentication Required**: Yes

**Path Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | int | Yes | User ID to follow |

**Response Example**:
```json
{
  "code": 200,
  "message": "Follow successful"
}
```

### 5. Unfollow User
**Endpoint**: `DELETE /api/users/:id/follow`
**Authentication Required**: Yes

**Path Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | int | Yes | User ID to unfollow |

**Response Example**:
```json
{
  "code": 200,
  "message": "Unfollow successful"
}
```

### 6. Get Following List
**Endpoint**: `GET /api/users/:id/following`

**Path Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | int | Yes | User ID |

**Request Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| page | int | No | Page number, default 1 |
| limit | int | No | Items per page, default 20 |

**Response Example**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "following": [
      {
        "id": 2,
        "user_id": "user_002",
        "nickname": "User 2",
        "avatar": "https://example.com/avatar2.jpg",
        "bio": "Personal bio",
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

### 7. Get Followers List
**Endpoint**: `GET /api/users/:id/followers`

**Path Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | int | Yes | User ID |

**Request Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| page | int | No | Page number, default 1 |
| limit | int | No | Items per page, default 20 |

**Response Example**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "followers": [
      {
        "id": 3,
        "user_id": "user_003",
        "nickname": "User 3",
        "avatar": "https://example.com/avatar3.jpg",
        "bio": "Personal bio",
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

### 8. Search Users
**Endpoint**: `GET /api/users/search`

**Request Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| keyword | string | Yes | Search keyword (supports nickname and XiaoShiLiu ID search) |
| page | int | No | Page number, default 1 |
| limit | int | No | Items per page, default 20 |

**Response Example**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "users": [
      {
        "id": 1,
        "user_id": "user_001",
        "nickname": "XiaoShiLiu",
        "avatar": "https://example.com/avatar.jpg",
        "bio": "This is a personal bio",
        "location": "Beijing",
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

### 9. Get User Personality Tags
**Endpoint**: `GET /api/users/:id/personality-tags`

**Path Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | int | Yes | User ID |

**Response Example**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "tags": [
      {
        "id": 1,
        "name": "Photography Enthusiast",
        "color": "#FF6B6B"
      },
      {
        "id": 2,
        "name": "Travel Expert",
        "color": "#4ECDC4"
      }
    ]
  }
}
```

### 10. Get User Posts
**Endpoint**: `GET /api/users/:id/posts`

**Path Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | int | Yes | User ID |

**Request Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| page | int | No | Page number, default 1 |
| limit | int | No | Items per page, default 20 |

**Response Example**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "posts": [
      {
        "id": 1,
        "title": "Beautiful Scenery",
        "content": "Captured beautiful scenery today",
        "images": ["https://example.com/image1.jpg"],
        "category": "photography",
        "tags": ["scenery", "photography"],
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
          "nickname": "XiaoShiLiu",
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

### 11. Get User Liked Posts
**Endpoint**: `GET /api/users/:id/likes`

**Path Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | int | Yes | User ID |

**Request Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| page | int | No | Page number, default 1 |
| limit | int | No | Items per page, default 20 |

**Response Example**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "posts": [
      {
        "id": 2,
        "title": "Wonderful Moments",
        "content": "Recording beautiful moments in life",
        "images": ["https://example.com/image2.jpg"],
        "category": "life",
        "tags": ["life", "record"],
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
          "nickname": "User 2",
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

### 12. Get Follow Status
**Endpoint**: `GET /api/users/:id/follow-status`
**Authentication Required**: Yes

**Path Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | int | Yes | Target user ID |

**Response Example**:
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

### 13. Get Mutual Follows List
**Endpoint**: `GET /api/users/:id/mutual-follows`

**Path Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | int | Yes | User ID |

**Request Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| page | int | No | Page number, default 1 |
| limit | int | No | Items per page, default 20 |

**Response Example**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "mutualFollows": [
      {
        "id": 3,
        "user_id": "user_003",
        "nickname": "User 3",
        "avatar": "https://example.com/avatar3.jpg",
        "bio": "Personal bio",
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

### 14. Get User Statistics
**Endpoint**: `GET /api/users/:id/stats`

**Path Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | int | Yes | User ID |

**Response Example**:
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

### 15. Update User Info
**Endpoint**: `PUT /api/users/:id`
**Authentication Required**: Yes

**Path Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | int | Yes | User ID |

**Request Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| nickname | string | No | Nickname |
| avatar | string | No | Avatar URL |
| bio | string | No | Personal bio |
| location | string | No | Location |

**Response Example**:
```json
{
  "code": 200,
  "message": "User info updated successfully",
  "data": {
    "id": 1,
    "user_id": "user_001",
    "nickname": "New Nickname",
    "avatar": "https://example.com/new_avatar.jpg",
    "bio": "New personal bio",
    "location": "Shanghai",
    "updated_at": "2025-01-02T00:00:00.000Z"
  }
}
```

---

## Post Endpoints

### 1. Get Posts List
**Endpoint**: `GET /api/posts`

**Request Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| page | int | No | Page number, default 1 |
| limit | int | No | Items per page, default 20 |
| category | string | No | Category filter |

**Response Example**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "posts": [
      {
        "id": 1,
        "user_id": 1,
        "title": "Post Title",
        "content": "Post content",
        "category": "Life",
        "view_count": 100,
        "like_count": 10,
        "comment_count": 5,
        "collect_count": 3,
        "created_at": "2025-08-30T00:00:00.000Z",
        "nickname": "XiaoShiLiu",
        "user_avatar": "https://example.com/avatar.jpg",
        "images": [
          "https://example.com/image1.jpg",
          "https://example.com/image2.jpg"
        ],
        "tags": [
          {
            "id": 1,
            "name": "Tag Name"
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

### 2. Get Post Details
**Endpoint**: `GET /api/posts/:id`

**Path Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | int | Yes | Post ID |

**Note**: Accessing post details will automatically increase view count

### 3. Create Post
**Endpoint**: `POST /api/posts`
**Authentication Required**: Yes

**Request Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| title | string | Yes | Post title |
| content | string | Yes | Post content |
| category | string | No | Category |
| images | array | No | Image URL array |
| tags | array | No | Tag ID array |

**Request Example**:
```json
{
  "title": "Sharing a Beautiful Afternoon",
  "content": "The weather is great today, taking a walk in the park...",
  "category": "Life",
  "images": [
    "https://example.com/image1.jpg",
    "https://example.com/image2.jpg"
  ],
  "tags": [1, 2, 3]
}
```

### 4. Get Post Comments
**Endpoint**: `GET /api/posts/:id/comments`

**Path Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | int | Yes | Post ID |

**Request Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| page | int | No | Page number, default 1 |
| limit | int | No | Items per page, default 20 |

### 5. Collect Post
**Endpoint**: `POST /api/posts/:id/collect`
**Authentication Required**: Yes

**Path Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | int | Yes | Post ID |

**Response Example**:
```json
{
  "code": 200,
  "message": "Collection successful"
}
```

### 6. Search Posts
**Endpoint**: `GET /api/posts/search`

**Request Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| keyword | string | Yes | Search keyword (supports title and content search) |
| page | int | No | Page number, default 1 |
| limit | int | No | Items per page, default 20 |
| category | string | No | Category filter |

**Response Example**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "posts": [
      {
        "id": 1,
        "title": "Beautiful Scenery",
        "content": "Captured beautiful scenery today",
        "images": ["https://example.com/image1.jpg"],
        "category": "photography",
        "tags": ["scenery", "photography"],
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
          "nickname": "XiaoShiLiu",
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

### 7. Update Post
**Endpoint**: `PUT /api/posts/:id`
**Authentication Required**: Yes

**Path Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | int | Yes | Post ID |

**Request Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| title | string | No | Post title |
| content | string | No | Post content |
| category | string | No | Category |
| images | array | No | Image URL array |
| tags | array | No | Tag ID array |

**Request Example**:
```json
{
  "title": "Updated Title",
  "content": "Updated content",
  "category": "Life",
  "images": [
    "https://example.com/new_image1.jpg"
  ],
  "tags": [1, 3, 5]
}
```

**Response Example**:
```json
{
  "code": 200,
  "message": "Post updated successfully",
  "data": {
    "id": 1,
    "title": "Updated Title",
    "content": "Updated content",
    "category": "Life",
    "updated_at": "2025-01-02T00:00:00.000Z"
  }
}
```

### 8. Delete Post
**Endpoint**: `DELETE /api/posts/:id`
**Authentication Required**: Yes

**Path Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | int | Yes | Post ID |

**Response Example**:
```json
{
  "code": 200,
  "message": "Post deleted successfully"
}
```

### 9. Uncollect Post
**Endpoint**: `DELETE /api/posts/:id/collect`
**Authentication Required**: Yes

**Path Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | int | Yes | Post ID |

**Response Example**:
```json
{
  "code": 200,
  "message": "Uncollection successful"
}
```

### 10. Get Drafts List
**Endpoint**: `GET /api/posts/drafts`
**Authentication Required**: Yes

**Request Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| page | int | No | Page number, default 1 |
| limit | int | No | Items per page, default 20 |
| keyword | string | No | Search keyword |

**Response Example**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "drafts": [
      {
        "id": 1,
        "title": "Draft Title",
        "content": "Draft content",
        "category": "Life",
        "images": ["image1.jpg", "image2.jpg"],
        "tags": ["Tag1", "Tag2"],
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

### 11. Save Draft
**Endpoint**: `POST /api/posts/drafts`
**Authentication Required**: Yes

**Request Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| title | string | No | Draft title |
| content | string | No | Draft content |
| category | string | No | Category |
| images | array | No | Image URL array |
| tags | array | No | Tag array |

**Response Example**:
```json
{
  "code": 200,
  "message": "Draft saved successfully",
  "data": {
    "id": 1,
    "title": "Draft Title",
    "content": "Draft content",
    "created_at": "2025-01-16T00:00:00.000Z"
  }
}
```

### 12. Update Draft
**Endpoint**: `PUT /api/posts/drafts/:id`
**Authentication Required**: Yes

**Path Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | int | Yes | Draft ID |

**Request Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| title | string | No | Draft title |
| content | string | No | Draft content |
| category | string | No | Category |
| images | array | No | Image URL array |
| tags | array | No | Tag array |

**Response Example**:
```json
{
  "code": 200,
  "message": "Draft updated successfully",
  "data": {
    "id": 1,
    "title": "Updated Draft Title",
    "content": "Updated draft content",
    "updated_at": "2025-01-16T00:00:00.000Z"
  }
}
```

### 13. Delete Draft
**Endpoint**: `DELETE /api/posts/drafts/:id`
**Authentication Required**: Yes

**Path Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | int | Yes | Draft ID |

**Response Example**:
```json
{
  "code": 200,
  "message": "Draft deleted successfully"
}
```

### 14. Publish Draft
**Endpoint**: `POST /api/posts/drafts/:id/publish`
**Authentication Required**: Yes

**Path Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | int | Yes | Draft ID |

**Response Example**:
```json
{
  "code": 200,
  "message": "Draft published successfully",
  "data": {
    "id": 1,
    "title": "Published Post Title",
    "content": "Published post content",
    "is_draft": 0,
    "created_at": "2025-01-16T00:00:00.000Z"
  }
}
```

---

## Like Endpoints

### 1. Like Post
**Endpoint**: `POST /api/likes`
**Authentication Required**: Yes

**Request Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| target_type | int | Yes | Target type (1-post, 2-comment) |
| target_id | int | Yes | Target ID |

**Response Example**:
```json
{
  "code": 200,
  "message": "Like successful"
}
```

### 2. Unlike
**Endpoint**: `DELETE /api/likes`
**Authentication Required**: Yes

**Request Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| target_type | int | Yes | Target type (1-post, 2-comment) |
| target_id | int | Yes | Target ID |

**Response Example**:
```json
{
  "code": 200,
  "message": "Unlike successful"
}
```

---

## Comment Endpoints

### 1. Create Comment
**Endpoint**: `POST /api/comments`
**Authentication Required**: Yes

**Request Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| post_id | int | Yes | Post ID |
| content | string | Yes | Comment content |
| parent_id | int | No | Parent comment ID (for replies) |

**Response Example**:
```json
{
  "code": 200,
  "message": "Comment created successfully",
  "data": {
    "id": 1,
    "post_id": 1,
    "user_id": 1,
    "content": "This is a comment",
    "parent_id": null,
    "like_count": 0,
    "created_at": "2025-01-16T00:00:00.000Z",
    "user": {
      "id": 1,
      "nickname": "XiaoShiLiu",
      "avatar": "https://example.com/avatar.jpg"
    }
  }
}
```

### 2. Get Comments
**Endpoint**: `GET /api/comments`

**Request Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| post_id | int | Yes | Post ID |
| page | int | No | Page number, default 1 |
| limit | int | No | Items per page, default 20 |

**Response Example**:
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
        "content": "This is a comment",
        "parent_id": null,
        "like_count": 5,
        "isLiked": false,
        "created_at": "2025-01-16T00:00:00.000Z",
        "user": {
          "id": 1,
          "nickname": "XiaoShiLiu",
          "avatar": "https://example.com/avatar.jpg"
        },
        "replies": [
          {
            "id": 2,
            "post_id": 1,
            "user_id": 2,
            "content": "This is a reply",
            "parent_id": 1,
            "like_count": 2,
            "isLiked": false,
            "created_at": "2025-01-16T00:00:00.000Z",
            "user": {
              "id": 2,
              "nickname": "User 2",
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

### 3. Delete Comment
**Endpoint**: `DELETE /api/comments/:id`
**Authentication Required**: Yes

**Path Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | int | Yes | Comment ID |

**Response Example**:
```json
{
  "code": 200,
  "message": "Comment deleted successfully"
}
```

---

## Tag Endpoints

### 1. Get Tags List
**Endpoint**: `GET /api/tags`

**Request Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| page | int | No | Page number, default 1 |
| limit | int | No | Items per page, default 20 |
| keyword | string | No | Search keyword |

**Response Example**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "tags": [
      {
        "id": 1,
        "name": "Photography",
        "use_count": 100,
        "created_at": "2025-01-16T00:00:00.000Z"
      },
      {
        "id": 2,
        "name": "Travel",
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

### 2. Get Popular Tags
**Endpoint**: `GET /api/tags/popular`

**Request Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| limit | int | No | Number of tags, default 10 |

**Response Example**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "tags": [
      {
        "id": 1,
        "name": "Photography",
        "use_count": 100
      },
      {
        "id": 2,
        "name": "Travel",
        "use_count": 80
      }
    ]
  }
}
```

### 3. Search Tags
**Endpoint**: `GET /api/tags/search`

**Request Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| keyword | string | Yes | Search keyword |
| limit | int | No | Number of results, default 10 |

**Response Example**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "tags": [
      {
        "id": 1,
        "name": "Photography",
        "use_count": 100
      }
    ]
  }
}
```

---

## Search Endpoints

### 1. Global Search
**Endpoint**: `GET /api/search`

**Request Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| keyword | string | Yes | Search keyword |
| type | string | No | Search type (posts, users, tags, all), default all |
| page | int | No | Page number, default 1 |
| limit | int | No | Items per page, default 20 |

**Response Example**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "posts": {
      "items": [
        {
          "id": 1,
          "title": "Beautiful Scenery",
          "content": "Captured beautiful scenery today",
          "images": ["https://example.com/image1.jpg"],
          "like_count": 10,
          "comment_count": 5,
          "created_at": "2025-08-30T00:00:00.000Z",
          "user": {
            "id": 1,
            "nickname": "XiaoShiLiu",
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
          "nickname": "XiaoShiLiu",
          "avatar": "https://example.com/avatar.jpg",
          "bio": "This is a personal bio",
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
          "name": "Photography",
          "use_count": 100
        }
      ],
      "total": 3
    }
  }
}
```

---

## Notification Endpoints

### 1. Get Notifications
**Endpoint**: `GET /api/notifications`
**Authentication Required**: Yes

**Request Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| page | int | No | Page number, default 1 |
| limit | int | No | Items per page, default 20 |
| type | int | No | Notification type filter (1-like, 2-comment, 3-follow) |
| is_read | int | No | Read status filter (0-unread, 1-read) |

**Response Example**:
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
        "title": "User 2 liked your post",
        "target_id": 1,
        "comment_id": null,
        "is_read": 0,
        "created_at": "2025-01-16T00:00:00.000Z",
        "sender": {
          "id": 2,
          "nickname": "User 2",
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

### 2. Mark Notification as Read
**Endpoint**: `PUT /api/notifications/:id/read`
**Authentication Required**: Yes

**Path Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | int | Yes | Notification ID |

**Response Example**:
```json
{
  "code": 200,
  "message": "Notification marked as read"
}
```

### 3. Mark All Notifications as Read
**Endpoint**: `PUT /api/notifications/read-all`
**Authentication Required**: Yes

**Response Example**:
```json
{
  "code": 200,
  "message": "All notifications marked as read"
}
```

### 4. Get Unread Count
**Endpoint**: `GET /api/notifications/unread-count`
**Authentication Required**: Yes

**Response Example**:
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

## Upload Endpoints

### 1. Upload Image
**Endpoint**: `POST /api/upload/image`
**Authentication Required**: Yes
**Content-Type**: `multipart/form-data`

**Request Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| image | file | Yes | Image file (supports jpg, jpeg, png, gif, webp) |
| type | string | No | Upload type (avatar, post), default post |

**Response Example**:
```json
{
  "code": 200,
  "message": "Upload successful",
  "data": {
    "url": "https://example.com/uploads/image_123456.jpg",
    "filename": "image_123456.jpg",
    "size": 1024000,
    "type": "image/jpeg"
  }
}
```

### 2. Upload Multiple Images
**Endpoint**: `POST /api/upload/images`
**Authentication Required**: Yes
**Content-Type**: `multipart/form-data`

**Request Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| images | file[] | Yes | Image files (max 9 files) |
| type | string | No | Upload type (post), default post |

**Response Example**:
```json
{
  "code": 200,
  "message": "Upload successful",
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

## Statistics Endpoints

### 1. Get Platform Statistics
**Endpoint**: `GET /api/stats/platform`

**Response Example**:
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

### 2. Get User Statistics
**Endpoint**: `GET /api/stats/user/:id`

**Path Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | int | Yes | User ID |

**Response Example**:
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

## Admin Endpoints

### 1. Admin Login
**Endpoint**: `POST /api/admin/login`

**Request Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| username | string | Yes | Admin username |
| password | string | Yes | Admin password |

**Response Example**:
```json
{
  "code": 200,
  "message": "Login successful",
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

### 2. Get Dashboard Data
**Endpoint**: `GET /api/admin/dashboard`
**Authentication Required**: Yes (Admin)

**Response Example**:
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

### 3. Manage Users
**Endpoint**: `GET /api/admin/users`
**Authentication Required**: Yes (Admin)

**Request Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| page | int | No | Page number, default 1 |
| limit | int | No | Items per page, default 20 |
| keyword | string | No | Search keyword |
| status | string | No | User status filter (active, inactive) |

**Response Example**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "users": [
      {
        "id": 1,
        "user_id": "user_001",
        "nickname": "XiaoShiLiu",
        "avatar": "https://example.com/avatar.jpg",
        "bio": "This is a personal bio",
        "location": "Beijing",
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

### 4. Manage Posts
**Endpoint**: `GET /api/admin/posts`
**Authentication Required**: Yes (Admin)

**Request Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| page | int | No | Page number, default 1 |
| limit | int | No | Items per page, default 20 |
| keyword | string | No | Search keyword |
| category | string | No | Category filter |
| status | string | No | Status filter (published, draft) |

**Response Example**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "posts": [
      {
        "id": 1,
        "title": "Post Title",
        "content": "Post content preview...",
        "category": "Life",
        "is_draft": 0,
        "view_count": 100,
        "like_count": 10,
        "comment_count": 5,
        "collect_count": 3,
        "created_at": "2025-08-30T00:00:00.000Z",
        "user": {
          "id": 1,
          "nickname": "XiaoShiLiu",
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

## Error Handling

### Common Error Responses

#### 400 Bad Request
```json
{
  "code": 400,
  "message": "Invalid request parameters",
  "errors": {
    "email": ["Email format is invalid"],
    "password": ["Password must be at least 6 characters"]
  }
}
```

#### 401 Unauthorized
```json
{
  "code": 401,
  "message": "Unauthorized access, please login"
}
```

#### 403 Forbidden
```json
{
  "code": 403,
  "message": "Access denied, insufficient permissions"
}
```

#### 404 Not Found
```json
{
  "code": 404,
  "message": "Resource not found"
}
```

#### 422 Validation Error
```json
{
  "code": 422,
  "message": "Validation failed",
  "errors": {
    "title": ["Title is required"],
    "content": ["Content cannot be empty"]
  }
}
```

#### 500 Internal Server Error
```json
{
  "code": 500,
  "message": "Internal server error"
}
```

---

## Rate Limiting

The API implements rate limiting to prevent abuse:

- **General endpoints**: 100 requests per minute per IP
- **Authentication endpoints**: 10 requests per minute per IP
- **Upload endpoints**: 20 requests per minute per authenticated user

When rate limit is exceeded, the API returns:

```json
{
  "code": 429,
  "message": "Too many requests, please try again later",
  "retry_after": 60
}
```

---

## Data Validation Rules

### User Registration
- **user_id**: 3-20 characters, alphanumeric and underscore only
- **nickname**: 1-50 characters
- **password**: 6-20 characters
- **bio**: Maximum 500 characters
- **location**: Maximum 100 characters

### Post Creation
- **title**: 1-200 characters
- **content**: 1-10000 characters
- **category**: Must be one of predefined categories
- **images**: Maximum 9 images, each under 10MB
- **tags**: Maximum 10 tags per post

### Comment Creation
- **content**: 1-1000 characters

---

## Pagination

All list endpoints support pagination with the following parameters:

- `page`: Page number (starting from 1)
- `limit`: Items per page (default: 20, max: 100)

Pagination response format:
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

## Sorting and Filtering

### Posts Sorting
Supported sort parameters for `/api/posts`:
- `sort=latest` (default): Sort by creation time
- `sort=popular`: Sort by like count
- `sort=trending`: Sort by recent activity

### Posts Filtering
Supported filter parameters:
- `category`: Filter by category
- `tag`: Filter by tag ID
- `user_id`: Filter by user ID
- `date_from`: Filter posts after this date (YYYY-MM-DD)
- `date_to`: Filter posts before this date (YYYY-MM-DD)

---

## WebSocket Events

The application supports real-time features through WebSocket connections:

### Connection
```javascript
const socket = io('http://localhost:3001', {
  auth: {
    token: 'your_jwt_token'
  }
});
```

### Events

#### New Notification
```javascript
socket.on('notification', (data) => {
  console.log('New notification:', data);
});
```

#### New Comment
```javascript
socket.on('new_comment', (data) => {
  console.log('New comment on post:', data);
});
```

#### User Online Status
```javascript
socket.on('user_online', (data) => {
  console.log('User came online:', data.user_id);
});

socket.on('user_offline', (data) => {
  console.log('User went offline:', data.user_id);
});
```

---

## API Versioning

The current API version is v1. Future versions will be accessible via:
- `/api/v1/...` (current)
- `/api/v2/...` (future)

Version information is also included in response headers:
```
API-Version: 1.0
```

---

## Security Considerations

### HTTPS
All API endpoints should be accessed over HTTPS in production.

### CORS
The API supports Cross-Origin Resource Sharing (CORS) for web applications.

### Input Sanitization
All user inputs are sanitized to prevent XSS attacks.

### SQL Injection Prevention
All database queries use parameterized statements.

### File Upload Security
- File type validation
- File size limits
- Virus scanning (recommended for production)
- Secure file storage

---

## Development and Testing

### Base URLs
- **Development**: `http://localhost:3001`
- **Staging**: `https://staging-api.xiaoshiliu.com`
- **Production**: `https://api.xiaoshiliu.com`

### Testing Accounts
For development and testing purposes:
- **Test User**: `test_user` / `password123`
- **Admin User**: `admin` / `admin123`

### API Documentation
Interactive API documentation is available at:
- **Swagger UI**: `http://localhost:3001/api-docs`
- **Postman Collection**: Available in the project repository

---

## Support and Contact

For API support and questions:
- **Email**: api-support@xiaoshiliu.com
- **Documentation**: [Project Documentation](README_En.md)
- **GitHub Issues**: [Report Issues](https://github.com/xiaoshiliu/community/issues)

---

*Last updated: January 16, 2025*
*API Version: 1.0.4*
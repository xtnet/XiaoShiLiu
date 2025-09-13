# Xiaoshiliu Image and Text Community API Documentation

## Project Information
- **Project Name**: Xiaoshiliu Image and Text Community
- **Version**: v1.1.4
- **Basic URL**: `http://localhost:3001`
- **Database**: xiaoshiliu (MySQL)
- **Update Time**: 2025-09-13

## General Instructions

### Response Format
All API interfaces return JSON format with the following structure:

```json
{
  "code": 200,
  "message": "success",
  "data": {}
}
```

### Status Code Explanation
- `200`: Request successful
- `400`: Request parameter error
- `401`: Unauthorized, requires login
- `403`: Forbidden access
- `404`: Resource not found
- `500`: Internal server error

### Authentication Instructions
Interfaces requiring authentication need to carry a JWT token in the request header:
```
Authorization: Bearer <your_jwt_token>
```

### Pagination Parameters
Common parameters for interfaces supporting pagination:
- `page`: Page number, default is 1
- `limit`: Number of items per page, default is 20

---

## Authentication-related Interfaces

### 1. User Registration
**API Address**: `POST /api/auth/register`

**Request Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| user_id | string | Yes | User ID (unique) |
| nickname | string | Yes | Nickname |
| password | string | Yes | Password (6-20 characters) |
| avatar | string | No | Avatar URL |
| bio | string | No | Personal introduction |
| location | string | No | Location (if not provided, the system will automatically obtain the location based on IP) |

**Function Description**:
- The system will automatically obtain the user's location information through a third-party API
- If the user manually provides the location parameter, the system will prioritize the value provided by the user
- For local environments, location will be displayed as "Local"
- The system will not store the user's IP address; it will only obtain the location information for display purposes

**Response Example**:
```json
{
  "code": 200,
  "message": "Registration successful",
  "data": {
    "user": {
      "id": 1,
      "user_id": "user_001",
      "nickname": "Xiaoshiliu",
      "avatar": "https://example.com/avatar.jpg",
      "bio": "This is a personal introduction",
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
**API Address**: `POST /api/auth/login`

**Request Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| user_id | string | Yes | Xiaoshiliu account |
| password | string | Yes | Password |

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "id": 1,
    "user_id": "user_001",
    "nickname": "Xiaosuishi",
    "avatar": "https://example.com/avatar.jpg",
    "bio": "This is a personal introduction",
    "location": "Beijing",
    "follow_count": 10,
    "fans_count": 20,
    "like_count": 100,
    "created_at": "2025-08-30T00:00:00.000Z"
  }
}
```

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
        "bio": "This is a personal introduction",
        "location": "Shanghai",
        "follow_count": 3,
        "fans_count": 15,
        "followed_at": "2025-08-31T00:00:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 15,
      "pages": 1
    }
  }
}
```

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
        "bio": "Personal introduction",
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

### 8. Search User
**API Endpoint**: `GET /api/users/search`

**Request Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| keyword | string | Yes | Search keyword (supports nickname and wechat ID search) |
| page | int | No | Page number, default 1 |
| limit | int | No | Number of items per page, default 20 |

**Response Example**:
```json
{
  "code": 200,
  "message": "success"
}
```

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "likes": [
      {
        "id": 1,
        "post_id": 1,
        "user_id": 1,
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

```json
{
  "code": 200,
  "message": "Success",
  "data": {
    "nickname": "New Nickname",
    "avatar": "https://example.com/new_avatar.jpg",
    "bio": "New personal introduction",
    "location": "New location"
  }
}
```

```json
{
  "code": 200,
  "message": "Post list retrieved successfully",
  "data": {
    "total": 50,
    "per_page": 10,
    "current_page": 1,
    "data": [
      {
        "id": 1,
        "user_id": "user_001",
        "title": "Introduction to Python",
        "content": "This is an introduction to Python programming language.",
        "created_at": "2025-01-01T00:00:00.000Z",
        "updated_at": "2025-01-02T00:00:00.000Z",
        "category": {
          "id": 1,
          "name": "Programming",
          "category_title": "programming"
        }
      },
      {
        "id": 2,
        "user_id": "user_002",
        "title": "Understanding AI",
        "content": "This post discusses the basics of artificial intelligence.",
        "created_at": "2025-01-01T01:00:00.000Z",
        "updated_at": "2025-01-02T01:00:00.000Z",
        "category": {
          "id": 2,
          "name": "Technology",
          "category_title": "technology"
        }
      },
      // Additional post objects...
    ]
  }
}
```

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "posts": [
      {
        "id": 1,
        "user_id": 1,
        "title": "Note Title",
        "content": "Note content",
        "category_id": 2,
        "view_count": 100,
        "like_count": 10,
        "comment_count": 5,
        "collect_count": 3,
        "created_at": "2025-08-30T00:00:00.000Z",
        "nickname": "Little Peach",
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

### 2. Retrieve Note Details
**API Endpoint**: `GET /api/posts/:id`

**Path Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | int | Yes | Note ID |

**Description**: Accessing note details will automatically increase the view count.

### 3. Create Note
**API Endpoint**: `POST /api/posts`
**Authentication Required**: Yes

**Request Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| title | string | No* | Note Title (required when publishing, optional when drafting) |
| content | string | No* | Note Content (required when publishing, optional when drafting) |
| category_id | int | No | Category ID |
| images | array | No | Array of image URLs |
| tags | array | No | Array of tag names (string array) |
| is_draft | boolean | No | Whether it is a draft, default false |

**Request Example**:
```json
{
  "title": "Share a beautiful afternoon",
  "content": "Today the weather is nice, walking in the park...",
  "category_id": 5,
  "images": [
    "https://example.com/image1.jpg",
    "https://example.com/image2.jpg"
  ],
  "tags": ["Life", "Photography", "Share"],
  "is_draft": false
}
```

### 4. Retrieve Note Comments
**API Endpoint**: `GET /api/posts/:id/comments`

**Path Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | int | Yes | Note ID |

**Request Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| page | int | No | Page number, default 1 |
| limit | int | No | Number of items per page, default 20 |

### 5. Collect Note
**API Endpoint**: `POST /api/posts/:id/collect`
**Authentication Required**: Yes

**Path Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | int | Yes | Note ID |

**Response Example**:
```json
{
  "code": 200,
  "message": "Collection successful"
}
```

### 6. Search Notes
**API Endpoint**: `GET /api/posts/search`

**Request Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| keyword | string | Yes | Search keyword (supports title and content search) |
| page | integer | No | Page number, default 1 |
| limit | integer | No | Number of items per page, default 20 |
| category_id | integer | No | Category ID filter |

**Response Example**:

```json
{
  "code": 200,
  "message": "成功",
  "data": {
    "drafts": [
      {
        "id": 1,
        "title": "Draft Title",
        "content": "This is a draft content.",
        "category_id": 3,
        "tags": ["Draft", "Note"],
        "is_draft": true,
        "created_at": "2025-08-31T00:00:00.000Z"
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

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "drafts": [
      {
        "id": 1,
        "title": "Draft Title",
        "content": "Draft Content",
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

---
### 4. Delete Comment
**Interface Location**: `DELETE /api/comments/:id`
**Authentication Required**: Yes

**Path Parameters**:
| Parameter | Data Type | Required | Description |
|-----------|-----------|----------|-------------|
| id | int | Yes | Comment ID |

**Response Example**:
```json
{
  "code": 200,
  "message": "Comment deleted successfully"
}
```

---
### 4. Get Note Comments
**Interface Location**: `GET /api/posts/:id/comments`

**Path Parameters**:
| Parameter | Data Type | Required | Description |
|-----------|-----------|----------|-------------|
| id | int | Yes | Note ID |

**Request Parameters**:
| Parameter | Data Type | Required | Description |
|-----------|-----------|----------|-------------|
| page | int | No | Page number, default 1 |
| limit | int | No | Number of items per page, default 20 |

---

## Comment Related Interfaces

### 1. Get Comment List
**Interface Location**: `GET /api/posts/:id/comments`
**Authentication Required**: No (optional)

**Path Parameters**:
| Parameter | Data Type | Required | Description |
|-----------|-----------|----------|-------------|
| id | int | Yes | Note ID |

**Request Parameters**:
| Parameter | Data Type | Required | Description |
|-----------|-----------|----------|-------------|
| page | int | No | Page number, default 1 |
| limit | int | No | Number of items per page, default 20 |
| sort | string | No | Sorting method: desc (default) or asc |

**Response Example**:
```json
{
  // Response content
}
```

**Description**:
- The `content` field may contain HTML formatted @user tags
- The front-end needs to correctly render HTML content to display @user links
- @user links contain `href`, `data-user-id`, and `class` attributes for front-end processing

### 2. Create Comment
**Interface Location**: `POST /api/posts/:id/comments`
**Authentication Required**: Yes

**Path Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | int | Yes | Record ID |

**Request Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| content | string | Yes | Comment content (supports HTML format with @functionality) |
| parent_id | int | No | Parent comment ID (used when replying to a comment) |

**@Functionality Description**:
- Comment content supports @user functionality
- @user HTML format: `<a href="/user/{user_id}" data-user-id="{user_id}" class="mention-link" contenteditable="false">@{nickname}</a>`
- The system will automatically parse @user tags and send notifications to the @users
- Supports mentioning multiple users in a single comment

**Request Example**:
```json
{
  "content": "This is a regular comment",
  "parent_id": null
}
```

**Request Example with @User Mention**:
```json
{
  "content": "This is a comment mentioning @JohnDoe and @JaneSmith",
  "parent_id": null
}
```

```json
{
  "content": "<p><a href=\"/user/user012\" data-user-id=\"user012\" class=\"mention-link\" contenteditable=\"false\">@Photography Lover</a> Your work is really great!</p>",
  "parent_id": null
}
**Response Example**:
```json
{
  "code": 200,
  "message": "Comment created successfully",
  "data": {
    "id": 1,
    "content": "<p><a href=\"/user/user012\" data-user-id=\"user012\" class=\"mention-link\" contenteditable=\"false\">@Photography Lover</a> Your work is really great!</p>",
    "user_id": 1,
    "parent_id": null,
    "created_at": "2025-08-30T00:00:00.000Z"
  }
}

**@Feature Processing Description**:
- When a comment contains an @user mention, the system will automatically:
  1. Parse the `data-user-id` attribute in the HTML to obtain the ID of the mentioned user
  2. Verify that the mentioned user exists
  3. Send a mention notification to the mentioned user
  4. Will not send an @notification to oneself

### 3. Retrieve Comment Replies
**API Endpoint**: `GET /api/comments/:id/replies`
**Authentication Required**: No (optional)

**Path Parameters**:
| Parameter | Type | Required | Description |
|----------|------|----------|------------|
| id | int | Yes | Comment ID |

**Request Parameters**:
| Parameter | Type | Required | Description |
|----------|------|----------|------------|
| page | int | No | Page number, default 1 |
| limit | int | No | Number of items per page, default 10 |

**Response Example**:

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "replies": [
      {
        "id": 2,
        "content": "This is a reply",
        "user_id": 2,
        "nickname": "Li Si",
        "user_avatar": "https://img.example.com/avatar2.jpg",
        "parent_id": 1,
        "created_at": "2025-08-30T01:00:00.000Z",
        "liked": false
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 5,
      "pages": 1
    }
  }
}
```

### 4. Delete Comment
**API Endpoint**: `DELETE /api/comments/:id`
**Authentication Required**: Yes

**Path Parameters**:
| Parameter | Type | Required | Description |
|----------|------|----------|------------|
| id | int | Yes | Comment ID |

**Response Example**:
```json
{
  "code": 200,
  "message": "Comment deleted successfully"
}
```

---

## Notification-related APIs

### Notification Type Description
The notification system supports the following types:
- **1**: Like Post
- **2**: Like Comment
- **3**: Collection
- **4**: Comment Post
- **5**: Reply Comment
- **6**: Follow User
- **7**: Comment Mention (mentioning user in comment)
- **8**: Post Mention (mentioning user in post)

### 1. Retrieve Comment Notifications
**API Endpoint**: `GET /api/notifications/comments`
**Authentication Required**: Yes

**Request Parameters**:
| Parameter | Type | Required | Description |
|----------|------|----------|------------|
| page | int | No | Page number, default 1 |
| limit | int | No | Number of items per page, default 20 |

**Response Example**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "notifications": [
      {
        "id": 1,
        "type": "comment",
        "sender_id": 2,
        "sender_nickname": "User 2",
        "sender_avatar": "https://example.com/avatar2.jpg",
        "post_id": 1,
        "post_title": "Note Title",
        "comment_content": "Comment content",
        "is_read": 0,
        "created_at": "2025-08-30T00:00:00.000Z"
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

### 2. Retrieve Like Notifications
**Interface Address**: `GET /api/notifications/likes`
**Authentication Required**: Yes

**Request Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| page | int | No | Page number, default 1 |
| limit | int | No | Number of items per page, default 20 |

**Response Example**:
```json
{
  "code": 200,
  "message": "Success",
  "data": {
    "notifications": [
      {
        "id": 2,
        "type": "like",
        "senderID": 3,
        "senderNickname": "User3",
        "senderAvatar": "https://example.com/avatar3.jpg",
        "targetType": "article",
        "articleID": 1,
        "articleTitle": "Note Title",
        "isRead": 0,
        "createTime": "2025-08-30T00:00:00.000Z"
      }
    ],
    "pagination": {
      "pageNumber": 1,
      "itemsPerPage": 20,
      "total": 5,
      "pages": 1
    }
  }
}
```

### 3. Get Follow Notifications
**Interface Address**: `GET /api/notifications/follows`
**Authentication Required**: Yes

**Request Parameters**:
| Parameter | Options | Required | Description |
|-----------|---------|----------|-------------|
| page | int | No | Page number, default 1 |
| limit | int | No | Number of items per page, default 20 |

**Response Example**:
```json
{
  "code": 200,
  "message": "Success",
  "data": {
    "notifications": [
      {
        "id": 3,
        "type": "follow",
        "senderID": 4,
        "senderNickname": "User4",
        "senderAvatar": "https://example.com/avatar4.jpg",
        "isRead": 0,
        "createTime": "2025-08-30T00:00:00.000Z"
      }
    ],
    "pagination": {
      "pageNumber": 1,
      "itemsPerPage": 20,
      "total": 3,
      "pages": 1
    }
  }
}
```

### 4. Mark Notifications as Read
**Interface Address**: `PUT /api/notifications/:id/read`
**Authentication Required**: Yes

**Path Parameters**:
| Parameter | Options | Required | Description |
|-----------|---------|----------|-------------|
| id | int | Yes | Notification ID |

**Response Example**:
```json
{
  "code": 200,
  "message": "Marked successfully"
}
```

### 5. Get Collection Notifications
**Interface Address**: `GET /api/notifications/collections`
**Authentication Required**: Yes

**Request Parameters**:
| Parameter | Options | Required | Description |
|-----------|---------|----------|-------------|
| page | int | No | Page number, default 1 |
| limit | int | No | Number of items per page, default 20 |

**Response Example**:
```json
{
  "code": 200,
  "message": "Success",
  "data": {
    "notifications": [
      {
        "id": 4,
        "type": "collection",
        "senderID": 5,
        "senderNickname": "User5",
        "senderAvatar": "https://example.com/avatar5.jpg",
        "articleID": 1,
        "articleTitle": "Note Title",
        "articleImage": "https://example.com/post_image.jpg",
        "isRead": 0,
        "createTime": "2025-08-30T00:00:00.000Z"
      }
    ],
    "pagination": {
      "pageNumber": 1,
      "itemsPerPage": 20,
      "total": 2,
      "pages": 1
    }
  }
}
```

### 6. Get All Notifications
**Interface Address**: `GET /api/notifications`
**Authentication Required**: Yes

**Request Parameters**:
| Parameter | Options | Required | Description |
|-----------|---------|----------|------------|
| page | int | No | Page number, default 1 |
| limit | int | No | Number of items per page, default 20 |

**Response Example**:
```json
{
  "code": 200,
  "message": "Success",
  "data": {
    "notifications": [
      // This section should include all types of notifications
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": // Total number of notifications,
      "total_pages": // Total number of pages
    }
  }
}
```

{
  "code": 200,
  "message": "Success",
  "data": {
    "notifications": [
      {
        "id": 1,
        "type": "comment",
        "senderID": 2,
        "senderNickname": "User2",
        "senderAvatar": "https://example.com/avatar2.jpg",
        "postID": 1,
        "postTitle": "Note Title",
        "commentContent": "Comment content",
        "isRead": 0,
        "createTime": "2025-08-30T00:00:00.000Z"
      }
    ],
    "pagination": {
      "page_count": 1,
      "limit": 20,
      "total": 15,
      "total_pages": 1
    }
  }
}
### 6. Mark Notifications as Read
**API Endpoint**: `PUT /api/notifications/:id/read`
**Authentication Required**: Yes

**Path Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|------------|
| id | int | Yes | Notification ID |

**Response Example**:
```json
{
  "code": 200,
  "message": "Marked successfully"
}
```

### 7. Mark All Notifications as Read
**API Endpoint**: `PUT /api/notifications/read-all`
**Authentication Required**: Yes

**Response Example**:
```json
{
  "code": 200,
  "message": "All marked successfully"
}
```

### 8. Delete Notification
**API Endpoint**: `DELETE /api/notifications/:id`
**Authentication Required**: Yes

**Path Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|------------|
| id | int | Yes | Notification ID |

**Response Example**:
```json
{
  "code": 200,
  "message": "Deleted successfully"
}
```

### 9. Get Unread Notification Count
**API Endpoint**: `GET /api/notifications/unread-count`
**Authentication Required**: Yes

**Response Example**:
```json
{
  "code": 200,
  "message": "Success",
  "data": {
    "unreadCount": 5
  }
}
```

---

## Image Upload Interface

### 1. Single Image Upload
**API Endpoint**: `POST /api/upload/single`
**Authentication Required**: Yes

**Request Parameters**:
- Use `multipart/form-data` format
- File field name: `file`
- Supported formats: jpg, jpeg, png, webp
- File size limit: 5MB

**Response Example**:
```json
{
  "code": 200,
  "message": "Image upload successful",
  "data": {
    "originalname": "image.jpg",
    "size": 1024000,
    "url": "https://img.example.com/1640995200000_image.jpg"
  }
}
```

### 2. Multiple Images Upload
**API Endpoint**: `POST /api/upload/multiple`
**Authentication Required**: Yes

**Request Parameters**:
- Use `multipart/form-data` format
- File field name: `files`
- Up to 9 files supported
- Supported formats: jpg, jpeg, png, webp
- Single file size limit: 5MB

**Response Example**:
```json
{
  "code": 200,
  "message": "Multiple images uploaded successfully",
  "data": [
    {
      "originalname": "image1.jpg",
      "size": 1024000,
      "url": "https://img.example.com/1640995200000_image1.jpg"
    },
    {
      "originalname": "image2.jpg",
      "size": 1024000,
      "url": "https://img.example.com/1640995200001_image2.jpg"
    }
    // More files
  ]
}
## Interactive Interface

### 1. Like/Unlike
**Interface Address**: `POST /api/likes`
**Authentication Required**: Yes

**Request Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|------------|
| target_type | int | Yes | Target type (1: Note, 2: Comment) |
| target_id | int | Yes | Target ID |

**Function Description**:
- If the user has not liked, perform the like operation
- If the user has already liked, perform the unlike operation

**Request Example**:
```json
{
  "target_type": 1,
  "target_id": 1
}
```

**Response Example**:
```json
{
  "code": 200,
  "message": "Like successful",
  "data": {
    "liked": true
  }
}
```

### 1.1 Unlike (Backup Interface)
**Interface Address**: `DELETE /api/likes`
**Authentication Required**: Yes

**Request Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|------------|
| target_type | int | Yes | Target type (1: Note, 2: Comment) |
| target_id | int | Yes | Target ID |

**Request Example**:
```json
{
  "target_type": 1,
  "target_id": 1
}
```

**Response Example**:
```json
{
  "code": 200,
  "message": "Unlike successful"
}
```

### 2. Favorite/Unfavorite
**Interface Address**: `POST /api/collections`
**Authentication Required**: Yes

**Request Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|------------|
| post_id | int | Yes | Post ID |

**Request Example**:
```json
{
  "post_id": 1
}
```

**Response Example**:
```json
{
  "code": 200,
  "message": "Favorite successful",
  "data": {
    "collected": true
  }
}
```

---

## Tag-related Interface

### 1. Get Tag List
**Interface Address**: `GET /api/tags`

**Response Example**:
```json
{
  "code": 200,
  "message": "success",
  "data": [
    {
      "id": 1,
      "name": "Life",
      "description": "Content related to life",
      "use_count": 100,
      "is_hot": 1,
      "created_at": "2025-08-30T00:00:00.000Z"
    }
  ]
}
```

### 2. Get Hot Tags
**Interface Address**: `GET /api/tags/hot`
**Description**: Returns up to 10 hot tags

---

## Tag-related Interface

### 1. Get All Tags
**Interface Address**: `GET /api/tags`
**Authentication Required**: No

**Response Example**:
```json
{
  "code": 200,
  "message": "success",
  "data": [
    {
      "id": 1,
      "name": "Photography",
      "description": "Content related to photography",
      "use_count": 150,
      "created_at": "2025-08-30T00:00:00.000Z"
    }
  ]
}
```

### 2. Get Hot Tags
**Interface Address**: `GET /api/tags/hot`
**Authentication Required**: No

**Request Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|------------|
| limit | int | No | Number of items to return, default 10 |

**Response Example**:
```json
{
  "code": 200,
  "message": "success",
  "data": [
    // Hot tags data
  ]
}

```json
{
  "code": 200,
  "message": "success",
  "data": [
    {
      "id": 1,
      "name": "Photography",
      "description": "Photography-related content",
      "use_count": 150,
      "created_at": "2025-08-30T00:00:00.000Z"
    }
  ]
}
---

## Statistical Interfaces

### 1. Obtain System Statistical Information
**Interface Address**: `GET /api/stats`
**Authentication Required**: No

**Response Example**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    // Statistical data
  }
}
```

{
  "code": 200,
  "message": "Successfully obtained statistical information",
  "data": {
    "users": 1250,
    "posts": 3420,
    "comments": 8750,
    "likes": 15600
  }
}
---

## Health Check Interface

### 1. Health Check
**Interface Address**: `GET /api/health`
**Authentication Required**: No

**Response Example**:
```json
{
  "code": 200,
  "message": "OK",
  "timestamp": "2025-01-15T10:30:00.000Z",
  "uptime": 3600.5
}
```

---

## Search Related Interfaces

### 1. General Search
**Interface Address**: `GET /api/search`
**Authentication Required**: No (optional)

**Request Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| keyword | string | No | Search keyword |
| tag | string | No | Tag search |
| type | string | No | Search type: all (default), posts, users |
| page | int | No | Page number, default 1 |
| limit | int | No | Number of items per page, default 20 |

**Response Example**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "keyword": "Life",
    "tag": "",
    "type": "all",
    "data": {
      "posts": [
        {
          "id": 1,
          "title": "Life Diary",
          "content": "Today's life is wonderful",
          "author_id": 1,
          "author_name": "Zhang San",
          "author_avatar": "https://img.example.com/avatar1.jpg",
          "created_at": "2025-08-30T00:00:00.000Z",
          "likes_count": 10,
          "comments_count": 5,
          "is_liked": false,
          "is_favorited": false
        }
      ],
      "users": [
        {
          "id": 1,
          "username": "Zhang San",
          "nickname": "Xiao Zhang",
          "avatar": "https://img.example.com/avatar1.jpg",
          "bio": "Loves life",
          "is_following": false
        }
      ]
    },
    "tagStats": [
      {
        "name": "Life",
        "count": 50
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 100,
      "totalPages": 5
    }
  }
}
```

---

## Statistical Interfaces

### 1. Obtain Statistical Data
**Interface Address**: `GET /api/stats`

**Response Example**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "users": 1000,
    "posts": 5000,
    "comments": 10000,
    "likes": 20000
  }
}
```

## Error Code Explanation

| Error Code | Description |
|-----------|-------------|
| 400 | Request parameter error |
| 404 | Resource not found |
| 500 | Server internal error |

## Usage Examples

### Using curl to Test Interface

```bash
# User Registration
curl -X POST "http://localhost:3001/api/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "test_user",
    "nickname": "Test User",
    "password": "123456"
  }'

# User Login
curl -X POST "http://localhost:3001/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "test_user",
    "password": "123456"
  }'

# Get Current User Information (requires authentication)
curl -X GET "http://localhost:3001/api/auth/me" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# Get User List
curl -X GET "http://localhost:3001/api/users?page=1&limit=10"

# Get Post Details
curl -X GET "http://localhost:3001/api/posts/1"

# Create Post (requires authentication)
curl -X POST "http://localhost:3001/api/posts" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "Test Post",
    "content": "This is test content",
    "category_id": 1
  }'

# Create Comment (requires authentication)
curl -X POST "http://localhost:3001/api/comments" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "post_id": 1,
    "content": "This is a test comment"
  }'

# Like Post (requires authentication)
curl -X POST "http://localhost:3001/api/posts/1/like" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# Collect Post (requires authentication)
curl -X POST "http://localhost:3001/api/posts/1/collect" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# Follow User (requires authentication)
curl -X POST "http://localhost:3001/api/users/2/follow" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# Upload Single File (requires authentication)
curl -X POST "http://localhost:3001/api/upload/single" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "file=@/path/to/your/image.jpg"

# Get Notifications (requires authentication)
curl -X GET "http://localhost:3001/api/notifications/comments" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# Search Posts
curl -X GET "http://localhost:3001/api/search?keyword=life"
```

```javascript
// Set base URL and token
const API_BASE = 'http://localhost:3001';
let authToken = localStorage.getItem('auth_token');

// General request function
async function apiRequest(url, options = {}) {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    ...options
  };
  
  if (authToken && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  
  const response = await fetch(`${API_BASE}${url}`, config);
  return response.json();
}
```

// User registration
async function register() {
  const result = await apiRequest('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({
      user_id: 'test_user',
      nickname: 'Test User',
      password: '123456'
    })
  });
  
  if (result.code === 200) {
    authToken = result.data.tokens.access_token;
    localStorage.setItem('auth_token', authToken);
  }
  
  return result;
}

// User login
async function login() {
  const result = await apiRequest('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({
      user_id: 'test_user',
      password: '123456'
    })
  });
  
  if (result.code === 200) {
    authToken = result.data.tokens.access_token;
    localStorage.setItem('auth_token', authToken);
  }
  
  return result;
}

// Get current user information
async function getCurrentUser() {
  return await apiRequest('/api/auth/me');
}

// Get note list
async function getPosts(page = 1, limit = 10) {
  return await apiRequest(`/api/posts?page=${page}&limit=${limit}`);
}

// Create a note
async function createPost(postData) {
  return await apiRequest('/api/posts', {
    method: 'POST',
    body: JSON.stringify(postData)
  });
}

// Like a note
async function likePost(postId) {
  return await apiRequest(`/api/posts/${postId}/like`, {
    method: 'POST'
  });
}

// Collect a note
async function collectPost(postId) {
  return await apiRequest(`/api/posts/${postId}/collect`, {
    method: 'POST'
  });
}

// Follow a user
async function followUser(userId) {
  return await apiRequest(`/api/users/${userId}/follow`, {
    method: 'POST'
  });
}

// Upload a file
async function uploadFile(file) {
  const formData = new FormData();
  formData.append('file', file);
  
  return await apiRequest('/api/upload/single', {
    method: 'POST',
    headers: {
      // Do not set Content-Type, let the browser automatically set multipart/form-data
      Authorization: `Bearer ${authToken}`
    },
    body: formData
  });
}

// Get notifications
async function getNotifications(type = 'comments', page = 1) {
  return await apiRequest(`/api/notifications/${type}?page=${page}`);
}

// Example usage
async function example() {
  try {
    // Login
    const loginResult = await login();
    console.log('Login result:', loginResult);
    
    // Get note list
    const posts = await getPosts();
    console.log('Note list:', posts);
    
    // Create a note
```

```javascript
    const newPost = await createPost({
      title: 'Test Note',
      content: 'This is test content',
      category_id: 1
    });
    console.log('Create note result:', newPost);
    
    // Like note
    if (posts.data.posts.length > 0) {
      const likeResult = await likePost(posts.data.posts[0].id);
      console.log('Like result:', likeResult);
    }
    
  } catch (error) {
    console.error('API call error:', error);
  }
}

---

## Important Notes

1. **Authentication Requirement**: Interfaces requiring authentication must include a valid JWT token in the request header.
2. **Token Management**: The stored token is valid for 1 hour, and the refresh token is valid for 7 days.
3. **Request Format**: All POST/PUT requests need to set `Content-Type: application/json` (except for file uploads).
4. **Image Upload**: The image upload interface uses `multipart/form-data` format, supporting jpg, jpeg, png, gif, and webp formats, with a maximum single image size of 5MB.
5. **Status Switching**: Operations like liking, favoriting, and following support status switching (cancel like if already liked).
6. **Automatic Update**: Accessing note details will automatically increase the view count, and creating comments will automatically update the number of comments on the note.
7. **Relationship Update**: The follow operation will automatically update the user's number of followers and fans.
8. **Search Function**: The search function supports fuzzy matching of titles and content.
9. **Notification System**: Operations like comments, likes, and follows will automatically generate notifications.
10. **Data Validation**: When registering, the user ID uniqueness and password strength (6-20 characters) will be verified.

---

## Admin-related Interfaces

### Authentication Instructions
Admin interfaces use JWT authentication:
- Admins need to log in through the login interface to obtain the JWT token.
- In subsequent requests, include `Authorization: Bearer <token>` in the request header.

### 1. Admin Login
**API Endpoint**: `POST /api/auth/admin/login`

**Request Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|------------|
| username | string | Yes | Admin username |
| password | string | Yes | Admin password |

**Response Example**:
```
{
  "code": 200,
  "message": "Login successful",
  "data": {
    "admin": {
      "id": 1,
      "username": "admin"
    },
    "tokens": {
      "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "expires_in": 3600
    }
  }
}
```

### 2. Retrieve Current Administrator Information
**API Endpoint**: `GET /api/auth/admin/me`
**Authentication Required**: Yes (JWT)

**Response Example**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "id": 1,
    "username": "admin"
  }
}
```

### 3. User Management

#### 3.1 Retrieve User List
**API Endpoint**: `GET /api/admin/users`
**Authentication Required**: Yes

**Request Parameters**:
| Parameter | Content Type | Required | Description |
|-----------|--------------|----------|-------------|
| page | int | No | Page number, default 1 |
| limit | int | No | Number of items per page, default 20 |
| user_display_id | string | No | Little Peach ID search |
| nickname | string | No | Nickname search |
| status | int | No | Status filter (1=Active, 0=Disabled) |
| sortField | string | No | Sort field (id, fans_count, like_count, created_at) |
| sortOrder | string | No | Sort order (ASC, DESC) |

#### 3.2 Create User
**API Endpoint**: `POST /api/admin/users`
**Authentication Required**: Yes

**Request Parameters**:
| Parameter | Content Type | Required | Description |
|-----------|--------------|----------|-------------|
| user_id | string | Yes | User ID |
| nickname | string | Yes | Nickname |
| password | string | Yes | Password |
| avatar | string | No | Avatar URL |
| bio | string | No | Personal introduction |
| location | string | No | Location |

#### 3.3 Update User
**API Endpoint**: `PUT /api/admin/users/:id`
**Authentication Required**: Yes

#### 3.4 Delete User
**API Endpoint**: `DELETE /api/admin/users/:id`
**Authentication Required**: Yes

#### 3.5 Batch Delete Users
**API Endpoint**: `DELETE /api/admin/users`
**Authentication Required**: Yes

**Request Parameters**:
| Parameter | Content Type | Required | Description |
|-----------|--------------|----------|-------------|
| ids | array | Yes | Array of User IDs |

### 4. Record Management

#### 4.1 Retrieve Record List
**API Endpoint**: `GET /api/admin/posts`
**Authentication Required**: Yes

**Request Parameters**:
| Parameter | Content Type | Required | Description |
|-----------|--------------|----------|-------------|
| page | int | No | Page number, default 1 |
| limit | int | No | Number of items per page, default 20 |
| title | string | No | Title search |
| user_display_id | string | No | Author Little Peach ID filter |
| category_id | int | No | Category ID filter |
| sortField | string | No | Sort field (id, view_count, like_count, collect_count, comment_count, created_at) |
| sortOrder | string | No | Sort order (ASC, DESC) |

#### 4.2 Create Record
**API Endpoint**: `POST /api/admin/posts`
**Authentication Required**: Yes

#### 4.3 Update Record
**API Endpoint**: `PUT /api/admin/posts/:id`
**Authentication Required**: Yes

#### 4.4 Delete Record
**API Endpoint**: `DELETE /api/admin/posts/:id`
**Authentication Required**: Yes

#### 4.5 Batch Delete Records
**API Endpoint**: `DELETE /api/admin/posts`
**Authentication Required**: Yes

### 5. Comment Management

#### 5.1 Obtain Comment List
**Interface Location**: `GET /api/admin/comments`
**Authentication Required**: Yes

**Request Parameters**:
| Parameter | Content Type | Required | Description |
|-----------|--------------|----------|-------------|
| page | int | No | Page number, default 1 |
| limit | int | No | Number of items per page, default 20 |
| content | string | No | Content search |
| user_display_id | string | No | Filter by comment author's nickname |
| post_id | int | No | Filter by post ID |
| sortField | string | No | Sorting field (id, like_count, created_at) |
| sortOrder | string | No | Sorting direction (ASC, DESC) |

#### 5.2 Create Comment

**Interface Location**: `POST /api/admin/comments`
**Authentication Required**: Yes

**Request Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| content | string | Yes | Comment content |
| user_id | int | Yes | Commenter ID |
| post_id | int | Yes | Post ID |
| parent_id | int | No | Parent comment ID (used when replying to a comment) |

#### 5.3 Update Comment
**Interface Location**: `PUT /api/admin/comments/:id`
**Authentication Required**: Yes

**Request Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| content | string | No | Comment content |

#### 5.4 Delete Comment
**Interface Location**: `DELETE /api/admin/comments/:id`
**Authentication Required**: Yes

#### 5.5 Batch Delete Comments
**Interface Location**: `DELETE /api/admin/comments`
**Authentication Required**: Yes

**Request Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| ids | array | Yes | Array of comment IDs |

#### 5.6 Get Single Comment Details
**Interface Location**: `GET /api/admin/comments/:id`
**Authentication Required**: Yes

### 6. Tag Management

#### 6.1 Get Tag List
**Interface Location**: `GET /api/admin/tags`
**Authentication Required**: Yes

**Request Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| page | int | No | Page number, default 1 |
| limit | int | No | Number of items per page, default 20 |
| name | string | No | Tag name search |
| sortField | string | No | Sorting field (id, use_count, created_at) |
| sortOrder | string | No | Sorting direction (ASC, DESC) |

#### 6.2 Create Tag
**Interface Location**: `POST /api/admin/tags`
**Authentication Required**: Yes

**Request Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| name | string | Yes | Tag name |
| description | string | No | Tag description |

#### 6.3 Update Tag
**Interface Location**: `PUT /api/admin/tags/:id`
**Authentication Required**: Yes

**Request Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| name | string | No | Tag name |
| description | string | No | Tag description |

#### 6.4 Delete Tag
**Interface Location**: `DELETE /api/admin/tags/:id`
**Authentication Required**: Yes

#### 6.5 Batch Delete Tags
**Interface Location**: `DELETE /api/admin/tags`
**Authentication Required**: Yes

**Request Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| ids | array | Yes | Array of tag IDs |

#### 6.6 Get Single Tag Details
**Interface Location**: `GET /api/admin/tags/:id`
**Authentication Required**: Yes

### 7. Prize Management

#### 7.1 Get Prize List
**Interface Location**: `GET /api/admin/likes`
**Authentication Required**: Yes

**Request Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| page | int | No | Page number, default 1 |
| limit | int | No | Number of items per page, default 20 |
| user_display_id | string | No | User display ID filter |
| target_type | int | No | Target type (1=Note, 2=Comment) |
| sortField | string | No | Sorting field (id, user_id, created_at) |
| sortOrder | string | No | Sorting direction (ASC, DESC) |

#### 7.2 Create Prize

**Interface Location**: `POST /api/admin/likes`

**Need Verification**: Yes

**Request Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| user_id | int | Yes | User ID |
| target_id | int | Yes | Target ID (note ID or comment ID) |
| target_type | int | Yes | Target Type (1=Note, 2=Comment) |

#### 7.3 Update Like
**API Endpoint**: `PUT /api/admin/likes/:id`
**Need Verification**: Yes

**Request Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| target_type | int | No | Target Type (1=Note, 2=Comment) |

#### 7.4 Delete Like
**API Endpoint**: `DELETE /api/admin/likes/:id`
**Need Verification**: Yes

#### 7.5 Batch Delete Likes
**API Endpoint**: `DELETE /api/admin/likes`
**Need Verification**: Yes

**Request Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| ids | array | Yes | Array of Like IDs |

#### 7.6 Get Single Like Detail
**API Endpoint**: `GET /api/admin/likes/:id`
**Need Verification**: Yes

### 8. Collection Management

#### 8.1 Get Collection List
**API Endpoint**: `GET /api/admin/collections`
**Need Verification**: Yes

**Request Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| page | int | No | Page number, default 1 |
| limit | int | No | Number of items per page, default 20 |
| user_display_id | string | No | Filter by user's small peach ID |
| sortBy | string | No | Sorting field (id, user_id, created_at) |
| sortOrder | string | No | Sorting direction (ASC, DESC) |

#### 8.2 Create Collection
**API Endpoint**: `POST /api/admin/collections`
**Need Verification**: Yes

#### 8.3 Delete Collection
**API Endpoint**: `DELETE /api/admin/collections/:id`
**Need Verification**: Yes

#### 8.4 Batch Delete Collections
**API Endpoint**: `DELETE /api/admin/collections`
**Need Verification**: Yes

### 9. Follow Management

#### 9.1 Get Follow List
**API Endpoint**: `GET /api/admin/follows`
**Need Verification**: Yes

**Request Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| page | int | No | Page number, default 1 |
| limit | int | No | Number of items per page, default 20 |
| user_display_id | string | No | Filter by user's small peach ID |
| sortField | string | No | Sorting field (id, follower_id, following_id, created_at) |
| sortOrder | string | No | Sorting direction (ASC, DESC) |

#### 9.2 Create Follow Relationship
**API Endpoint**: `POST /api/admin/follows`
**Need Verification**: Yes

#### 9.3 Delete Follow Relationship
**API Endpoint**: `DELETE /api/admin/follows/:id`
**Need Verification**: Yes

#### 9.4 Batch Delete Follow Relationships
**API Endpoint**: `DELETE /api/admin/follows`
**Need Verification**: Yes

### 10. Notification Management

#### 10.1 Get Notification List
**API Endpoint**: `GET /api/admin/notifications`

**Need Verification**: Yes

**Request Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| page | int | No | Page number, default 1 |
| limit | int | No | Number of items per page, default 20 |
| user_display_id | string | No | Filter by user's small peach ID |
| type | string | No | Filter by notification type |
| is_read | int | No | Read status (0=Unread, 1=Read) |
| Sorting Field | String | No | Sorting Field (id, created_at) |
|---------------|--------|----|--------------------------------|
| Sorting Direction | String | No | Sorting Direction (ASC, DESC) |

#### 10.2 Create Notification
**Interface Location**: `POST /api/admin/notifications`
**Authentication Required**: Yes

#### 10.3 Update Notification
**Interface Location**: `PUT /api/admin/notifications/:id`
**Authentication Required**: Yes

#### 10.4 Delete Notification
**Interface Location**: `DELETE /api/admin/notifications/:id`
**Authentication Required**: Yes

#### 10.5 Batch Delete Notifications
**Interface Location**: `DELETE /api/admin/notifications`
**Authentication Required**: Yes

### 11. Session Management

#### 11.1 Get Session List
**Interface Location**: `GET /api/admin/sessions`
**Authentication Required**: Yes

**Request Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|------------|
| page | int | No | Page number, default 1 |
| limit | int | No | Number of items per page, default 20 |
| user_display_id | string | No | User display ID filter |
| is_active | int | No | Active status (0=Inactive, 1=Active) |
| sortField | string | No | Sorting Field (id, is_active, expires_at, created_at) |
| sortOrder | string | No | Sorting Direction (ASC, DESC) |

#### 11.2 Create Session
**Interface Location**: `POST /api/admin/sessions`
**Authentication Required**: Yes

#### 11.3 Update Session
**Interface Location**: `PUT /api/admin/sessions/:id`
**Authentication Required**: Yes

#### 11.4 Delete Session
**Interface Location**: `DELETE /api/admin/sessions/:id`
**Authentication Required**: Yes

#### 11.5 Batch Delete Sessions
**Interface Location**: `DELETE /api/admin/sessions`
**Authentication Required**: Yes

### 12. Administrator Management

#### 12.1 Test Interface
**Interface Location**: `GET /api/admin/test-users`
**Authentication Required**: Yes

**Description**: Temporary test interface, used for checking user data

**Response Example**:
```json
{
  "code": 200,
  "data": [
    {
      "id": 1,
      "user_id": "user_001",
      "nickname": "Test User"
    }
  ]
}
```

#### 12.2 Retrieve Administrator List
**API Endpoint**: `GET /api/admin/admins` or `GET /api/auth/admin/admins`
**Authentication Required**: Yes

**Request Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| page | int | No | Page number, default 1 |
| limit | int | No | Number of items per page, default 20 |
| username | string | No | Username search |
| sortField | string | No | Sorting field (username, created_at) |
| sortOrder | string | No | Sorting direction (ASC, DESC) |

#### 12.2 Create Administrator
**API Endpoint**: `POST /api/admin/admins` or `POST /api/auth/admin/admins`
**Authentication Required**: Yes

**Request Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| username | string | Yes | Administrator username |
| password | string | Yes | Administrator password |

#### 12.3 Update Administrator
**API Endpoint**: `PUT /api/admin/admins/:id` or `PUT /api/auth/admin/admins/:id`
**Authentication Required**: Yes

#### 12.4 Delete Administrator
**API Endpoint**: `DELETE /api/admin/admins/:id` or `DELETE /api/auth/admin/admins/:id`
**Authentication Required**: Yes

#### 12.5 Bulk Delete Administrators
**API Endpoint**: `DELETE /api/admin/admins` or `DELETE /api/auth/admin/admins`
**Authentication Required**: Yes

#### 12.6 Modify Administrator Password
**API Endpoint**: `PUT /api/auth/admin/admins/:id/password`
**Authentication Required**: Yes (JWT)

#### 12.7 Modify Administrator Status
**API Endpoint**: `PUT /api/auth/admin/admins/:id/status`
**Authentication Required**: Yes (JWT)

### 13. Monitoring Management

#### 13.1 Retrieve System Activity Monitoring
**API Endpoint**: `GET /api/admin/monitor/activities`
**Authentication Required**: Yes

**Request Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| page | int | No | Page number, default 1 |
| limit | int | No | Number of items per page, default 20 |
| date_from | string | No | Start date (YYYY-MM-DD) |
| date_to | string | No | End date (YYYY-MM-DD) |
| activity_type | string | No | Activity type filter |

**Response Example**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "activities": [
      {
        "date": "2025-01-15",
        "new_users": 25,
        "new_posts": 120,
        "new_comments": 350,
        "new_likes": 890
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 30,
      "pages": 2
    }
  }
}
```

### Example Usage of Administrator APIs

```bash
# Administrator Login
curl -X POST "http://localhost:3001/api/auth/admin/login" \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "123456"}'

# Retrieve User List
curl -X GET "http://localhost:3001/api/admin/users?page=1&limit=10" \
  -H "Authorization: Bearer YOUR_ADMIN_JWT_TOKEN"

# Retrieve Administrator Information
curl -X GET "http://localhost:3001/api/auth/admin/me" \
  -H "Authorization: Bearer YOUR_ADMIN_JWT_TOKEN"

# User Creation
```bash
curl -X POST "http://localhost:3001/api/admin/users" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_JWT_TOKEN" \
  -d '{"user_id": "test_user", "nickname": "Test User", "password": "123456"}'

# Note Deletion
curl -X DELETE "http://localhost:3001/api/admin/posts/1" \
  -H "Authorization: Bearer YOUR_ADMIN_JWT_TOKEN"

# Bulk Comment Deletion
curl -X DELETE "http://localhost:3001/api/admin/comments" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_JWT_TOKEN" \
  -d '{"ids": [1, 2, 3]}'
```
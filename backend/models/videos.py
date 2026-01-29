def video_schema(title, description, youtube_id, thumbnail_url, is_active=True):
    """
    Defines the structure of a Video document
    """
    return {
        "title": title,
        "description": description,
        "youtube_id": youtube_id,
        "thumbnail_url": thumbnail_url,
        "is_active": is_active
    }

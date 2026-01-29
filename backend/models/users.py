from datetime import datetime

def user_schema(name, email, password_hash):
    """
    Defines the structure of a User document
    """
    return {
        "name": name,
        "email": email,
        "password": password_hash,   # bcrypt hash
        "created_at": datetime.utcnow()
    }



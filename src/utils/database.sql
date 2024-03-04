Create Table users (
    id integer primary key,
    name Text Not Null,
    password Text Not Null,
    permission TEXT Not Null
);
Create Table tokens (
    token text primary key,
    generate_time Timestamp DEFAULT CURRENT_TIMESTAMP,
    expired_time Timestamp,
    owner Integer References users(id)
);
Create Table categories (
    name Text primary key
);
Create Table get_token (
    user_id Integer References users(Id),
    token Text,
    primary key (user_Id, token)
);
Create Table posts (
    id Integer primary key,
    title Text not null,
    banner Text,
    content Text,
    des Text,
    author Integer not null references users(Id),
    is_draft Boolean not null,
    publish_time Timestamp Default CURRENT_TIMESTAMP
);
Create Table have_tag (
    post_id Integer,
    name Text not null,
    primary key (name, post_id)
);
CREATE OR REPLACE VIEW getTags AS 
    SELECT STRING_AGG(name, ',') as tags, post_id
    FROM have_tag GROUP BY post_id;
CREATE OR REPLACE VIEW getPosts AS 
    SELECT p.id as post_id, title, banner, content, des, author, is_draft, publish_time, tags, name as author_name  FROM posts p LEFT JOIN getTags g ON g.post_id = p.Id LEFT JOIN users u ON u.id = p.author; 
CREATE OR REPLACE FUNCTION getPostsWithPattern(pattern TEXT) 
RETURNS SETOF getPosts AS 
$$
BEGIN 
    RETURN QUERY
    SELECT * FROM getPosts g
    WHERE g.title ~* pattern;
END;
$$ LANGUAGE plpgsql;
CREATE OR REPLACE FUNCTION getPostsWithTag(tagPattern TEXT) 
RETURNS SETOF getPosts AS 
$$
BEGIN 
    RETURN QUERY
    SELECT * FROM getPosts g
    WHERE g.tags ~* tagPattern;
END;
$$ LANGUAGE plpgsql;

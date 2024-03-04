--
-- PostgreSQL database dump
--

-- Dumped from database version 14.10 (Ubuntu 14.10-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.10 (Ubuntu 14.10-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: have_tag; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.have_tag (
    post_id integer NOT NULL,
    name text NOT NULL
);


ALTER TABLE public.have_tag OWNER TO postgres;

--
-- Name: gettags; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.gettags AS
 SELECT string_agg(have_tag.name, ','::text) AS tags,
    have_tag.post_id
   FROM public.have_tag
  GROUP BY have_tag.post_id;


ALTER TABLE public.gettags OWNER TO postgres;

--
-- Name: posts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.posts (
    id integer NOT NULL,
    title text NOT NULL,
    banner text,
    content text DEFAULT ''::text,
    des text DEFAULT ''::text,
    author integer NOT NULL,
    is_draft boolean NOT NULL,
    publish_time timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.posts OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name text NOT NULL,
    password text NOT NULL,
    permission text NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: getposts; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.getposts AS
 SELECT p.id AS post_id,
    p.title,
    p.banner,
    p.content,
    p.des,
    p.author,
    p.is_draft,
    p.publish_time,
    g.tags,
    u.name AS author_name
   FROM ((public.posts p
     LEFT JOIN public.gettags g ON ((g.post_id = p.id)))
     LEFT JOIN public.users u ON ((u.id = p.author)));


ALTER TABLE public.getposts OWNER TO postgres;

--
-- Name: getpostswithpattern(text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.getpostswithpattern(pattern text) RETURNS SETOF public.getposts
    LANGUAGE plpgsql
    AS $$
BEGIN 
    RETURN QUERY
    SELECT * FROM getPosts g
    WHERE g.title ~* pattern;
END;
$$;


ALTER FUNCTION public.getpostswithpattern(pattern text) OWNER TO postgres;

--
-- Name: getpostswithtag(text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.getpostswithtag(tagpattern text) RETURNS SETOF public.getposts
    LANGUAGE plpgsql
    AS $$
BEGIN 
    RETURN QUERY
    SELECT * FROM getPosts g
    WHERE g.tags ~* tagPattern;
END;
$$;


ALTER FUNCTION public.getpostswithtag(tagpattern text) OWNER TO postgres;

--
-- Name: categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categories (
    name text NOT NULL
);


ALTER TABLE public.categories OWNER TO postgres;

--
-- Name: get_token; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.get_token (
    user_id integer NOT NULL,
    token text NOT NULL
);


ALTER TABLE public.get_token OWNER TO postgres;

--
-- Name: tokens; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tokens (
    token text NOT NULL,
    generate_time timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    expired_time timestamp without time zone,
    owner integer
);


ALTER TABLE public.tokens OWNER TO postgres;

--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.categories (name) FROM stdin;
\.


--
-- Data for Name: get_token; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.get_token (user_id, token) FROM stdin;
\.


--
-- Data for Name: have_tag; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.have_tag (post_id, name) FROM stdin;
782076615	new
782076615	old
4	a
\.


--
-- Data for Name: posts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.posts (id, title, banner, content, des, author, is_draft, publish_time) FROM stdin;
782076615	title1	content1	/	Description	344071873	f	2024-02-11 01:00:21.369
\.


--
-- Data for Name: tokens; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tokens (token, generate_time, expired_time, owner) FROM stdin;
f73591fd-4586-429c-bef0-17e2cd5c49ed	2024-02-11 01:00:21.365	2024-02-11 01:30:21.365	344071873
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, password, permission) FROM stdin;
344071873	1	2	3
\.


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (name);


--
-- Name: get_token get_token_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.get_token
    ADD CONSTRAINT get_token_pkey PRIMARY KEY (user_id, token);


--
-- Name: have_tag have_tag_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.have_tag
    ADD CONSTRAINT have_tag_pkey PRIMARY KEY (name, post_id);


--
-- Name: posts posts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (id);


--
-- Name: tokens tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tokens
    ADD CONSTRAINT tokens_pkey PRIMARY KEY (token);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: get_token get_token_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.get_token
    ADD CONSTRAINT get_token_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: posts posts_author_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_author_fkey FOREIGN KEY (author) REFERENCES public.users(id);


--
-- Name: tokens tokens_owner_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tokens
    ADD CONSTRAINT tokens_owner_fkey FOREIGN KEY (owner) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--


insert into app.users (email, name, phone)
select 'user' || t || '@example.com', 'User' || t, (79999999999 - t)::text
  from generate_series(0, 10) t;

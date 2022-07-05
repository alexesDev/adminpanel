-- migrate:up

create type app.gender as enum (
  'male',
  'female',
  'other'
);

create table app.users (
  id serial primary key,
  email text not null,
  name text,
  phone text,
  sex app.gender,

  constraint proper_email check (email ~* '^[A-Za-z0-9._+%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$')
);

-- migrate:down

drop table app.users;
drop type app.gender;

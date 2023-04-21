create database remixtodos;
create user 'remix'@localhost identified by 'test';
grant all privileges on remixtodos.* to remix@'%';
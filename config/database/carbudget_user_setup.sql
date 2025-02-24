create user 'carbudgetuser'@'10.0.0.%' identified by 'your_password';
grant select on *.* to 'carbudgetuser'@'10.0.0.%';
grant select, insert, update, delete on carbudget.* to 'carbudgetuser'@'10.0.0.%';
flush privileges;
create user 'carbudgetuser'@'localhost' identified by 'your_password';
grant select on *.* to 'carbudgetuser'@'localhost';
grant select, insert, update, delete on carbudget.* to 'carbudgetuser'@'localhost';
flush privileges;

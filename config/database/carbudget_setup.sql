
create database carbudget;
use carbudget;

drop view if exists `v_tools_in_stock`;
drop view if exists `v_parts_in_stock`;
drop table if exists `parts_for_task`;
drop table if exists `inventory`;
drop table if exists `partorders`;
drop table if exists `tasks`;
drop table if exists `task_sub_assemblies`;
drop table if exists `project_sub_assemblies`;
drop table if exists `photo_library`;
drop table if exists `subassemblies`;
drop table if exists `parts`;
drop table if exists `vendors`;
drop table if exists `States`;
drop table if exists `photos`;
drop table if exists `projects`;
drop table if exists `cars`;
drop table if exists `users`;
drop table if exists `countries`;

create table Countrys (
	id int auto_increment primary key,
	name varchar(40) not null
) engine = InnoDB;

create table Users (
    id int auto_increment primary key,
    first_name varchar(40) not null,
    last_name varchar(40) not null,
    creation_date datetime not null default now(),
    email varchar(40) not null,
    password varchar(256),
    deleted tinyint(1) not null default 0
) engine = InnoDB;

create table Cars (
	id int auto_increment primary key,
	make varchar(20) not null,
	model varchar(20) not null,
	color varchar(20) not null,
	year int not null,
	deleted tinyint(1) not null default 0
) engine = InnoDB;

create table Projects (
	id int auto_increment primary key,
    user int not null,
    foreign key fk_user(user) references Users(id),
	name varchar(40) not null,
	description varchar(1000),
	start_date date not null,
	end_date date not null,
	starting_budget decimal (7,2), 
	car_id int not null,
	foreign key fk_car(car_id) references Cars(id),
	deleted tinyint(1) not null default 0 
) engine = InnoDB;

create table Photos (
	id int auto_increment primary key,
	description varchar(40),
	photo blob not null
) engine = InnoDB;

create table States (
	postal_code varchar(2) primary key,
	state varchar(20) not null
) engine = InnoDB;

insert into States (postal_code, state) values ('AL', 'Alabama');
insert into States (postal_code, state) values ('AK', 'Alaska');
insert into States (postal_code, state) values ('AS', 'American Samoa');
insert into States (postal_code, state) values ('AZ', 'Arizona');
insert into States (postal_code, state) values ('AR', 'Arkansas');
insert into States (postal_code, state) values ('CA', 'California');
insert into States (postal_code, state) values ('CO', 'Colorado');
insert into States (postal_code, state) values ('CT', 'Connecticut');
insert into States (postal_code, state) values ('DE', 'Delaware');
insert into States (postal_code, state) values ('DC', 'District of Columbia');
insert into States (postal_code, state) values ('FL', 'Florida');
insert into States (postal_code, state) values ('GA', 'Georgia');
insert into States (postal_code, state) values ('GU', 'Guam');
insert into States (postal_code, state) values ('HI', 'Hawaii');
insert into States (postal_code, state) values ('ID', 'Idaho');
insert into States (postal_code, state) values ('IL', 'Illinois');
insert into States (postal_code, state) values ('IN', 'Indiana');
insert into States (postal_code, state) values ('IA', 'Iowa');
insert into States (postal_code, state) values ('KS', 'Kansas');
insert into States (postal_code, state) values ('KY', 'Kentucky');
insert into States (postal_code, state) values ('LA', 'Louisiana');
insert into States (postal_code, state) values ('ME', 'Maine');
insert into States (postal_code, state) values ('MD', 'Maryland');
insert into States (postal_code, state) values ('MH', 'Marshall Islands');
insert into States (postal_code, state) values ('MA', 'Massachusetts');
insert into States (postal_code, state) values ('MI', 'Michigan');
insert into States (postal_code, state) values ('FM', 'Micronesia');
insert into States (postal_code, state) values ('MN', 'Minnesota');
insert into States (postal_code, state) values ('MS', 'Mississippi');
insert into States (postal_code, state) values ('MO', 'Missouri');
insert into States (postal_code, state) values ('MT', 'Montana');
insert into States (postal_code, state) values ('NE', 'Nebraska');
insert into States (postal_code, state) values ('NV', 'Nevada');
insert into States (postal_code, state) values ('NH', 'New Hampshire');
insert into States (postal_code, state) values ('NJ', 'New Jersey');
insert into States (postal_code, state) values ('NM', 'New Mexico');
insert into States (postal_code, state) values ('NY', 'New York');
insert into States (postal_code, state) values ('NC', 'North Carolina');
insert into States (postal_code, state) values ('ND', 'North Dakota');
insert into States (postal_code, state) values ('MP', 'Northern Marianas');
insert into States (postal_code, state) values ('OH', 'Ohio');
insert into States (postal_code, state) values ('OK', 'Oklahoma');
insert into States (postal_code, state) values ('OR', 'Oregon');
insert into States (postal_code, state) values ('PW', 'Palau');
insert into States (postal_code, state) values ('PA', 'Pennsylvania');
insert into States (postal_code, state) values ('PR', 'Puerto Rico');
insert into States (postal_code, state) values ('RI', 'Rhode Island');
insert into States (postal_code, state) values ('SC', 'South Carolina');
insert into States (postal_code, state) values ('SD', 'South Dakota');
insert into States (postal_code, state) values ('TN', 'Tennessee');
insert into States (postal_code, state) values ('TX', 'Texas');
insert into States (postal_code, state) values ('UT', 'Utah');
insert into States (postal_code, state) values ('VT', 'Vermont');
insert into States (postal_code, state) values ('VA', 'Virginia');
insert into States (postal_code, state) values ('VI', 'Virgin Islands');
insert into States (postal_code, state) values ('WA', 'Washington');
insert into States (postal_code, state) values ('WV', 'West Virginia');
insert into States (postal_code, state) values ('WI', 'Wisconsin');
insert into States (postal_code, state) values ('WY', 'Wyoming');

create table Vendors (
	id int auto_increment primary key,
	name varchar(40) not null,
	url varchar(255),
	address1 varchar(40),
	address2 varchar(40),
	city varchar(40),
	state varchar(2),
	foreign key fk_vendor_state(state) references States(postal_code),
	zipcode int,
	country varchar(40),
	deleted tinyint(1) not null default 0
) engine = InnoDB;

create table Parts (
	id int auto_increment primary key,
	name varchar(40) not null,
	description varchar(100),
	istool tinyint(1) not null default 0,
	photo varchar(255),
	deleted tinyint(1) not null default 0
) engine = InnoDB;

create table SubAssemblys (
	id int auto_increment primary key,
	sa_name varchar(20) not null, 
	deleted tinyint(1) not null default 0
) engine = InnoDB;


create table PhotoLibrarys (
	id int auto_increment primary key,
	project_id int not null,
	photo_id int not null,
	task_id int not null,
	foreign key fk_photo(photo_id) references Photos(id)
) engine = InnoDB;

create table TaskSubAssemblys (
	id int auto_increment primary key,
	task_id int not null,
	sub_id int not null,
	foreign key fk_task_sub(sub_id) references SubAssemblys(id)
) engine = InnoDB;

create table ProjectSubAssemblys (
	id int auto_increment primary key,
	project_id int not null,
	sub_assembly int not null,
	foreign key fk_sa_project(project_id) references Projects(id),
	foreign key fk_sa_sa(sub_assembly) references SubAssemblys(id),
	deleted tinyint(1) not null default 0
) engine = InnoDB;

create table Tasks (
	id int auto_increment primary key,
	project_id int not null,
	foreign key fk_project(project_id) references Projects(id),
	name varchar(40) not null,
	description varchar(1000),
	photo_library int,
	foreign key fk_task_photo(photo_library) references PhotoLibrarys(id),
	tag_sub_assemblies int,
	foreign key fk_task_tags(tag_sub_assemblies) references TaskSubAssemblys(id),
	deleted tinyint(1) not null default 0,
	completed tinyint(1) not null default 0,
	complete_date date 
) engine = InnoDB;

create table PartOrders (
	id int auto_increment primary key,
	request int not null,
	part_id int not null,
	foreign key fk_part_po(part_id) references Parts(id),
	unit_cost decimal(5,2) not null,
	quantity int not null default 1,
	vendor_id int,
	foreign key fk_vendor_part(vendor_id) references Vendors(id),
	order_date date not null,
	ship_date date,
	receive_date date,
	deleted tinyint(1) not null default 0 
) engine = InnoDB;


create table Inventorys (
	id int auto_increment primary key,
	po_id int not null,
	quantity int not null default 0,
	location varchar(30),
	deleted tinyint(1) not null default 0 
) engine = InnoDB;

create table PartsForTasks (
	id int auto_increment primary key,
	po_id int not null,
	foreign key fk_po_inv(po_id) references PartOrders(id),
	task_id int not null,
	foreign key fk_task_inv(task_id) references Tasks(id),
	quantity int not null default 1,
	deleted tinyint(1) not null default 0
) engine = InnoDB;

create table Procedures (
	id int auto_increment primary key,
    link varchar(300) not null,
    title varchar(40) not null,
    task_id int not null,
    foreign key fk_task_procedure(task_id) references Tasks(id)
) engine = InnoDB;

create or replace view ViewPartsInStocks as
	select i.id, p.name, i.quantity, i.location, i.deleted 
	from Inventorys as i 
	join PartOrders as po on po.id = i.po_id
	join Parts as p on  p.id = po.part_id
	where i.deleted = 0 and i.quantity > 0 and p.istool = 0;

create or replace view ViewToolsInStocks as
	select i.id, p.name, i.quantity, i.location, i.deleted 
	from Inventorys as i 
	join PartOrders as po on po.id = i.po_id
	join Parts as p on  p.id = po.part_id
	where i.deleted = 0 and i.quantity > 0 and p.istool = 1;
	
drop trigger if exists `update_inv_when_task_adds`;
delimiter |
create trigger update_inv_when_task_adds after insert on parts_for_task
	for each row
		begin
		DECLARE finished int DEFAULT 0;
		DECLARE poid INT DEFAULT
		|
		
	

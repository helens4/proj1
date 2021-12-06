create table products (
    id int, 
    name varchar(50),
    price int,
    on_sale boolean
)

create table restaurants (
    id bigserial not null primary key,
    name varchar(50) not null,
    location varchar(50) not null,
    price_range int not null check(price_range >= 1 and price_range <= 5)
);

create table reviews (
    id bigserial not null primary key, 
    name varchar(50) not null,
    review text not null,
    rating int not null check(rating >=1 and rating <= 5),
    restaurant_id bigint not null references restaurants(id)
);
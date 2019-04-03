 DROP TABLE Oder_Details;
 DROP TABLE products;
 DROP TABLE categories;
 DROP TABLE suppliers;
 DROP TABLE orders;
 DROP TABLE shippers;
 DROP TABLE employees;
 DROP TABLE customers;
 DROP TABLE image;

CREATE TABLE Image(
img_seq INT not null PRIMARY KEY auto_INCREMENT,
imgName VARCHAR(20),
imgExtention VARCHAR(20),
owner VARCHAR(20)
)auto_INCREMENT=1000 DEFAULT CHARSET=utf8;

CREATE TABLE Customers(
customer_id VARCHAR(15) PRIMARY KEY,
customer_name VARCHAR(15) NOT NULL, PASSWORD VARCHAR(15) NOT NULL,
phone VARCHAR(20) NOT NULL,
address VARCHAR(75) NOT NULL,
city VARCHAR(60) NOT NULL,
postal_code VARCHAR(15) NOT NULL,
ssn VARCHAR(15) NOT NULL,
photo VARCHAR(30) DEFAULT '1000'
)DEFAULT CHARSET=utf8;

CREATE TABLE Employees(
employee_id INT not null PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(15) NOT NULL,
manager VARCHAR(15) NOT NULL,
birth_date VARCHAR(15) NOT NULL,
photo VARCHAR(15),
notes VARCHAR(15)
)auto_INCREMENT=2000 DEFAULT CHARSET=utf8;

CREATE TABLE Shippers(
shipper_id VARCHAR(15) not null PRIMARY KEY,
shipper_name VARCHAR(15) NOT NULL,
phone VARCHAR(15)
)DEFAULT CHARSET=utf8;

CREATE TABLE Orders(
order_id INT not null PRIMARY KEY AUTO_INCREMENT,
customer_id VARCHAR(15) NOT NULL,
CONSTRAINT orders_fk_customers FOREIGN KEY(customer_id) REFERENCES Customers(customer_id) on delete cascade,
employee_id int NOT NULL,
CONSTRAINT orders_fk_employees FOREIGN KEY(employee_id) REFERENCES Employees(employee_id) on delete cascade,
oder_date DATETIME NOT NULL DEFAULT NOW(),
shipper_id VARCHAR(15) NOT NULL,
CONSTRAINT orders_fk_shippers FOREIGN KEY(shipper_id) REFERENCES Shippers(shipper_id) on delete cascade
)auto_INCREMENT=3000 DEFAULT CHARSET=utf8;

CREATE TABLE Suppliers(
supplier_id INT not null PRIMARY KEY AUTO_INCREMENT,
supplier_name VARCHAR(50) NOT NULL,
contact_name VARCHAR(50) NOT NULL,
address VARCHAR(50) NOT NULL,
city VARCHAR(50) NOT NULL,
postal_code VARCHAR(50) NOT NULL,
country VARCHAR(50) NOT NULL,
phone VARCHAR(50) NOT NULL
)auto_INCREMENT=4000 DEFAULT CHARSET=utf8;

CREATE TABLE Categories(
category_id INT PRIMARY KEY AUTO_INCREMENT,
category_name VARCHAR(15),
description VARCHAR(15)
)auto_INCREMENT=5000 DEFAULT CHARSET=utf8;

CREATE TABLE Products(
product_id INT PRIMARY KEY AUTO_INCREMENT,
product_name VARCHAR(30) NOT NULL,
supplier_id INT NOT NULL, CONSTRAINT products_fk_Suppliers FOREIGN KEY(supplier_id) REFERENCES Suppliers(supplier_id),
category_id INT, CONSTRAINT products_fk_Categories FOREIGN KEY(category_id) REFERENCES Categories(category_id),
unit VARCHAR(30) NOT NULL,
photo varchar(50) default '1001',
price INT DEFAULT 0
)auto_INCREMENT=6000 DEFAULT CHARSET=utf8;

CREATE TABLE Oder_Details(
order_detail_id INT PRIMARY KEY AUTO_INCREMENT,
order_id INT,
CONSTRAINT Oder_Details_fk_Orders FOREIGN KEY(order_id) REFERENCES Orders(order_id) on delete cascade,
product_id INT,
CONSTRAINT Oder_Details_fk_Products FOREIGN KEY(product_id) REFERENCES Products(product_id) on delete cascade,
quantity INT DEFAULT 0
)auto_INCREMENT=7000 DEFAULT CHARSET=utf8;
-- 카테고리 만드는곳
INSERT INTO Categories(CATEGORY_NAME,DESCRIPTION) VALUES('smartphone','핸드폰');
INSERT INTO Categories(CATEGORY_NAME,DESCRIPTION) VALUES('desktop','컴퓨터');
INSERT INTO Categories(CATEGORY_NAME,DESCRIPTION) VALUES('notebook','노트북');
-- 서플라이 만드는곳
INSERT INTO Suppliers(SUPPLIER_NAME,CONTACT_NAME,postal_code,ADDRESS,CITY,COUNTRY,PHONE) VALUES('samsung','이창준','12345','삼성로 129 ','경기도 수원시 영통구','대한민국','010-5899-1374');
INSERT INTO Suppliers(SUPPLIER_NAME,CONTACT_NAME,postal_code,ADDRESS,CITY,COUNTRY,PHONE) VALUES('apple','김태혁','12345','LA 12583-589 ','LA','미국','010-1254-5484');
INSERT INTO Suppliers(SUPPLIER_NAME,CONTACT_NAME,postal_code,ADDRESS,CITY,COUNTRY,PHONE) VALUES('lg','김창하','12345','강남대로 15 ','경기도 서울시 강남구','대한민국','010-6849-3658');
INSERT INTO Suppliers(SUPPLIER_NAME,CONTACT_NAME,postal_code,ADDRESS,CITY,COUNTRY,PHONE) VALUES('xiami','남기호','12345','bazing 15848-5842 ','베이징','중국','010-5423-2105');
-- 프로덕트 만드는곳
INSERT INTO Products(PRODUCT_NAME,SUPPLIER_ID,CATEGORY_ID,UNIT,PRICE) VALUES('갤럭시S10','4000','5000','1',1450000);
INSERT INTO Products(PRODUCT_NAME,SUPPLIER_ID,CATEGORY_ID,UNIT,PRICE) VALUES('갤럭시S9','4000','5000','1',1400000);
INSERT INTO Products(PRODUCT_NAME,SUPPLIER_ID,CATEGORY_ID,UNIT,PRICE) VALUES('갤럭시S8','4000','5000','1',1350000);
INSERT INTO Products(PRODUCT_NAME,SUPPLIER_ID,CATEGORY_ID,UNIT,PRICE) VALUES('갤럭시S7','4000','5000','1',1300000);
INSERT INTO Products(PRODUCT_NAME,SUPPLIER_ID,CATEGORY_ID,UNIT,PRICE) VALUES('갤럭시S6','4000','5000','1',1200000);
INSERT INTO Products(PRODUCT_NAME,SUPPLIER_ID,CATEGORY_ID,UNIT,PRICE) VALUES('갤럭시S5','4000','5000','1',1100000);
INSERT INTO Products(PRODUCT_NAME,SUPPLIER_ID,CATEGORY_ID,UNIT,PRICE) VALUES('갤럭시S4','4000','5000','1',1000000);
INSERT INTO Products(PRODUCT_NAME,SUPPLIER_ID,CATEGORY_ID,UNIT,PRICE) VALUES('갤럭시S3','4000','5000','1',950000);
INSERT INTO Products(PRODUCT_NAME,SUPPLIER_ID,CATEGORY_ID,UNIT,PRICE) VALUES('갤럭시S2','4000','5000','1',990000);
INSERT INTO Products(PRODUCT_NAME,SUPPLIER_ID,CATEGORY_ID,UNIT,PRICE) VALUES('갤럭시S1','4000','5000','1',900000);
INSERT INTO Products(PRODUCT_NAME,SUPPLIER_ID,CATEGORY_ID,UNIT,PRICE) VALUES('갤럭시노트10','4000','5000','1',1350000);
INSERT INTO Products(PRODUCT_NAME,SUPPLIER_ID,CATEGORY_ID,UNIT,PRICE) VALUES('갤럭시노트9','4000','5000','1',1120000);
INSERT INTO Products(PRODUCT_NAME,SUPPLIER_ID,CATEGORY_ID,UNIT,PRICE) VALUES('갤럭시노트8','4000','5000','1',1110000);
INSERT INTO Products(PRODUCT_NAME,SUPPLIER_ID,CATEGORY_ID,UNIT,PRICE) VALUES('갤럭시노트7','4000','5000','1',1000000);
INSERT INTO Products(PRODUCT_NAME,SUPPLIER_ID,CATEGORY_ID,UNIT,PRICE) VALUES('갤럭시노트6','4000','5000','1',1320000);
INSERT INTO Products(PRODUCT_NAME,SUPPLIER_ID,CATEGORY_ID,UNIT,PRICE) VALUES('갤럭시노트5','4000','5000','1',1200000);
INSERT INTO Products(PRODUCT_NAME,SUPPLIER_ID,CATEGORY_ID,UNIT,PRICE) VALUES('갤럭시노트4','4000','5000','1',890000);
INSERT INTO Products(PRODUCT_NAME,SUPPLIER_ID,CATEGORY_ID,UNIT,PRICE) VALUES('갤럭시노트3','4000','5000','1',980000);
INSERT INTO Products(PRODUCT_NAME,SUPPLIER_ID,CATEGORY_ID,UNIT,PRICE) VALUES('갤럭시노트2','4000','5000','1',900000);
INSERT INTO Products(PRODUCT_NAME,SUPPLIER_ID,CATEGORY_ID,UNIT,PRICE) VALUES('갤럭시노트1','4000','5000','1',950000);
INSERT INTO Products(PRODUCT_NAME,SUPPLIER_ID,CATEGORY_ID,UNIT,PRICE) VALUES('아이폰X','4001','5000','1',1500000);
INSERT INTO Products(PRODUCT_NAME,SUPPLIER_ID,CATEGORY_ID,UNIT,PRICE) VALUES('아이폰9','4001','5000','1',1340000);
INSERT INTO Products(PRODUCT_NAME,SUPPLIER_ID,CATEGORY_ID,UNIT,PRICE) VALUES('아이폰8','4001','5000','1',1350000);
INSERT INTO Products(PRODUCT_NAME,SUPPLIER_ID,CATEGORY_ID,UNIT,PRICE) VALUES('아이폰7','4001','5000','1',1250000);
INSERT INTO Products(PRODUCT_NAME,SUPPLIER_ID,CATEGORY_ID,UNIT,PRICE) VALUES('아이폰6','4001','5000','1',1220000);
INSERT INTO Products(PRODUCT_NAME,SUPPLIER_ID,CATEGORY_ID,UNIT,PRICE) VALUES('아이폰5','4001','5000','1',1350000);
INSERT INTO Products(PRODUCT_NAME,SUPPLIER_ID,CATEGORY_ID,UNIT,PRICE) VALUES('아이폰4','4001','5000','1',1200000);
INSERT INTO Products(PRODUCT_NAME,SUPPLIER_ID,CATEGORY_ID,UNIT,PRICE) VALUES('아이폰3','4001','5000','1',1100000);
INSERT INTO Products(PRODUCT_NAME,SUPPLIER_ID,CATEGORY_ID,UNIT,PRICE) VALUES('아이폰2','4001','5000','1',990000);
INSERT INTO Products(PRODUCT_NAME,SUPPLIER_ID,CATEGORY_ID,UNIT,PRICE) VALUES('아이폰1','4001','5000','1',1000000);
INSERT INTO Products(PRODUCT_NAME,SUPPLIER_ID,CATEGORY_ID,UNIT,PRICE) VALUES('G8','4002','5000','1',990000);
INSERT INTO Products(PRODUCT_NAME,SUPPLIER_ID,CATEGORY_ID,UNIT,PRICE) VALUES('G7','4002','5000','1',850000);
INSERT INTO Products(PRODUCT_NAME,SUPPLIER_ID,CATEGORY_ID,UNIT,PRICE) VALUES('G6','4002','5000','1',800000);
INSERT INTO Products(PRODUCT_NAME,SUPPLIER_ID,CATEGORY_ID,UNIT,PRICE) VALUES('G5','4002','5000','1',700000);

-- 이미지 디폴트 인설트한곳
INSERT INTO image(IMGNAME,IMGEXTENTION,OWNER) VALUES('default_img','png','default');

-- Customers 테이블
INSERT INTO customers(customer_id,customer_name, PASSWORD,city,address,postal_code,ssn,phone) VALUES('asa1374','이창준','1','경기도 파주시 파주읍','파주4리 497-16','10835','930605-1','010-5899-1374');
INSERT INTO customers(customer_id,customer_name, PASSWORD,city,address,postal_code,ssn,phone) VALUES('kim123','김민수','1','경기도 고양시 덕양구 화정동','장군빌딩 101호','10497','880607-1','010-1385-4883');
INSERT INTO customers(customer_id,customer_name, PASSWORD,city,address,postal_code,ssn,phone) VALUES('yous1','유준열','1','경기도 고양시 덕양구 화정동','고양프라자 203호','10477','921108-1','010-5449-5574');
INSERT INTO customers(customer_id,customer_name, PASSWORD,city,address,postal_code,ssn,phone) VALUES('ums123','엄미소','1','경기도 파주시 문산읍','한양수자인APT 101동 303호','10819','950208-2','010-5868-1573');
INSERT INTO customers(customer_id,customer_name, PASSWORD,city,address,postal_code,ssn,phone) VALUES('asd684','김다정','1','경기도 파주시 문산읍 통일로 96-10','장곡리 468-5','10941','980505-2','010-3843-1374');
INSERT INTO customers(customer_id,customer_name, PASSWORD,city,address,postal_code,ssn,phone) VALUES('tgb115','박가람','1','부산광역시 해운대구 해운대로 820','좌동 1491','48110','770707-2','010-8734-4983');
INSERT INTO customers(customer_id,customer_name, PASSWORD,city,address,postal_code,ssn,phone) VALUES('ekfu282','최재원','1','서울특별시 금천구 시흥대로 165','남서울 힐스APT101동302호','08637','990805-1','010-5481-3358');
INSERT INTO customers(customer_id,customer_name, PASSWORD,city,address,postal_code,ssn,phone) VALUES('wpov841','은지원','1','서울특별시 강남구 학동로68번길 29','힐스테이트 1단지 103동 404호','06090','050609-3','010-8284-1574');
INSERT INTO customers(customer_id,customer_name, PASSWORD,city,address,postal_code,ssn,phone) VALUES('wowo1','왕순희','1','서울특별시 은평구 불광로2길 33','힐스테이트 1차 105동 303호','03366','670808-2','010-3848-1774');
INSERT INTO customers(customer_id,customer_name, PASSWORD,city,address,postal_code,ssn,phone) VALUES('eo42','김대호','1','서울특별시 성동구 마조로1길 45','아파트 502호','04760','880105-1','010-3352-1732');
INSERT INTO customers(customer_id,customer_name, PASSWORD,city,address,postal_code,ssn,phone) VALUES('woyf356','신태용','1','서울특별시 광진구 자양로 304','동우아파트 407호','04956','940306-1','010-0354-1085');
INSERT INTO customers(customer_id,customer_name, PASSWORD,city,address,postal_code,ssn,phone) VALUES('bnh2','안중근','1','서울특별시 종로구 동숭4라길 29','동성아파트 203호','03085','970802-1','010-7775-2345');
INSERT INTO customers(customer_id,customer_name, PASSWORD,city,address,postal_code,ssn,phone) VALUES('rug65','박소리','1','서울특별시 용산구 이촌로65길 8','한가람아파트 704호','04422','950406-2','010-8543-9465');
INSERT INTO customers(customer_id,customer_name, PASSWORD,city,address,postal_code,ssn,phone) VALUES('fdiyh13','송영지','1','서울특별시 송파구 올림픽로45번길 26','칼라아파트 208동 1203호','05537','980312-2','010-8435-1384');
INSERT INTO customers(customer_id,customer_name, PASSWORD,city,address,postal_code,ssn,phone) VALUES('tah123','김태혁','1','서울시 은평구 신사1동','증산로449 청운401호','03450','960314-1','010-4360-7560');
INSERT INTO customers(customer_id,customer_name, PASSWORD,city,address,postal_code,ssn,phone) VALUES('dae','김다정','1','서울시 은평구 증산동',' 220-1 덕원@201호','03506','920914-2','010-5012-7557');
INSERT INTO customers(customer_id,customer_name, PASSWORD,city,address,postal_code,ssn,phone) VALUES('utf1212','김정길','1','서울시 은평구 증산동','177-5','03500','901025-1','010-4500-7743');
INSERT INTO customers(customer_id,customer_name, PASSWORD,city,address,postal_code,ssn,phone) VALUES('kiuk901','김진표','1','서울시 은평구 증산동','169-3 청록아파트101호','03499','850110-1','010-7911-8509');
INSERT INTO customers(customer_id,customer_name, PASSWORD,city,address,postal_code,ssn,phone) VALUES('usd0209','이혜원','1','서울시 마포구 합정동','월드컵로 29','04023','990920-2','010-4417-9811');
INSERT INTO customers(customer_id,customer_name, PASSWORD,city,address,postal_code,ssn,phone) VALUES('foscal99','육현상','1','서울시 마포구 합정동','426-10 그린랜드 빌리지','04023','981009-1','010-4009-7474');
INSERT INTO customers(customer_id,customer_name, PASSWORD,city,address,postal_code,ssn,phone) VALUES('iffy12','정하은','1','서울시 영등포구 당산동','4당산 삼성 래미안903호','07214','940309-2','010-1108-8494');
INSERT INTO customers(customer_id,customer_name, PASSWORD,city,address,postal_code,ssn,phone) VALUES('yung312','이다영','1','서울시 마포구 연남동','동교로 38길 8','03982','970312-2','010-7742-4911');
INSERT INTO customers(customer_id,customer_name, PASSWORD,city,address,postal_code,ssn,phone) VALUES('kimyu134','김유진','1','서울시 마포구 합정동','412-27 k빌딩 803호','04047','961231-2','010-1488-8182');
INSERT INTO customers(customer_id,customer_name, PASSWORD,city,address,postal_code,ssn,phone) VALUES('jee4311','이지영','1','서울시 마포구 상수동','335-10 상수 그린파크빌 102호','04074','890511-2','010-0119-8441');
INSERT INTO customers(customer_id,customer_name, PASSWORD,city,address,postal_code,ssn,phone) VALUES('fujg13','이민호','1','경기도 파주시 금바위로 98','일산밀알교회','10895','750524-1','010-3847-8241');
INSERT INTO customers(customer_id,customer_name, PASSWORD,city,address,postal_code,ssn,phone) VALUES('dsfg764','김설수','1','경기도 용인시 수지구 고기로525번길 31','고기동 476-16','16800','911115-1','010-8855-1732');
INSERT INTO customers(customer_id,customer_name, PASSWORD,city,address,postal_code,ssn,phone) VALUES('ygd36','조태희','1','경기도 성남시 분당구 판교역로192번길 16','판교타워 305호','13524','910703-2','010-7755-1732');
INSERT INTO customers(customer_id,customer_name, PASSWORD,city,address,postal_code,ssn,phone) VALUES('jhjiyf2','황기석','1','경기도 성남시 분당구 판교로 255','이노밸리 508호','13486','921208-1','010-7676-1732');
INSERT INTO customers(customer_id,customer_name, PASSWORD,city,address,postal_code,ssn,phone) VALUES('hjy1','박소민','1','경기도 평택시 청북읍 판교길 15-2','한산리 220-1','17796','880105-2','010-1315-1732');
INSERT INTO customers(customer_id,customer_name, PASSWORD,city,address,postal_code,ssn,phone) VALUES('a46g','설민석','1','경기도 성남시 분당구 판교원로 7','LIG건영아파트 101동 303호','13464','980418-1','010-7943-1732');
INSERT INTO customers(customer_id,customer_name, PASSWORD,city,address,postal_code,ssn,phone) VALUES('asas11','조석','1','경기도 성남시 분당구 판교원로 7','LIG건영아파트 101동 603호','13464','901118-1','010-2343-1322');

-- Employees
INSERT INTO EMPLOYEES(MANAGER,NAME,BIRTH_DATE,PHOTO,NOTES) VALUES('manager','김경민','880922-2','defaule_photo','매니저');
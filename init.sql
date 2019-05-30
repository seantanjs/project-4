DROP DATABASE IF EXISTS project_4;
CREATE DATABASE project_4;
\c project_4;

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username text,
    password text,
    location text,
    latitude text,
    longitude text,
    photo text,
    food text,
    gender text,
    age integer
);


CREATE TABLE IF NOT EXISTS invites (
    id SERIAL PRIMARY KEY,
    from_user integer,
    to_user integer,
    accept_invite boolean,
    reject_invite boolean
);




INSERT INTO users
(username, password, location, latitude, longitude, photo, food, gender, age)
VALUES
('akira', '1234', '79 Anson Road Singapore', 1.274250, 103.845410, 'http://clipart-library.com/img/857835.jpg', 'cai fun', 'male', 30);

INSERT INTO users
(username, password, location, latitude, longitude, photo, food, gender, age)
VALUES
('christian', '1234', '20 Anson Road Singapore', 1.275390, 103.845760, 'http://clipart-library.com/images/LTd5rzMXc.jpg', 'belacan noodles', 'male', 23);


INSERT INTO users
(username, password, location, latitude, longitude, photo, food, gender, age)
VALUES
('swee chin', '1234', 'Yishun Central', 1.426710, 103.840640, 'http://clipart-library.com/images/kcMK6rg5i.jpg', 'double mcspicy with triple cheese', 'male', 33);


INSERT INTO users
(username, password, location, latitude, longitude, photo, food, gender, age)
VALUES
('yui', '1234', 'Pinnacle Duxton Singapore', 1.279430, 103.843310, 'http://clipart-library.com/images/zcXe8Kq6i.jpg', 'wagyu beef', 'female', 20);


INSERT INTO users
(username, password, location, latitude, longitude, photo, food, gender, age)
VALUES
('htat win', '1234', 'Jurong East Central', 1.338190, 103.741150, 'http://clipart-library.com/images/6Tr6RGopc.png', 'bland soup', 'male', 30);


INSERT INTO users
(username, password, location, latitude, longitude, photo, food, gender, age)
VALUES
('claudia', '1234', 'Hillview Way Singapore', 1.353930, 103.759890, 'http://clipart-library.com/images/8c65rdBoi.jpg', 'xiao long bao', 'female', 25);


INSERT INTO users
(username, password, location, latitude, longitude, photo, food, gender, age)
VALUES
('wei jun', '1234', 'Ang Mo Kio Central', 1.375190, 103.847210, 'http://clipart-library.com/images/pT7rk6ggc.png', 'protein shake', 'male', 27);


INSERT INTO users
(username, password, location, latitude, longitude, photo, food, gender, age)
VALUES
('min shan', '1234', 'Hougang Central', 1.370580, 103.892160, 'http://clipart-library.com/images/qcBAMrd8i.jpg', 'chicken rice', 'male', 33);


INSERT INTO users
(username, password, location, latitude, longitude, photo, food, gender, age)
VALUES
('andrew', '1234', 'City Hall', 1.293234, 103.852060, 'http://clipart-library.com/images/ATbjMxryc.png', 'duck rice', 'male', 25);


INSERT INTO users
(username, password, location, latitude, longitude, photo, food, gender, age)
VALUES
('edmund', '1234', 'Hotel Swissôtel Merchant Court', 1.288705, 103.845781, 'http://clipart-library.com/images/dT9XBq5ac.jpg', 'salted egg pork', 'male', 28);


INSERT INTO users
(username, password, location, latitude, longitude, photo, food, gender, age)
VALUES
('andy', '1234', 'The Westin Singapore', 1.278503, 103.850796, 'http://clipart-library.com/images/pc78y5Gqi.jpg', 'sushi', 'male', 24);


INSERT INTO users
(username, password, location, latitude, longitude, photo, food, gender, age)
VALUES
('jordan', '1234', 'PSA Corporation Ltd', 1.271513, 103.842534, 'http://clipart-library.com/images/6TyXxbByc.jpg', 'beer based ramen', 'male', 30);


INSERT INTO users
(username, password, location, latitude, longitude, photo, food, gender, age)
VALUES
('siang ee', '1234', 'Tiong Bahru View', 1.287031, 103.828963, 'http://clipart-library.com/images/6Bcad6RT8.png', 'roasted duck', 'male', 28);


INSERT INTO users
(username, password, location, latitude, longitude, photo, food, gender, age)
VALUES
('terrence', '1234', 'Singapore Botanic Gardens', 1.314099, 103.815922, 'http://clipart-library.com/images/5TRXLMBLc.jpg', 'prawn noodles', 'male', 29);


INSERT INTO users
(username, password, location, latitude, longitude, photo, food, gender, age)
VALUES
('val', '1234', 'Novena Suites', 1.319046,  103.844756, 'http://clipart-library.com/images/BcgrMKXc8.png', 'vegetarian beehoon', 'female', 24);
DROP TABLE IF EXISTS Orders;
CREATE TABLE IF NOT EXISTS Orders (
    Date_Submitted DATETIME NOT NULL,
    Affected_Week DATETIME NOT NULL,
    Last_Name VARCHAR(32),
    First_Name VARCHAR(32),
    Email VARCHAR(64),
    Delivery_Time VARCHAR(176),
    Phone_Number VARCHAR(10),
    Meal_Plan VARCHAR(8),
    WKLY_SPCL_1 INT,
    WKLY_SPCL_2 INT,
    WKLY_SPCL_3 INT,
    SEAS_FAVE_1 INT,
    SEAS_FAVE_2 INT,
    SEAS_FAVE_3 INT,
    THE_ORIGINAL INT,
    ALMOND_BUTTER INT,
    THE_ENERGIZER INT,
    SEASONAL_SMOOTHIE INT,
    Pick_Meals VARCHAR(41),
    PRIMARY KEY (Date_Submitted, Phone_Number)
);

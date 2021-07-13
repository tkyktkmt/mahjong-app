# テーブル設計

## users テーブル

| Column                | Type   | Options                   |
|-----------------------|--------|---------------------------|
| nickname              | string | null: false               |
| email                 | string | null: false, unique: true |
| encrypted_password    | string | null: false               |
| main_battlefield      | string | null: false               |
| rank                  | string | null: false               |

### Association

- has_many :room_users
- has_many :rooms, through: room_users
- has_many :messages

## rooms テーブル

| Column | Type   | Options     |
| ------ | ------ | ----------- |
| name   | string | null: false |

### Association

- has_many :room_users
- has_many :users, through: room_users
- has_many :messages

## room_users テーブル

| Column | Type       | Options                        |
| ------ | ---------- | ------------------------------ |
| user   | references | null: false, foreign_key: true |
| room   | references | null: false, foreign_key: true |

### Association

- belongs_to :room
- belongs_to :user

## messages テーブル

| Column  | Type       | Options                        |
| ------- | ---------- | ------------------------------ |
| content | string     |                                |
| user    | references | null: false, foreign_key: true |
| room    | references | null: false, foreign_key: true |

### Association

- belongs_to :room
- belongs_to :user

## statuses テーブル

| Column          | Type     | Options     |
|-----------------|----------|-------------|
| score_east      | integer  | null: false |
| score_south     | integer  | null: false |
| score_west      | integer  | null: false |
| score_north     | integer  | null: false |
| seat_wind       | string   | null: false |
| round_wind_id   | string   | null: false |
| deposit_id      | integer  | null: false |
| stacking_bar_id | integer  | null: false |

### Association

- has_many :hands

## hands テーブル

| Column        | Type       | Options                        |
|---------------|------------|--------------------------------|
| pai1          | text       | null: false                    |
| pai2          | text       | null: false                    |
| pai3          | text       | null: false                    |
| pai4          | text       | null: false                    |
| pai5          | text       | null: false                    |
| pai6          | text       | null: false                    |
| pai7          | text       | null: false                    |
| pai8          | text       | null: false                    |
| pai9          | text       | null: false                    |
| pai10         | text       | null: false                    |
| pai11         | text       | null: false                    |
| pai12         | text       | null: false                    |
| pai13         | text       | null: false                    |
| pai14         | text       | null: false                    |
| huro1_1       | text       | null: false                    |
| huro1_2       | text       | null: false                    |
| huro1_3       | text       | null: false                    |
| huro2_1       | text       | null: false                    |
| huro2_2       | text       | null: false                    |
| huro2_3       | text       | null: false                    |
| huro3_1       | text       | null: false                    |
| huro3_2       | text       | null: false                    |
| huro3_3       | text       | null: false                    |
| huro4_1       | text       | null: false                    |
| huro4_2       | text       | null: false                    |
| huro4_3       | text       | null: false                    |
| status        | references | null: false, foreign_key: true |

### Association

- belongs_to :status
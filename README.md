# アプリ名
麻雀牌効率・点数計算アプリ

# 概要
## 点数状況算出機能
現状（点数、場風、局数、本場、供託）を入力することで、他プレイヤーとの点差及び逆転に必要な点数が出力される。
## シャンテン数算出機能
手牌を入力することで、自分の手牌が完成するまでの工数（シャンテン数）が出力される。
手牌完成までの工数が「x」・・・（ x-1 ）シャンテン   例）手牌完成までの工数が「2」・・・1シャンテン
## 待ち牌算出機能
手牌完成までの工数が「1」（聴牌）の時、最後の1工程に必要な牌（待ち牌）が出力される。 

# 実装予定の機能
## 和了打点算出機能
手牌を入力することで、その手牌が完成している（和了）場合に、その時得られる得点（打点）と、和了後の順位状況が算出される。
## 有効牌算出機能
手牌を入力することで、その手牌が1シャンテン以上の場合に、シャンテン数を下げるために必要な牌（有効牌）が出力される。
## 良形率算出機能
手牌を入力することで、その手牌が1シャンテン以上の場合に、聴牌時の待ち牌が多くなる確率（良形率）が出力される。
## ログイン、チャット機能
ログインユーザーのみ、他の麻雀プレイヤーとのチャットが可能になる。
ユーザーは雀力の指標となるゲームの段位や称号の登録を必須とする。
入力した手牌を保存して、そのデータを他ユーザーとのチャットルームで共有できる。

# 制作背景(意図)
対象者は麻雀初心者（ルールと麻雀用語は学習済）〜中級者（麻雀歴5年程度）の老若男女
## 点数状況算出機能
麻雀中に自分が逆転に必要な点数（飜数）は、飜数と和了形式（ロン、ツモ）の組み合わせを全パターンを暗記している者を除き、
逐一計算する必要があるが、その点数を正確かつ即座に算出することは困難である。
そのため、状況入力のみで逆転に必要な点数が出力される機能を実装した。
## シャンテン数算出機能、待ち牌算出機能
シャンテン数や待ち牌は自分の手牌価値の指標であり、特に攻めるか守るか（押引）を判断する際に重要であるが、
複雑な手牌（清一色など）では、それらを即座に算出することは難しい。
そのため、手牌入力のみでシャンテン数と待ち牌を算出できる機能を実装した。
## 実装予定の機能（和了打点、有効牌、良形率の算出機能）
和了打点は自分の手牌価値の指標であり、和了後に逆転可能か否かを判断する上でも必要となる数値であるが、
ルールを覚えた麻雀初心者にとっての第1関門でもあり、プレイ中に即座に算出できない場合も多い。
有効牌や良形率は手牌進行の方針を決める指標となるが、手牌によっては上級者でも算出が難しい。
中級者以下では、多くの場面で思考放棄していると推測される指標であるが、麻雀上達には必修のスキルである。
そのため、手牌入力のみで和了打点、有効牌、良形率が算出される機能を実装する予定である。
## ログイン、チャット機能
最近、某SNSで活発に麻雀の意見交換がされているが、発信者の実力が不明で、信憑性に欠ける発信も散見される。
そのため、ユーザー登録時に、雀力の登録を必須とし、互いに実力を把握した上で交流ができる場をつくる予定である。
その際、手牌保存機能で保存した手牌をチャットで表示できるような実装を予定している。
（現時点では手牌保存はできるもののその活用部分までは実装できていない）

# 工夫したポイント
ユーザーが扱いやすいように、javascriptを使用して、非同期で結果が出力されるように実装した。
直感的な操作ができるように、active_hashでの入力内容の制限や、牌の押下での牌入力/削除機能の実装を行った。

# 使用技術(開発環境)
HTML、CSS、Ruby、Rails, Javascript、Jquery

# テーブル設計

## users テーブル（実装予定）

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

## rooms テーブル（実装予定）

| Column | Type   | Options     |
| ------ | ------ | ----------- |
| name   | string | null: false |

### Association

- has_many :room_users
- has_many :users, through: room_users
- has_many :messages

## room_users テーブル（実装予定）

| Column | Type       | Options                        |
| ------ | ---------- | ------------------------------ |
| user   | references | null: false, foreign_key: true |
| room   | references | null: false, foreign_key: true |

### Association

- belongs_to :room
- belongs_to :user

## messages テーブル（実装予定）

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
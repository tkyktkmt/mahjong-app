require 'rails_helper'

RSpec.describe Status, type: :model do
  describe '#create' do
    before do 
      @status = FactoryBot.build(:status)
    end

    context '状況保存ができる時' do
      it '全項目に適切な値が存在すれば状況が保存できること' do
        expect(@status).to be_valid
      end
    end
    context '状況保存ができない時' do
      it 'score_eastが空欄では保存できないこと' do
        @status.score_east = nil
        @status.valid?
        expect(@status.errors.full_messages).to include("Score east can't be blank")
      end
      it 'score_southが空欄では保存できないこと' do
        @status.score_south = nil
        @status.valid?
        expect(@status.errors.full_messages).to include("Score south can't be blank")
      end
      it 'score_westが空欄では保存できないこと' do
        @status.score_west = nil
        @status.valid?
        expect(@status.errors.full_messages).to include("Score west can't be blank")
      end
      it 'score_northが空欄では保存できないこと' do
        @status.score_north = nil
        @status.valid?
        expect(@status.errors.full_messages).to include("Score north can't be blank")
      end
      it 'deposit_idが空欄では保存できないこと' do
        @status.deposit_id = nil
        @status.valid?
        expect(@status.errors.full_messages).to include("Deposit can't be blank")
      end
      it 'seat_windが空欄では保存できないこと' do
        @status.seat_wind = nil
        @status.valid?
        expect(@status.errors.full_messages).to include("Seat wind can't be blank")
      end
      it 'round_wind_idが空欄では保存できないこと' do
        @status.round_wind_id = nil
        @status.valid?
        expect(@status.errors.full_messages).to include("Round wind can't be blank")
      end
      it 'stacking_bar_idが空欄では保存できないこと' do
        @status.stacking_bar_id = nil
        @status.valid?
        expect(@status.errors.full_messages).to include("Stacking bar can't be blank")
      end
      it 'score_eastに英字が混在すると保存できないこと' do
        @status.score_east = "1a4b"
        @status.valid?
        expect(@status.errors.full_messages).to include("Score east is not a number")
      end
      it 'score_southに英字が混在すると保存できないこと' do
        @status.score_south = "2m4d"
        @status.valid?
        expect(@status.errors.full_messages).to include("Score south is not a number")
      end
      it 'score_westに英字が混在すると保存できないこと' do
        @status.score_west = "9d5m"
        @status.valid?
        expect(@status.errors.full_messages).to include("Score west is not a number")
      end
      it 'score_northに英字が混在すると保存できないこと' do
        @status.score_north = "m4nf"
        @status.valid?
        expect(@status.errors.full_messages).to include("Score north is not a number")
      end
      it 'score_eastにカナ文字が混在すると保存できないこと' do
        @status.score_east = "アイ4テル"
        @status.valid?
        expect(@status.errors.full_messages).to include("Score east is not a number")
      end
      it 'score_southにカナ文字が混在すると保存できないこと' do
        @status.score_south = "非通知184"
        @status.valid?
        expect(@status.errors.full_messages).to include("Score south is not a number")
      end
      it 'score_westにカナ文字が混在すると保存できないこと' do
        @status.score_west = "いい薬828"
        @status.valid?
        expect(@status.errors.full_messages).to include("Score west is not a number")
      end
      it 'score_northにカナ文字が混在すると保存できないこと' do
        @status.score_north = "4649ネ"
        @status.valid?
        expect(@status.errors.full_messages).to include("Score north is not a number")
      end
      it 'score_eastが０未満では保存できないこと' do
        @status.score_east = -1000
        @status.valid?
        expect(@status.errors.full_messages).to include("Score east must be greater than or equal to 0")
      end
      it 'score_southが０未満では保存できないこと' do
        @status.score_south = -2000
        @status.valid?
        expect(@status.errors.full_messages).to include("Score south must be greater than or equal to 0")
      end
      it 'score_westが０未満では保存できないこと' do
        @status.score_west = -1
        @status.valid?
        expect(@status.errors.full_messages).to include("Score west must be greater than or equal to 0")
      end
      it 'score_northが０未満では保存できないこと' do
        @status.score_north = -3
        @status.valid?
        expect(@status.errors.full_messages).to include("Score north must be greater than or equal to 0")
      end
      it 'score_eastが100000より大きいと保存できないこと' do
        @status.score_east = 10000000
        @status.valid?
        expect(@status.errors.full_messages).to include("Score east must be less than or equal to 100000")
      end
      it 'score_southが100000より大きいと保存できないこと' do
        @status.score_south = 100001
        @status.valid?
        expect(@status.errors.full_messages).to include("Score south must be less than or equal to 100000")
      end
      it 'score_westが100000より大きいと保存できないこと' do
        @status.score_west = 999999
        @status.valid?
        expect(@status.errors.full_messages).to include("Score west must be less than or equal to 100000")
      end
      it 'score_northが100000より大きいと保存できないこと' do
        @status.score_north = 111111
        @status.valid?
        expect(@status.errors.full_messages).to include("Score north must be less than or equal to 100000")
      end
      it 'scoreとdepositの合計が100000にならなければ保存できないこと' do
        @status.score_east = 0
        @status.valid?
        expect(@status.errors.full_messages).to include("Please make sum of score and deposit 100,000 ")
      end
    end
  end

end

class HandsController < ApplicationController
  def new
    @hand = Hand.new
  end

  def create
    @status = Status.find(params[:status_id])
    @hand = @status.hands.new(hand_params)
    @hand.save
    render :new
  end

  def hand_params
    params.require(:hand).permit(
      :pai1,
      :pai2,
      :pai3,
      :pai4,
      :pai5,
      :pai6,
      :pai7,
      :pai8,
      :pai9,
      :pai10,
      :pai11,
      :pai12,
      :pai13,
      :pai14,
      :huro1_1, 
      :huro1_2, 
      :huro1_3, 
      :huro2_1, 
      :huro2_2, 
      :huro2_3, 
      :huro3_1, 
      :huro3_2, 
      :huro3_3, 
      :huro4_1, 
      :huro4_2, 
      :huro4_3, 
      :dora 
    )
    .merge(status_id: params[:status_id])
  end

  def show
  end
  
end

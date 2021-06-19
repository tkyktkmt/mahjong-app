class HandsController < ApplicationController
  def new
    @hand = Hand.new
  end

  def create
    @status = Status.find(params[:status_id])
    @hand = @status.hands.new(hand_params)
    @hand.save
  end

  def hand_params
    params.require(:hand).permit(image:[])
  end

  def show
  end
  
end

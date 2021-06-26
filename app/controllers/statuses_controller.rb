class StatusesController < ApplicationController
  def index
  end

  def new
    @status = Status.new
  end

  def create
    @status = Status.new(status_params)
    if @status.save
      redirect_to new_status_hand_path(@status.id)
    else
      render :new
    end
  end

  private

  def status_params
    params.require(:status).permit(
      :score_east,    
      :score_south,   
      :score_west,    
      :score_north,   
      :seat_wind,  
      :round_wind_id, 
      :deposit_id,    
      :stacking_bar_id
    )
  end
end

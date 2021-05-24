class StatusesController < ApplicationController
  def index
  end

  def new
    @status = Status.new
  end

  def create
    @status = Status.new(status_params)
    if @status.save
      render :new
    else  
      redirect_to action: :new
    end
  end

  private

  def status_params
    params.require(:status).permit(
      :score_east,    
      :score_south,   
      :score_west,    
      :score_north,   
      :seat_wind_id,  
      :round_wind_id, 
      :deposit_id,    
      :stacking_bar_id
    )
  end
end

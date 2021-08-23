class SimulationsController < ApplicationController
  before_action :find_simulation, only: [:update, :show, :edit]

  def new
    @simulation = Simulation.new
  end

  def show
    @sim1 = @simulation.perform(noise: false)
    summary = @sim1.summarize
    4.times { summary << @simulation.perform(noise: true).summarize }
    preload_js_data("summary", summary.as_json)
    preload_js_data("simulation", @simulation.params.to_h.merge(start_date: @sim1.start_date))
  end

  def create
    @simulation = Simulation.new(simulation_params)
    if @simulation.save
      redirect_to edit_simulation_path(@simulation)
    else
      render :new
    end
  end

  def update
    if @simulation.update(simulation_params)
      if params[:run] =~ /yes/
        redirect_to @simulation
      else
        redirect_to edit_simulation_path(@simulation)
      end
    else
      render :edit
    end
  end

  private

  def find_simulation
    @simulation = Simulation.find_by!(key: params[:id])
  end

  def simulation_params
    {
      params: SimulationParams.from_params(
        params[:simulation][:params].to_unsafe_h
      )
    }
  end
end

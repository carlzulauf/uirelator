class SimulationsController < ApplicationController
  def new
    @simulation = Simulation.new
  end

  def create
    binding.pry
  end
end

class SimulationsController < ApplicationController
  def new
    # add_js_pack "simulation_form"
    @simulation = Simulation.new
  end

  attr_reader :js_packs
  def add_js_pack(name)
    @js_packs ||= []
    return if @js_packs.member?(name)
    @js_packs << name
    # content_for(:js_packs) do
    #   @js_packs_added.map do |pack|
    #     javascript_pack_tag pack, 'data-turbolinks-track': 'reload'
    #   end.join
    # end
  end
  helper_method :add_js_packs, :js_packs
end

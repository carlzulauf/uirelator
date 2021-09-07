class ChartsChannel < ApplicationCable::Channel
  def subscribed
    stream_from "simulations:#{params[:key]}"
  end
end

# == Schema Information
#
# Table name: simulation_configs
#
#  id                   :bigint           not null, primary key
#  simulation_key       :string
#  simulation_params    :text
#  completed_simulation :text
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#
require "test_helper"

class SimulationConfigTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end

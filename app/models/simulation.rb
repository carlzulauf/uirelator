# == Schema Information
#
# Table name: simulations
#
#  id          :bigint           not null, primary key
#  key         :string
#  description :string
#  params      :text
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Simulation < ApplicationRecord
  attribute :params, :simulation_params
end

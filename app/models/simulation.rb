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
  before_save :ensure_key

  def perform(noise: false, seed: nil)
    sim_params = params.as_json
    sim_params = sim_params.merge("noise" => "0") unless noise
    sim_params = sim_params.merge("rand_seed" => seed) if seed.present?
    Retirelator.from_params(sim_params).simulate!
  end

  def to_param
    key
  end

  def ensure_key
    self.key ||= ULID.generate.downcase
  end
end

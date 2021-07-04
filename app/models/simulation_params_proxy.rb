class SimulationParamsProxy < ActiveModel::Type::Value
  def cast(value)
    case value
    when SimulationParams then value
    when String
      from_hash(JSON.parse(value))
    else
      from_hash(value)
    end
  end

  def serialize(obj)
    obj.to_db.to_json
  end

  def from_hash(hash)
    return SimulationParams.default if hash.blank?
    SimulationParams.from_db(hash)
  end
end

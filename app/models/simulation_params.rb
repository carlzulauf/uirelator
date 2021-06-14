class SimulationParams < OptStruct.new
  def self.default
    params = Retirelator.default_params.without("name", "date_of_birth")
    new **params.deep_symbolize_keys
  end

  # SIMULATION OPTIONS
  options :description, :investment_growth_rate, :inflation_rate

  option :noise

  def noise_percent
    return 0.to_d unless noise.present?
    noise.to_d * 100
  end

  def noise_percent=(percent)
    return unless percent.present?
    self.noise = percent.to_d / 100
  end

  option :short_term_gains_ratio

  def short_term_gains_percent
    return 0.to_d unless short_term_gains_ratio.present?
    short_term_gains_ratio.to_d * 100
  end

  def short_term_gains_percent=(percent)
    return unless percent.present?
    self.short_term_gains_ratio = percent.to_d / 100
  end

  # RETIREE
  options :name, :monthly_allowance

  def cast_date(value)
    case value
    when String then Date.parse(value)
    when Date then value
    end
  end

  def retirement_date
    cast_date options[:retirement_date]
  end

  def target_death_date
    cast_date options[:target_death_date]
  end

  # INCOME
  options :salary, :salary_growth_rate

  # RETIREMENT CONTRIBUTIONS
  options :percent_401k_contribution, :percent_401k_match, :max_percent_401k_match
  options :annual_ira_contribution, :annual_roth_contribution, :annual_roth_conversion
  options :monthly_savings

  # CURRENT RETIREMENT
  options :ira_balance, :roth_balance, :savings_balance
end

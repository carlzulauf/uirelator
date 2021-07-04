class SimulationParams < OptStruct.new
  # percent params that need to be converted to ratios
  PERCENT_PARAMS = %i[noise_percent short_term_gains_percent]

  def self.option_accessor(*keys, **options)
    option_names.concat(keys)
    super(*keys, **options)
  end

  def self.option_names
    @option_names ||= []
  end

  def self.from_params(params)
    params = params.deep_symbolize_keys
    h = params.slice(*option_names)
    h[:fixed_incomes] = fixed_incomes_from_params(params[:fixed_incomes])
    new(**h).tap do |instance|
      PERCENT_PARAMS.each do |name|
        instance.public_send("#{name}=", params[name]) if params[name].present?
      end
    end
  end

  def self.from_db(hash)
    new(**hash.deep_symbolize_keys)
  end

  def self.fixed_incomes_from_params(params)
    return [] if params.blank?
    params = params.values if params.is_a?(Hash)
    params.map do |account|
      account.slice(:name, :monthly_income, :start_date, :stop_date).merge(
        taxable: account[:taxable].present?,
        indexed: account[:indexed].present?,
      )
    end
  end

  def self.default
    params = Retirelator.default_params.without("name")
    new **params.deep_symbolize_keys
  end

  # SIMULATION OPTIONS
  options :description, :investment_growth_rate, :inflation_rate
  options :noise, :short_term_gains_ratio

  # RETIREE
  options :name, :monthly_allowance
  # options :retirement_date, :target_death_date

  # INCOME
  options :salary, :salary_growth_rate
  options :fixed_incomes

  # RETIREMENT CONTRIBUTIONS
  options :percent_401k_contribution, :percent_401k_match, :max_percent_401k_match
  options :annual_ira_contribution, :annual_roth_contribution, :annual_roth_conversion
  options :monthly_savings
  options :roth_conversion_taxes_from_savings, :roth_conversions_after_retirement

  # CURRENT RETIREMENT
  options :ira_balance, :roth_balance, :savings_balance

  def noise_percent
    return 0.to_d unless noise.present?
    noise.to_d * 100
  end

  def noise_percent=(percent)
    Rails.logger.warn ["noise_percent=", percent, percent.to_d].inspect
    return unless percent.present?
    self.noise = percent.to_d / 100
  end

  def short_term_gains_percent
    return 0.to_d unless short_term_gains_ratio.present?
    short_term_gains_ratio.to_d * 100
  end

  def short_term_gains_percent=(percent)
    return unless percent.present?
    self.short_term_gains_ratio = percent.to_d / 100
  end

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

  def to_params
    to_db.tap do |params|
      PERCENT_PARAMS.each do |name|
        params[name] = public_send(name)
      end
      params[:fixed_incomes] ||= []
    end
  end

  def to_db
    options.slice(*self.class.option_names)
  end

end

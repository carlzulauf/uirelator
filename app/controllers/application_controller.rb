class ApplicationController < ActionController::Base

  def preloaded_js_data
    @preloaded_js_data ||= default_preloads
  end
  helper_method :preloaded_js_data

  def preload_js_data(key, data, encode: true)
    preloaded_js_data[key] = encode ? data.to_json : data
  end
  helper_method :preload_js_data

  def default_preloads
    # { "icon_sprites" => icon_sprites_metadata }
    {}
  end

  # def icon_sprites_metadata
  #   {
  #     "sheets" => {}.tap do |paths|
  #       %w(solid regular brands).each do |sheet|
  #         paths[sheet] = asset_path("iconsprites/#{sheet}.svg")
  #       end
  #     end,
  #     "icons" => IconSprite.by_name.as_json,
  #   }
  # end
end

module ApplicationHelper
  def sprite_path(sheet, name)
    sheet_path = asset_path("iconsprites/#{sheet}.svg")
    "#{sheet_path}##{name}"
  end

  def icon(name, style: nil, title: nil)
    icon = IconSprite.find(name, style: style)
    icon ||= IconSprite.find("exclamation-triangle", style: style)
    extras = {}
    extras = { title: title, data: { toggle: "tooltip" } } if title.present?
    sprite_path = asset_path("iconsprites/#{icon.sprite}.svg")

    content_tag(:i, class: "sprite-icon", **extras) do
      content_tag(:svg, viewBox: icon.view_box) do
        content_tag(:use, nil, href: sprite_path(icon.sprite, icon.name))
      end
    end
  end

  def icon_sprites_metadata
    {
      "sheets" => {}.tap do |paths|
        %w(solid regular brands).each do |sheet|
          paths[sheet] = asset_path("iconsprites/#{sheet}.svg")
        end
      end,
      "icons" => IconSprite.by_name.as_json,
    }
  end

  # Add js pack to the <HEAD>
  # idempotent so safe to call with the same pack name multiple times
  # def add_js_pack(name)
  #   @js_packs_added ||= []
  #   return if @js_packs_added.member?(name)
  #   @js_packs_added << name
  #   content_for(:js_packs) do
  #     @js_packs_added.map do |pack|
  #       javascript_pack_tag pack, 'data-turbolinks-track': 'reload'
  #     end.join
  #   end
  # end
end

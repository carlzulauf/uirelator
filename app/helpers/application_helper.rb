module ApplicationHelper
  def sprite_path(sheet, name)
    sheet_path = asset_path("iconsprites/#{sheet}.svg")
    "#{sheet_path}##{name}"
  end

  def icon(name, style: nil, title: nil, **extras)
    icon = IconSprite.find(name, style: style)
    icon ||= IconSprite.find("exclamation-triangle", style: style)
    css_classes = ["sprite-icon", extras.delete(:class)].compact.join(" ")
    if title.present?
      extras[:title] = title
      extras[:data] ||= {}
      extras[:data][:'bs-toggle'] = "tooltip"
    end
    sprite_path = asset_path("iconsprites/#{icon.sprite}.svg")

    content_tag(:i, class: css_classes, **extras) do
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
end

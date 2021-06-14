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
end

class LoadIconSprites < OptStruct.new
  option :sprites,  default: %w(solid regular brands)
  option :dir,      default: "app/assets/images/iconsprites"

  def load
    sprites.flat_map do |sprite|
      build_icons_from_sprite_xml(sprite, read_sprite_xml(sprite))
    end
  end

  private

  def read_sprite_xml(sprite)
    File.read("#{dir}/#{sprite}.svg")
  end

  def build_icons_from_sprite_xml(sprite, xml)
    Nokogiri::XML.parse(xml).css("symbol").map do |element|
      build_icon_from_element(sprite, element)
    end
  end

  def build_icon_from_element(sprite, element)
    IconSprite.new(
      sprite:   sprite,
      name:     element.attribute("id").value,
      view_box: element.attribute("viewBox").value,
    )
  end
end

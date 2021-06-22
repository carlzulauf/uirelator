class IconSprite < OptStruct.new(:sprite, :name, :view_box)
  def self.registry
    @@registry ||= LoadIconSprites.new.load.sort_by(&:name)
  end

  def self.by_name
    registry.group_by(&:name)
  end

  def self.find(name, style: nil)
    icons = by_name[name.to_s]
    return if icons.blank?
    icon = icons.detect { |i| i.sprite == style.to_s } if style.present?
    icon || icons.first
  end

  def as_json(*)
    options
  end
end

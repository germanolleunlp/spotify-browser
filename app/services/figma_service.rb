class FigmaService
  include HTTParty
  base_uri "#{Figma::Urls::FIGMA_API_URL}/v1"

  BUTTONS_URL = "/files/#{Figma::Ids::FIGMA_FILE_ID}?ids=0%3A1706".freeze
  COLORS_URL = "/files/#{Figma::Ids::FIGMA_FILE_ID}?ids=0%3A35".freeze
  TYPOGRAPHIES_URL = "/files/#{Figma::Ids::FIGMA_FILE_ID}?ids=0%3A2545,0%3A2550".freeze
  BADGES_URL = "/files/#{Figma::Ids::FIGMA_FILE_ID}?ids=0%3A1091,0%3A1071".freeze
  ALERTS_URL = "/files/#{Figma::Ids::FIGMA_FILE_ID}?ids=0%3A1024".freeze

  def self.get_buttons
    response = get(BUTTONS_URL, headers: { 'X-Figma-Token' => Figma::Ids::FIGMA_API_ID })

    result = []
    response['document']['children'][0]['children'].each do |groups|
      next unless groups['name'] == 'Buttons'

      groups['children'].each do |group|
        next unless group['type'] == 'GROUP'

        group_name = group['name'].parameterize
        buttons = []
        if group_name == 'checkbox-and-radio-buttons'
          buttons = group['children'].flat_map { |sub_group| sub_group['children'] }
        else
          buttons = group['children']
        end

        buttons.each do |button|
          button_name = button['name'].parameterize
          width, height = button['absoluteBoundingBox'].values_at('width', 'height')
          border_radius = 0
          border_color = 'inherit'
          background = 'inherit'
          button['children'].each do |props|
            next unless props['name'] == 'BG'

            border_radius = props['cornerRadius']  || 0
            background = get_color(props['fills'])
            border_color = get_color(props['strokes'])
            # skip rest of props
            break
          end

          result << {
            'name' => "#{group_name}-#{button_name}",
            'group' => group_name,
            'style' => {
              'minWidth' => width,
              'minHeight' => height,
              'background' => background,
              'border' => "1px solid #{border_color}",
              'borderRadius' => "#{border_radius}px"
            }
          }
        end
      end

      # skip rest of groups
      break
    end

    result
  rescue
    []
  end

  def self.get_colors
    response = get(COLORS_URL, headers: { 'X-Figma-Token' => Figma::Ids::FIGMA_API_ID })

    result = []
    response['document']['children'][0]['children'][0]['children'][0]['children'][0]['children'].each do |group|
      color = group['children'][0]

      result << {
        'name' => color['name'].parameterize,
        'color' => get_color(color['fills'])
      }

    end

    result
  rescue
    []
  end

  def self.get_typographies
    response = get(TYPOGRAPHIES_URL, headers: { 'X-Figma-Token' => Figma::Ids::FIGMA_API_ID })

    result = []
    response['document']['children'][0]['children'][0]['children'].each do |group|
      group['children'].each do |typography|
        style = typography['style']
        result << {
          'name' => typography['name'].parameterize,
          'style' => {
            'fontFamily' => style["fontFamily"],
            'fontWeight' => style["fontWeight"],
            'fontSize' => "#{style["fontSize"].to_i}px",
            'letterSpacing' => "#{style["letterSpacing"].to_i}px",
            'lineHeight' => "#{style["lineHeightPx"].to_i}px",
          }
        }
      end
    end

    result
  rescue
    []
  end

  def self.get_badges
    response = get(BADGES_URL, headers: { 'X-Figma-Token' => Figma::Ids::FIGMA_API_ID })

    result = []
    response['document']['children'][0]['children'][0]['children'].each do |group|
      next unless group['type'] == 'GROUP'

      group_name = group['name'].parameterize
      group['children'].each do |badge|
        next unless badge['type'] == 'GROUP'

        badge_name = badge['name'].parameterize
        props = badge['children'][0]
        border_radius = props['cornerRadius'] || 0
        background = get_color(props['fills'])

        result << {
          'name' => "#{group_name}-#{badge_name}",
          'group' => group_name,
          'style' => {
            'minWidth' => 20,
            'minHeight' => 20,
            'width' => 'max-content',
            'height' => 'max-content',
            'background' => background,
            'borderRadius' => "#{border_radius}px"
          }
        }
      end
    end

    result
  rescue
    []
  end

  def self.get_alerts
    response = get(ALERTS_URL, headers: { 'X-Figma-Token' => Figma::Ids::FIGMA_API_ID })

    result = []
    response['document']['children'][0]['children'][0]['children'].each do |alert|
      props = alert['children'][0]
      texts = alert['children'][1]

      width, height = props['absoluteBoundingBox'].values_at('width', 'height')
      background = get_color(props['fills'])
      color = get_color(texts['fills'])
      border_color = get_color(props['strokes'])
      border_radius = props['cornerRadius']  || 0

      result << {
        'name' => alert['name'].parameterize,
        'style' => {
          'minWidth' => width,
          'minHeight' => height,
          'background' => background,
          'color' => color,
          'border' => "1px solid #{border_color}",
          'borderRadius' => "#{border_radius}px"
        }
      }

    end

    result
  rescue
    []
  end

  private

  def self.get_color(child)
    color = child[0]['color']
    red = color['r'] * 255
    green = color['g'] * 255
    blue = color['b'] * 255
    alpha = color['a']
    "rgba(#{red}, #{green}, #{blue}, #{alpha})"
  rescue
    'inherit'
  end
end

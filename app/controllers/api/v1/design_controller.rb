module Api
  module V1
    class DesignController < ApiController
      def buttons
        json(FigmaService.get_buttons)
      end

      def colors
        json(FigmaService.get_colors)
      end
      
      def typographies
        json(FigmaService.get_typographies)
      end

      def badges
        json(FigmaService.get_badges)
      end

      def alerts
        json(FigmaService.get_alerts)
      end
    end
  end
end

class CalendarController < ApplicationController
  def index
    @events = Event.where.not(description: nil)
  end
end

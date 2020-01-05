require "#{Rails.root}/app/controllers/application_controller.rb"

module Api
    module V1
        class EventsController < ApplicationController
            protect_from_forgery except: [:create, :update]

            def index
                @events = Event.order(:id).limit(params[:limit]).offset(params[:offset])
                json = @events
                render json: json.to_json
            end

            def show
                @event = Event.find(params[:id])
                render json: @event.to_json
            end

            def edit
                @event = Event.find(params[:id])
            end

            def update
                @event = Event.find(params[:id])
                event_params.require(:title)
                event_params.require(:start)
                
                respond_to do |format|
                    format.any
                    if @event.update!(event_params)
                        @event.save
                        render json: @event.to_json
                    else
                        render json: {status: "ng", code: 500, content: {message: "エラーだよ"}}
                    end
                end
            end

            def new
                @event = Event.new
            end

            def create
                @last_event = Event.last
                if @last_event.present?
                    @last_event.end_date = event_params.require(:start_date)
                    @last_event.save
                end

                event_params.require(:title)
                event_params.require(:start_date)
                event_params.require(:latitude)
                event_params.require(:longitude)
                
                @event = Event.new(event_params)
                respond_to do |format|
                    format.any
                    if @event.save!
                        render json: @event
                    else
                        render json: {status: "ng",code: 500, content: {message: "エラーだよ"}}
                    end
                end
            end

            def destroy
                @event = Event.find(params[:id])
                @event.destroy
                render json: @event
            end

            private
                def event_params
                    params
                    .permit(
                        :title,
                        :start_date,
                        :latitude,
                        :longitude
                    )
                end
        end
    end
end
            
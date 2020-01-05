Rails.application.routes.draw do
  resources :calendar
  get 'events/diary_index'
  resources :events

  namespace :api, { format: 'json' } do
    namespace :v1 do
      resources :events
    end
  end
end
